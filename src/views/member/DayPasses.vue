<template>
    <div v-if="$apollo.loading" class="loading"><h3>Loading...</h3></div>
    <div v-else class="container section">
        <StorePage>
            <p>You have <span class="cur_daypasses">{{ user_passes.length }}</span>
                {{ user_passes.length | pluralize('pass', 'passes') }}.</p>
            <p>To use a day pass, just give us your email when you
                check-in and we'll deduct it from your account. To
                share a day pass with a friend, send us an email and
                we'll generate a coupon code for them.</p>
            <!--
            <p><b-link v-if="user_passes.length" @click="togglePasses()">
                    <span v-if="show_pass_codes">Hide</span><span v-else>Show</span> pass codes
                    <i v-if="show_pass_codes" class="fas fa-arrow-circle-down"></i>
                    <i v-else class="fas fa-arrow-circle-right"></i>
                </b-link>
            </p>

            <p v-if="show_pass_codes">
                <strong>How do these work?</strong><br>Share these
                codes with friends to give them a day pass. Once used,
                passes will be removed from this list.
            </p>
            <b-table v-if="show_pass_codes" striped hover :items="passesTableItems">
            </b-table>
            -->
            <hr>
            <h3>Get Day Passes</h3>

            <p>
                Day passes are <span v-if="sub">$25 each for members</span>
                <span v-else>$35 each</span>. Come spend a day cooking with us!<br>
                You can also share them with friends.
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
          'member_1.attributes',
          'member_1.metadata',
        ]);
      },
    },
    user_passes: {
      query: products.query.user_passes,
      variables: { type: 'day_pass' },
    },
  },
  components: {
    StorePage,
  },
  computed: {
    pass_1() {
      if (this.sub) return this.day_pass_skus.member_1;
      return this.day_pass_skus.nonmember_1;
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
      how_many: 1,
    };
  },
  mounted() {
    this.$root.$on('tk::coupon-modal::complete', this.refresh);
    this.$root.$on('tk::pay-modal::complete', this.refresh);
  },
  methods: {
    togglePasses() {
      this.show_pass_codes = !this.show_pass_codes;
    },
    refresh() {
      this.$apollo.provider.defaultClient.cache.reset();
      ['me', 'user_passes'].forEach((q) => {
        this.$apollo.queries[q].refetch();
      });
      window.location.reload();
    },
    buyDayPass() {
      const sku = this.pass_1;
      const qty = parseInt(this.how_many, 10);

      this.$root.$emit('tk::pay-modal::open', [{
        id: `sku:${sku.id}`,
        sku: sku.id,
        quantity: qty,
        title: sku.attributes.title,
        amount_each: sku.price,
      }]);
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
