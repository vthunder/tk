<template>
  <div>
    <div class="daypasses section container">
      <h1 class="mt-4">Day Passes</h1>

      <b-row class="justify-content-center">
        <b-col md="10">
          <p class="text-center">
            Get a day pass and join us at our gorgeous
            1700sqft space for a day!</p>
          <p class="text-center">$35/day per person (members: only $25!)<br>
          </p>
        </b-col>
        <b-col md="8">
          <b-card class="buy-card">
            <p v-if="me">
              You have <span class="cur_daypasses">{{ passes.length }}</span>
              {{ passes.length | pluralize('pass', 'passes') }}.</p>
            <b-form class="daypass_form" inline>
              <b-form-select v-model="how_many" :options="num_options" />
              <b-button variant="primary" @click="buyDayPass">Buy Day Passes</b-button>
            </b-form>
          </b-card>
        </b-col>
      </b-row>

      <h5 class="mt-4 mb-4">Day passes include:</h5>

      <div class="justify-content-center">
        <div class="row">
          <div class="feature-card mb-4 pl-5 col-sm-6 col-md-4">
            <span class="oi oi-calendar feature-icon"/>
            <h6 class="mb-2">Full day access</h6>
            <p>
              Use a day pass anytime and use the space for a
              full day.</p>
          </div>
          <div class="mb-4 pl-5 col-sm-6 col-md-4">
            <span class="oi oi-task feature-icon"/>
            <h6 class="mb-2">All-equipment access</h6>
            <p>
              Access to all of our equipment included, there
              are no additional rental fees. We'll teach you
              how to use it, too!</p>
          </div>
          <div class="mb-4 pl-5 col-sm-6 col-md-4">
            <span class="oi oi-fire feature-icon"/>
            <h6 class="mb-2">Clubs & activities</h6>
            <p>
              Attend open events and activities on the day
              you use your pass.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import RequireSignIn from '@/components/RequireSignIn.vue';
  import * as auth from '@/graphql/auth';
  import * as products from '@/graphql/products';

  export default {
    components: {
      RequireSignIn,
    },
    data() {
      return {
        me: {},
        day_pass_skus: {},
        user_passes: [],
        how_many: 1,
        num_options: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' },
          { value: 6, text: '6' },
          { value: 7, text: '7' },
          { value: 8, text: '8' },
          { value: 9, text: '9' },
          { value: 10, text: '10' },
        ],
      };
    },
    apollo: {
      me: auth.query.me,
      day_pass_skus: products.query.day_pass_skus,
      user_passes: products.query.user_passes,
    },
    computed: {
      member() {
        return this.me && (this.me.is_member || this.me.is_free_member);
      },
      passes() {
        return this.user_passes.filter(p => p.status === 'new');
      },
    },
    mounted() {
      this.$root.$on('tk::coupon-modal::complete', this.refresh);
      this.$root.$on('tk::checkout::complete', this.refresh);
    },
    methods: {
      ...mapMutations('cart', ['add']),

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
            discount_for: [`sku:${sku.id}`],
            discount_per: 'item',
            quantity: qty,
            title: 'Member Day Pass discount',
            amount_each: discount,
          });
        }

        this.add(items);
        this.$router.push({ name: 'cart' });
      },
    },
    head() {
      return {
        title: 'Day Passes',
      };
    },
  };
</script>

<style lang="scss">
  .buy-card {
    .card-body {
      display: flex;
      flex-direction: row;
      justify-content: center;
      p { margin-bottom: 0; }
      select { margin: 0 .5em 0 1em; }
    }
  }
</style>
