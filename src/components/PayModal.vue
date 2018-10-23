<template>
    <b-modal id="pay-modal" ref="payModal"
             title="Confirm" ok-title="Pay Now" centered
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

        <b-table striped hover foot-clone :items="tableItems">
            <template slot="FOOT_item" slot-scope="data">Total</template>
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
      saveCard: true,
      working: false,
    };
  },
  computed: {
    default_card() {
      if (!this.customer_payment_sources) return null;
      return this.customer_payment_sources.find(() => true);
    },
    tableItems() {
      // FIXME: user configurable qty

      return this.items.map(i => ({
        item: i.attributes.title,
        quantity: 1,
        price: format.priceCents(i.price),
      }));
    },
    totalPrice() {
      let total = 0;
      this.items.forEach((i) => { total += i.price; });
      return format.priceCents(total);
    },
  },
  mounted() {
    this.$root.$on('tk::pay-modal::open', this.open);
    this.$root.$on('tk::pay-modal::subscribeCheckout', this.subscribeCheckout);
  },
  destroyed() {
    this.$root.$off('tk::pay-modal::open', this.open);
  },
  methods: {
    open(items) {
      this.items = items;
      this.working = false;
      this.$refs.payModal.show();
    },
    async checkout() {
      this.working = true;
      const { items } = this;

      // Make sure a Stripe customer record exists for current user
      const { data: { get_or_create_customer: customer } } = await this.$apollo.mutate({
        mutation: customerQueries.mutation.get_or_create_customer,
      });

      // Create a Stripe order
      const { data: { create_order: order } } = await this.$apollo.mutate({
        mutation: customerQueries.mutation.create_order,
        variables: { skus: items.map(i => (i.id)) },
      });

      // If customer has a saved card ready to go, pay the order
      // FIXME: allow user to use a diff card
      if (customer.sources && customer.sources.length) {
        await this.$apollo.mutate({
          mutation: customerQueries.mutation.pay_order,
          variables: { order: order.id, customer: customer.id },
        });
        this.$refs.payModal.hide();
        this.$root.$emit('tk::pay-modal::complete');
        return;
      }

      // Otherwise, open the Stripe payment modal
      let [{ attributes: { title: description } }] = items;
      if (items.length === 2) description += ' and 1 more item';
      if (items.length > 2) description += ` and ${items.length - 1} more items`;

      await this.$checkout.open({
        description,
        amount: order.amount,
        email: this.me.email,
        token: async (token) => {
          const payVars = { order: order.id };

          if (this.saveCard) {
            await this.$apollo.mutate({
              mutation: customerQueries.mutation.update_customer,
              variables: { source: token.id },
            });
          } else {
            payVars.source = token.id;
          }

          await this.$apollo.mutate({
            mutation: customerQueries.mutation.pay_order,
            variables: payVars,
          });

          this.$refs.payModal.hide();
          this.$root.$emit('tk::pay-modal::complete');

          // eslint-disable-next-line
          alert('Purchase successful. Thanks!');
        },
      });
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
    onReset() {
      this.items = [];
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
.total-footer {
    font-weight: 500;
}
</style>
