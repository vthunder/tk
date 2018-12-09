<template>
    <div v-if="$apollo.loading" class="loading"><h3>Loading...</h3></div>
    <div v-else class="container section">
        <StorePage>
            <p>You have <span class="cur_daypasses">{{ user_passes.length }}</span>
                {{ user_passes.length | pluralize('pass', 'passes') }}.</p>
            <p>To use a day pass, just give us your email when you
                check-in and we'll deduct it from your account. To
                share a day pass so a friend can use it on their own,
                just send us an email and we'll generate a coupon code
                for them.</p>
            <hr>
            <h3>Get Day Passes</h3>

            <p>
                Day passes are $25 each for members, $35 each
                otherwise. Get one for yourself or give them to your
                friends!
            </p>
            <b-form class="daypass_form" inline>
                <label>How many:</label>
                <b-form-input v-model="how_many" type="number"></b-form-input>
                <b-button @click="buyDayPass" variant="primary">Buy</b-button>
            </b-form>
        </StorePage>
    </div>
</template>

<script>
import StorePage from '@/components/MemberPage.vue';
import * as auth from '@/graphql/auth';
import * as products from '@/graphql/products';

export default {
  apollo: {
    me: {
      query: auth.query.me,
      update(data) {
        if (!data || !data.me) return {};
        return data.me;
      },
    },
    day_pass_skus: products.query.day_pass_skus,
    user_passes: {
      query: products.query.user_passes,
      variables: { type: 'day_pass' },
      update(data) {
        if (!data || !data.user_passes) return [];
        return data.user_passes;
      },
    },
  },
  components: {
    StorePage,
  },
  data() {
    return {
      me: {},
      user_passes: [],
      dayPasses: [],
      day_pass_skus: {},
      how_many: 1,
    };
  },
  computed: {
    member() {
      return this.me.is_member || this.me.is_free_member;
    },
  },
  mounted() {
    this.$root.$on('tk::coupon-modal::complete', this.refresh);
    this.$root.$on('tk::pay-modal::complete', this.refresh);
  },
  methods: {
    refresh() {
      this.$apollo.provider.defaultClient.cache.reset();
      ['me', 'user_passes'].forEach((q) => {
        this.$apollo.queries[q].refetch();
      });
      window.location.reload();
    },
    buyDayPass() {
      const sku = this.day_pass_skus.nonmember_1;
      const qty = parseInt(this.how_many, 10);
      let discount = 0;
      if (this.member) discount = 1000;

      const items = [{
        id: `sku:${sku.id}`,
        sku: sku.id,
        quantity: qty,
        title: 'Tinker Kitchen Day Pass',
        amount_each: sku.price,
      }];

      if (discount) {
        items.push({
          id: `discount:${sku.id}`,
          type: 'discount',
          quantity: qty,
          title: 'Member discount',
          amount_each: discount,
        });
      }

      this.$root.$emit('tk::pay-modal::add', items);
      this.$root.$emit('tk::pay-modal::open');
    },
  },
};
</script>

<style lang="scss">
.loading { height: 100vh; }
.cur_daypasses {
    font-size: 1.5rem;
    font-weight: 500;
}
.daypass_form {
    input {
        margin-left: .75em;
        margin-right: .75em;
        max-width: 4em;
    }
}
</style>
