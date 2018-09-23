<template>
    <div v-if="$apollo.loading" class="loading"><h3>Loading...</h3></div>
    <div v-else class="container section">
        <StorePage>
            <b-table striped hover :items="chargesTable"></b-table>
        </StorePage>
    </div>
</template>

<script>
import StorePage from '@/components/MemberPage.vue';
import * as customerQueries from '@/graphql/customer';
import * as format from '@/lib/format';
import * as moment from 'moment';

function chargeStatus(charge) {
  if (charge.refunded) return 'Refunded';
  if (charge.amount_refunded) return 'Partial refund';
  if (charge.dispute) return 'Disputed';
  if (charge.outcome.network_status === 'declined_by_network') return 'Card declined';
  if (charge.outcome.network_status === 'reversed_after_approval') return 'Card declined';
  if (charge.paid) return 'Paid';
  return 'Pending';
}

export default {
  apollo: {
    customer_charges: customerQueries.query.customer_charges,
  },
  components: {
    StorePage,
  },
  computed: {
    chargesTable() {
      return this.customer_charges.map(c => ({
        date: moment.unix(c.created).format('YYYY-MM-DD HH:mm:ss'),
        amount: format.priceCents(c.amount),
        status: chargeStatus(c),
        //        description: c.description,
      }));
    },
  },
  data() {
    return {
      customer_charges: [],
    };
  },
};
</script>

<style lang="scss">
</style>
