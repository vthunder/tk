<template>
  <div v-if="$apollo.loading" class="loading"><h3>Loading...</h3></div>
  <div v-else class="container section">
    <StorePage>
      <p v-if="nextPayment">
        Next payment: {{ nextPaymentAmount }} on {{ nextPaymentDate }},
        for: {{ nextPaymentDescription }}
      </p>
      <b-table v-if="chargesTable.length" :items="chargesTable" striped hover/>
      <p v-else>No transactions to display.</p>
      <p v-if="me.has_previous_stripe_ids">
        Note: You have
        previously deleted Stripe accounts.  Only
        displaying transactions for the most current one.</p>
    </StorePage>
  </div>
</template>

<script>
  import * as _ from 'lodash';
  import * as moment from 'moment';
  import StorePage from '@/components/MemberPage.vue';
  import * as customerQueries from '@/graphql/customer';
  import * as auth from '@/graphql/auth';
  import * as kv from '@/lib/keyVal';
  import * as format from '@/lib/format';

  function chargeStatus(charge) {
    if (charge.refunded) return 'Refunded';
    if (charge.amount_refunded) return 'Partial refund';
    if (charge.dispute) return 'Disputed';
    if (charge.outcome.network_status === 'declined_by_network') return 'Card declined';
    if (charge.outcome.network_status === 'reversed_after_approval') return 'Card declined';
    if (charge.paid) return 'Paid';
    return 'Pending';
  }

  function itemDesc(obj) {
    return _.get(obj, 'attributes.title', _.get(obj, 'description', 'No description'));
  }
  function itemsDesc(array) {
    if (array.length === 1) return itemDesc(array[0]);
    if (array.length === 2) return `${itemDesc(array[0])} and 1 more item`;
    return `${itemDesc(array[0])} and ${array.length - 1} more items`;
  }

  function chargeDescription(charge) {
    if (charge.invoice && charge.invoice.lines) {
      return itemsDesc(charge.invoice.lines);
    }
    if (charge.order && charge.order.items) {
      return itemsDesc(charge.order.items.filter(i => i.type === 'sku'));
    }
    return 'No description';
  }

  export default {
    apollo: {
      me: auth.query.me,
      customer_charges: {
        query: customerQueries.query.customer_charges,
        update(data) {
          const ret = [];
          kv.restoreArray(data.customer_charges, ['metadata']).forEach((charge) => {
            if (charge.order && charge.order.items) {
              const tmp = _.cloneDeep(charge);
              tmp.order.items = kv.restoreArray(charge.order.items, ['attributes']);
              ret.push(tmp);
            } else {
              ret.push(charge);
            }
          });
          return ret;
        },
      },
      customer_subscriptions: {
        query: customerQueries.query.customer_subscriptions,
        update(data) {
          return kv.restoreArray(data.customer_subscriptions, [
            'metadata', 'plan.metadata', 'plan.attributes']);
        },
      },
    },
    components: {
      StorePage,
    },
    data() {
      return {
        customer_charges: [],
        customer_subscriptions: [],
      };
    },
    computed: {
      chargesTable() {
        return this.customer_charges.map(c => ({
          date: moment.unix(c.created).format('YYYY-MM-DD HH:mm:ss'),
          description: chargeDescription(c),
          amount: format.priceCents(c.amount),
          status: chargeStatus(c),
        }));
      },
      nextPayment() {
        if (this.customer_subscriptions.length) {
          const sub = this.customer_subscriptions[0];
          if (sub.plan.active && !sub.canceled_at && !sub.cancel_at_period_end) {
            return true;
          }
        }
        return false;
      },
      nextPaymentAmount() {
        if (this.nextPayment) {
          return format.priceWhole(this.customer_subscriptions[0].plan.amount);
        }
        return '';
      },
      nextPaymentDescription() {
        if (this.nextPayment) {
          return this.customer_subscriptions[0].plan.metadata.title;
        }
        return '';
      },
      nextPaymentDate() {
        if (this.nextPayment) {
          return format.date(this.customer_subscriptions[0].current_period_end);
        }
        return '';
      },
    },
  };
</script>

<style lang="scss">
  .loading { height: 100vh; }
</style>
