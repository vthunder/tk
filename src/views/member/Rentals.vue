<template>
    <div v-if="$apollo.loading" class="loading"><h3>Loading...</h3></div>
    <div v-else class="container section">
        <StorePage>
            <p>You can rent part of the Tinker Kichen space! Check out
                our <b-link :to="{ name: 'groups' }">group events page</b-link>
                for details.</p>
            <p>To make sure there are no conflicts, we're currently
                booking rentals manually. Just talk to Tinker Kitchen
                staff and we'll set you up!</p>
        </StorePage>
    </div>
</template>

<script>
import StorePage from '@/components/MemberPage.vue';
import DayPassProductCard from '@/components/DayPassProductCard.vue';
import * as auth from '@/graphql/auth';
import * as products from '@/graphql/products';
import * as kv from '@/lib/keyVal';

export default {
  apollo: {
    me: auth.query.me,
    day_pass_skus: {
      query: products.query.day_pass_skus,
      update(data) {
        return kv.restoreObject(data.day_pass_skus, [
          'nonmember_1.attributes',
          'nonmember_1.metadata',
          'nonmember_5.attributes',
          'nonmember_5.metadata',
          'member_1.attributes',
          'member_1.metadata',
          'member_5.attributes',
          'member_5.metadata',
        ]);
      },
    },
    user_passes: products.query.user_passes,
  },
  components: {
    StorePage,
    DayPassProductCard,
  },
  computed: {
    pass_1() {
      if (this.sub) return this.day_pass_skus.member_1;
      return this.day_pass_skus.nonmember_1;
    },
    pass_5() {
      if (this.sub) return this.day_pass_skus.member_5;
      return this.day_pass_skus.nonmember_5;
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
      day_pass_skus: {},
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
