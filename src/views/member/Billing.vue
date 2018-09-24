<template>
    <div v-if="$apollo.loading" class="loading"><h3>Loading...</h3></div>
    <div v-else class="container section">
        <StorePage>
            <b-table striped hover :items="chargesTable"></b-table>
        </StorePage>
    </div>
</template>

<script>
import * as _ from 'lodash';
import * as moment from 'moment';
import StorePage from '@/components/MemberPage.vue';
import * as customerQueries from '@/graphql/customer';
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
  },
  components: {
    StorePage,
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
  },
  data() {
    return {
      customer_charges: [],
    };
  },
};
</script>

<style lang="scss">
.loading { height: 100vh; }
</style>
