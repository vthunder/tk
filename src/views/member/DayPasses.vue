<template>
    <div v-if="$apollo.loading" class="loading"><h3>Loading...</h3></div>
    <div v-else class="container section">
        <StorePage>
            <div class="card-deck">
                <b-card-group deck class="mt-2">
                    <b-card v-for="sku in passes" :key=sku.id
                            :title=sku.attributes.title
                            :sub-title="sku.attributes.subtitle">
                        <p class="card-text">{{ sku.attributes.description }}</p>
                        <div slot="footer" class="text-center">
                            <b-button variant="primary" @click="buy(sku)">
                                Buy
                            </b-button>
                        </div>
                    </b-card>
                </b-card-group>
            </div>
        </StorePage>
    </div>
</template>

<script>
import StorePage from '@/components/MemberPage.vue';
import * as auth from '@/graphql/auth';
import * as customerQueries from '@/graphql/customer';
import * as products from '@/graphql/products';
import * as kv from '@/lib/keyVal';
import * as format from '@/lib/format';

export default {
  apollo: {
    me: auth.query.me,
    dayPasses: {
      query: products.query.skus,
      update(data) {
        const ret = [];
        kv.restoreArray(data.skus, ['attributes', 'metadata']).forEach((sku) => {
          const copy = sku;
          copy.fmtPrice = format.priceWhole(sku.price);
          copy.fmtPricePerUnit = format.priceWhole(sku.price / sku.attributes['bundled-units']);
          ret.push(copy);
        });
        return ret;
      },
    },
  },
  components: {
    StorePage,
  },
  computed: {
    memberPasses() {
      return this.dayPasses.filter(sku => sku.attributes['members-only'] === 'yes');
    },
    nonMemberPasses() {
      return this.dayPasses.filter(sku => sku.attributes['members-only'] !== 'yes');
    },
    passes() {
      if (this.sub) return this.memberPasses;
      return this.nonMemberPasses;
    },
    sub() {
      return this.me.is_member;
    },
  },
  data() {
    return {
      me: {},
    };
  },
  methods: {
    buy(sku) {
      this.$apollo
        .mutate({ mutation: customerQueries.mutation.get_or_create_customer })
        .then(({ data: { get_or_create_customer: customer } }) => {
          console.log(customer);
          if (customer.sources && customer.sources.length) {
            this.$root.$emit('tk::pay-modal::open', { product: sku });
            return;
          }
          this.$checkout.open({
            description: sku.attributes.title,
            amount: sku.price,
            email: this.me.email,
            token: (token) => {
              this.$apollo.mutate({
                mutation: customerQueries.mutation.update_customer,
                variables: { source: token.id },
              }).then(() => {
                this.$apollo.mutate({
                  mutation: customerQueries.mutation.create_order,
                  variables: { skus: [sku.id] },
                }).then(({ data: { create_order: order } }) => {
                  this.$apollo.mutate({
                    mutation: customerQueries.mutation.pay_order,
                    variables: { order: order.id },
                  }).then(() => {
                    alert('Purchase successful. Thanks!');
                    ['me'].forEach((q) => {
                      this.$apollo.queries[q].refetch();
                    });
                  });
                }).catch((err) => {
                  console.log(`Error: ${err}`);
                });
              });
            },
          });
        });
    },
  },
};
</script>

<style lang="scss">
</style>
