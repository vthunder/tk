<template>
    <div>
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

        <div v-if="!shownItems.length">
            Cart is empty.
        </div>
        <b-table v-else id="cart-items" :items="shownItems" :fields="table_fields"
                 striped hover foot-clone>

            <template slot="delete" slot-scope="data">
                <b-button v-if="data.item.type !== 'discount'"
                          @click.stop="deleteItem(data.item.id)"
                          size="sm" variant="outline-secondary">
                    <span class="fas fa-times"></span>
                </b-button>
            </template>

            <template slot="title" slot-scope="data">
                {{ data.item.title }}
                <div class="subtitle" v-if="data.item.subtitle">{{ data.item.subtitle }}</div>
            </template>

            <template slot="quantity" slot-scope="data">
                <div v-if="data.item.type !== 'discount'" class="quantity">
                    <b-button @click.stop="minusItem(data.item.id)"
                              size="sm" variant="outline-secondary">
                        <span class="fas fa-minus"></span>
                    </b-button>
                    <span class="quantity-text">{{ data.item.quantity }}</span>
                    <b-button @click.stop="plusItem(data.item.id)"
                              size="sm" variant="outline-secondary">
                        <span class="fas fa-plus"></span>
                    </b-button>
                </div>
            </template>

            <template slot="FOOT_title" slot-scope="data">Total</template>
            <template slot="FOOT_quantity" slot-scope="data"></template>
            <template slot="FOOT_price" slot-scope="data">{{ totalPrice }}</template>
        </b-table>

        <b-input-group prepend="Coupon code" size="sm" class="mb-2">
            <b-form-input></b-form-input>
            <b-input-group-append>
                <b-btn variant="secondary">Apply</b-btn>
            </b-input-group-append>
        </b-input-group>
    </div>
</template>

<script>
import * as _ from 'lodash';
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
        { key: 'delete', label: '' },
        { key: 'title', label: 'Item' },
        { key: 'quantity', class: 'text-center' },
        'price',
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
    skuItems() {
      return this.items.filter(i => i.type !== 'discount');
    },
    discountItems() {
      return this.items.filter(i => i.type === 'discount');
    },
    shownItems() {
      return this.items.filter(i => i.amount > 0);
    },
    totalBeforeDiscounts() {
      return this.skuItems.reduce((acc, cur) => acc + cur.amount, 0);
    },
    totalDiscounts() {
      return this.discountItems.reduce((acc, cur) => acc + cur.amount, 0);
    },
    total() {
      return this.totalBeforeDiscounts - this.totalDiscounts;
    },
    totalPrice() {
      return format.priceCents(this.total);
    },
  },
  mounted() {
    this.$root.$on('tk::checkout::open', this.open);
    this.$root.$on('tk::checkout::add', this.add);
    this.$root.$on('tk::checkout::subscribeCheckout', this.subscribeCheckout);
  },
  destroyed() {
    this.$root.$off('tk::checkout::open', this.open);
    this.$root.$off('tk::checkout::add', this.add);
  },
  methods: {
    open(items) {
      if (items) this.add(items);
      this.working = false;
      this.$refs.payModal.show();
    },

    _itemIndex(id) {
      return this.items.map(c => (c.id)).indexOf(id);
    },

    /*
     * items: array of objects containing:
     *   id: String: unique ID; consists of colon-separated type string &
     *       type-specific ID e.g.: sku:sku_DyIJDRjZCbcNmR, discount:1
     *   type: String: type (same as in id)
     *   sku: String: Stripe sku id of the item
     *   discount_for: Array: list of item ids the discount applies to
     *   discount_per: String: 'order' (1x per order, across skus),
     *                         'item' (1x per total qty)
     *   title: String
     *   subtitle: String
     *   quantity: Int (ignored for type discount)
     *   amount_each: Int: price each 1 qty in cts
     *
     * these are computed internally for each item:
     *   amount: total amount in cts for all of qty
     *   price: total price already formatted for display
     *   quantity: (discount only)
     *
     * note: this method is not resilient to item amounts changing between each call
     */
    add(items) {
      console.log(`adding ${items.length} items`);
      items.forEach((newItem) => {
        let idx = this._itemIndex(newItem.id);

        if (idx < 0) { // new item
          idx = this.items.push({ ...newItem, amount: 0, price: '' }) - 1;
        } else if (newItem.type !== 'discount') {
          this.items[idx].quantity += newItem.quantity;
        } else {
          // adding discount that already exists; update its discount_for array
          const forSkus = _.union(this.items[idx].discount_for, newItem.discount_for);
          this.items[idx].discount_for = forSkus;
        }

        // recompute amount and formatted price
        this._recomputeAmount(idx);

        // recalculate all discounts since they depend on items/quantities
        this._recalculateDiscounts();
      });
    },

    minusItem(id) {
      const idx = this._itemIndex(id);
      this.items[idx].quantity = Math.max(this.items[idx].quantity - 1, 1);
      this._recomputeAmount(idx);
      this._recalculateDiscounts();
    },

    plusItem(id) {
      const idx = this._itemIndex(id);
      this.items[idx].quantity = Math.min(this.items[idx].quantity + 1, 10);
      this._recomputeAmount(idx);
      this._recalculateDiscounts();
    },

    deleteItem(id) {
      this.items = this.items.filter(i => i.id !== id);
      this._recalculateDiscounts();
    },

    _recomputeAmount(idx) {
      this.items[idx].amount = this.items[idx].quantity * this.items[idx].amount_each;
      this.items[idx].price = format.priceCents(this.items[idx].amount);
      if (this.items[idx].type === 'discount') {
        this.items[idx].price = `-${this.items[idx].price}`;
      }
    },

    _recalculateDiscounts() {
      this.items
        .filter(i => i.type === 'discount')
        .map(i => this._recalculateDiscount(i.id));
    },

    _recalculateDiscount(id) {
      const idx = this._itemIndex(id);
      const disc = this.items[idx];
      if (disc.type !== 'discount') throw new Error('internal error recalculating discount');

      const forIdx = disc
        .discount_for
        .map(i => this._itemIndex(i))
        .filter(i => this.items[i]);

      const qty = forIdx.reduce((acc, cur) => acc + this.items[cur].quantity, 0);

      if (!forIdx.length || qty === 0) {
        // dangling discount; self destruct and return
        // note: qty should never be 0 unless forIdx is empty
        // fixme: might be unexpected for this method to remove items
        this.items = this.items.filter(i => i.id !== id);
        return;
      }

      this.items[idx].quantity = (disc.discount_per === 'order') ? 1 : qty;
      this._recomputeAmount(idx);
    },

    async checkout() {
      this.working = true;

      // fixme: what to do if any items are not type sku?
      const items = this.items
        .filter(i => i.type !== 'discount')
        .filter(i => i.quantity > 0);

      if (items.length === 0) {
        this.working = false;
        // eslint-disable-next-line
        alert('Cart is empty');
      }

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
        this.$root.$emit('tk::checkout::complete');
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
          this.$root.$emit('tk::checkout::complete');

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
          this.$root.$emit('tk::checkout::complete');
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

    .quantity {
        display: flex;
        flex-direction: row;

        .quantity-text {
            width: 2em;
        }
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
