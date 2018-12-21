<template>
    <b-modal id="pay-modal" ref="payModal"
             title="Cart" cancel-title="Close" ok-title="Checkout" centered
             @ok.prevent=checkout @hide=onReset>

        <template v-if="working" slot="modal-header">&nbsp;</template>
        <template v-if="working" slot="modal-footer">&nbsp;</template>

        <b-alert :show=showAlert variant="danger">{{ alertMessage }}</b-alert>

        <div v-if="working" class="center">
            <span class="fas fa-spinner fa-7x"></span>
        </div>
        <div v-else>
            <p v-if=default_card>
                Using card: {{ default_card.brand }} ending in {{ default_card.last4 }}
            </p>
        </div>

        <b-table id="cart-items" :items="items" :fields="table_fields"
                 striped hover foot-clone>

            <template slot="title" slot-scope="data">
                {{ data.item.title }}
                <div class="subtitle" v-if="data.item.subtitle">{{ data.item.subtitle }}</div>
            </template>

            <template slot="price" slot-scope="data">
                {{ ((data.item.type === 'discount')? '-' : '') + data.item.price }}
            </template>

            <template slot="delete" slot-scope="row">
                <b-button @click.stop="deleteItem" variant="link" class="delete_item">
                    <span class="fas fa-minus-circle"></span>
                </b-button>
            </template>

            <template slot="FOOT_title" slot-scope="data">Total</template>
            <template slot="FOOT_quantity" slot-scope="data"></template>
            <template slot="FOOT_price" slot-scope="data">{{ totalPrice }}</template>
        </b-table>
    </b-modal>
</template>

<script>
import * as auth from '@/graphql/auth';
import * as customerQueries from '@/graphql/customer';
import * as format from '@/lib/format';

