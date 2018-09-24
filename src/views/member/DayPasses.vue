<template>
    <div v-if="$apollo.loading" class="loading"><h3>Loading...</h3></div>
    <div v-else class="container section">
        <StorePage>
            <p>You have {{ user_passes.length }}
                {{ user_passes.length | pluralize('pass', 'passes') }}</p>
            <p><b-link v-if="user_passes.length" @click="togglePasses()">
                    <span v-if="show_pass_codes">Hide</span><span v-else>Show</span> pass codes
                    <i v-if="show_pass_codes" class="fas fa-arrow-circle-down"></i>
                    <i v-else class="fas fa-arrow-circle-right"></i>
                </b-link>
            </p>
            <p v-if="show_pass_codes">
                You can share these codes to let friends use your day
                passes. But it's up to you to keep them safe! Once a
                code is used at Tinker Kitchen, it will be removed
                from this list.
            </p>
            <b-table v-if="show_pass_codes" striped hover :items="passesTableItems">
            </b-table>

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
    user_passes: products.query.user_passes,
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
    userNewPasses() {
      return this.user_passes.filter(p => p.status === 'new');
    },
    passesTableItems() {
      return this.user_passes.map(p => ({ pass: p.token }));
    },
    sub() {
      return this.me.is_member;
    },
  },
  data() {
    return {
      me: {},
      user_passes: [],
      show_pass_codes: false,
      dayPasses: [],
    };
  },
  methods: {
    togglePasses() {
      this.show_pass_codes = !this.show_pass_codes;
    },
    buy(sku) {
      this.$root.$emit('tk::pay-modal::open', [sku]);
      this.$root.$on('tk::pay-modal::complete', this.payComplete);
    },
    payComplete() {
      this.$root.$off('tk::pay-modal::complete', this.payComplete);
      // this.$apollo.queries.user_passes.refetch();
      window.location.reload();
    },
  },
};
</script>

<style lang="scss">
.loading { height: 100vh; }
</style>