export default {
  apollo: {
    me: auth.query.me,
    customer_payment_sources: customerQueries.query.customer_payment_sources,
  },
  data() {
    return {
      showAlert: false,
      alertMessage: 'Error!',
      items: [],
      table_fields: [
        { key: 'title', label: 'Item' },
        'quantity', 'price',
        { key: 'delete', label: '' },
      ],
      saveCard: true,
      working: false,
    };
  },
  computed: {
    default_card() {
      if (!this.customer_payment_sources) return null;
      return this.customer_payment_sources.find(() => true);
    },
    totalBeforeDiscountsRaw() {
      return this
        .items
        .filter(i => i.type !== 'discount')
        .reduce((acc, cur) => acc + cur.amount, 0);
    },
    totalBeforeDiscounts() {
      return format.priceCents(this.totalBeforeDiscountsRaw);
    },
    totalDiscountsRaw() {
      return this
        .items
        .filter(i => i.type === 'discount')
        .reduce((acc, cur) => acc + cur.amount, 0);
    },
    totalDiscounts() {
      return format.priceCents(this.totalDiscountsRaw);
    },
    totalPrice() {
      return format.priceCents(this.totalBeforeDiscountsRaw - this.totalDiscountsRaw);
    },
  },
  mounted() {
    this.$root.$on('tk::pay-modal::open', this.open);
    this.$root.$on('tk::pay-modal::add', this.open);
    this.$root.$on('tk::pay-modal::subscribeCheckout', this.subscribeCheckout);
  },
  destroyed() {
    this.$root.$off('tk::pay-modal::open', this.open);
    this.$root.$off('tk::pay-modal::add', this.add);
  },
  methods: {
    open(items) {
      if (items) this.add(items);
      this.working = false;
      this.$refs.payModal.show();
    },
    /*
     * items: array of objects containing:
     *   id: String: unique ID; consists of colon-separated type string & type-specific ID
     *       e.g.: sku:sku_DyIJDRjZCbcNmR
     *   type: String: type (same as in id)
     *   sku: String: if type sku, the Stripe sku id
     *   title: String
     *   subtitle: String
     *   quantity: Int
     *   amount_each: Int: price each 1 qty in cts
     *
     * these are computed internally, no need to pass them in:
     *   amount: total amount in cts for all of qty
     *   price: total price already formatted for display
     *
     * note: this method is not resilient to item amounts changing between each call
     */
    add(items) {
      items.forEach((newItem) => {
        const idx = this.items.map(c => (c.id)).indexOf(newItem.id);
        if (idx >= 0) {
          this.items[idx].quantity += newItem.quantity;
          this.items[idx].amount = this.items[idx].quantity * newItem.amount_each;
          this.items[idx].price = format.priceCents(this.items[idx].amount);
        } else {
          this.items.push({
            ...newItem,
            amount: newItem.amount_each * newItem.quantity,
            price: format.priceCents(newItem.amount_each * newItem.quantity),
          });
        }
      });
    },
    async checkout() {
      this.working = true;

      // fixme: what to do if any items are not type sku?
      const items = this.items.filter(i => i.type !== 'discount');

      // Make sure a Stripe customer record exists for current user (if logged in)
      let customer;
      if (this.me) {
        const ret = await this.$apollo.mutate({
          mutation: customerQueries.mutation.get_or_create_customer,
        });
        customer = ret.data.get_or_create_customer;
      }

      // Create a Stripe order
      const { data: { create_order: order } } = await this.$apollo.mutate({
        mutation: customerQueries.mutation.create_order,
        variables: { items: items.map(i => ({ sku: i.sku, quantity: i.quantity })) },
      });

      // If customer has a saved card ready to go, pay the order
      // FIXME: allow user to use a diff card
      if (customer && customer.sources && customer.sources.length) {
        await this.$apollo.mutate({
          mutation: customerQueries.mutation.pay_order,
          variables: { order: order.id, customer: customer.id },
        });
        this.clearCart();
        this.$refs.payModal.hide();
        this.$root.$emit('tk::pay-modal::complete');
        return;
      }

      // Otherwise, open the Stripe payment modal
      let [{ title: description }] = items;
      if (items.length === 2) description += ' and 1 more item';
      if (items.length > 2) description += ` and ${items.length - 1} more items`;

      const payOpts = {
        description,
        amount: order.amount,
        token: async (token) => {
          const payVars = { order: order.id };

          if (this.me) {
            if (this.saveCard) {
              await this.$apollo.mutate({
                mutation: customerQueries.mutation.update_customer,
                variables: { source: token.id },
              });
            } else {
              payVars.source = token.id;
            }
          } else {
            payVars.email = token.email;
            payVars.source = token.id;
          }

          await this.$apollo.mutate({
            mutation: customerQueries.mutation.pay_order,
            variables: payVars,
          });

          this.clearCart();

          this.$refs.payModal.hide();
          this.$root.$emit('tk::pay-modal::complete');

          // eslint-disable-next-line
          alert('Purchase successful. Thanks!');
        },
      };
      if (this.me) payOpts.email = this.me.email;
      this.$checkout.open(payOpts);
    },
    async subscribeCheckout({ plan, code }) {
      await this.$apollo.mutate({ mutation: customerQueries.mutation.get_or_create_customer });
      this.$checkout.open({
        description: plan.metadata.billing_description,
        amount: (code === 'KS_CONVERT') ? plan.ks_amount : plan.amount,
        email: this.me.email,
        token: async (token) => {
          await this.$apollo.mutate({
            mutation: customerQueries.mutation.update_customer,
            variables: { source: token.id },
          });
          await this.$apollo.mutate({
            mutation: customerQueries.mutation.create_subscription,
            variables: { plans: [plan.id], code },
          });
          this.$root.$emit('tk::pay-modal::complete');
        },
      });
    },
    clearCart() {
      this.items = [];
      this.onReset();
    },
    onReset() {
      this.showAlert = false;
      this.alertMessage = 'Error!';
    },
  },
};
</script>

<style lang="scss">
@keyframes spin {
    100% { transform: rotate(360deg); }
}
.fa-spinner {
    animation: spin 2s linear infinite;
    margin: 0 auto;
}
#cart-items {
    .subtitle {
        font-size: .875rem;
    }

    .total-footer {
        font-weight: 500;
    }

    button.delete_item {
        opacity: 0;
        transition: opacity 250ms;
        color: gray;
        margin: 0;
        padding: 0;

        &:hover {
            opacity: 1;
        }
    }
}
</style>
