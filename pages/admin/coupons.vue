<template>
  <div v-if="$apollo.loading" class="loading"><h3>Loading...</h3></div>
  <div v-else class="container section">
    <AdminPage>
      <div id="admin-coupons" class="tab-pane fade show active" role="tabpanel">
        <h3>Generate coupons:</h3>
        <b-form @submit.prevent="doCreateCoupon">
          <b-container fluid>
            <b-row>
              <b-col sm="3"><label for="input_type">Coupon type:</label></b-col>
              <b-col sm="9">
                <b-form-select id="input_type" v-model="type" :options="type_options"/>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col sm="3"><label for="input_num">How many:</label></b-col>
              <b-col sm="9">
                <b-form-input id="input_num" v-model="num" type="number"/>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
        <div class="text-right mr-3">
          <b-button class="mt-2" @click="doCreateCoupon">Create</b-button>
        </div>
        <hr>
        <h3>Send coupons via email:</h3>
        <b-form @submit.prevent="doSendCoupons">
          <b-container fluid>
            <b-row>
              <b-col sm="3"><label for="input_type2">Coupon type:</label></b-col>
              <b-col sm="9">
                <b-form-select id="input_type2" v-model="type2" :options="type_options"/>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col sm="3"><label for="input_emails">Emails:</label></b-col>
              <b-col sm="9">
                <b-form-input id="input_emails" v-model="emails" type="text"/>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
        <div class="text-right mr-3">
          <b-button class="mt-2" @click="doSendCoupons">Send</b-button>
        </div>
      </div>
    </AdminPage>
    <b-modal id="coupon-modal" ref="couponModalRef" title="Coupon codes" centered ok-only>
      <p>Generated codes (type: {{ type }}):</p>
      <ul>
        <li v-for="code in generated" :key="code">{{ code }}</li>
      </ul>
    </b-modal>
  </div>
</template>

<script>
  import AdminPage from '@/components/AdminPage.vue';
  import * as auth from '@/graphql/auth';
  import * as misc from '@/graphql/misc';

  export default {
    components: {
      AdminPage,
    },
    data() {
      return {
        me: {},
        num: 1,
        type: 'daypass',
        type2: 'daypass',
        emails: '',
        type_options: [
          { value: 'month', text: '1 month' },
          { value: 'staff', text: 'Staff - 1 month' },
          { value: 'daypass', text: '1 day pass' },
          { value: 'ks_daypasses', text: 'Kickstarter - 2 day passes' },
          { value: 'ks_month', text: 'Kickstarter - 1 month + 2 day passes' },
          { value: 'ks_monthonly', text: 'Kickstarter - 1 month only' },
          { value: 'ks_year', text: 'Kickstarter - 1 year' },
          { value: 'ks_class', text: 'Kickstarter - 1 class' },
        ],
        generated: [],
      };
    },
    computed: {
    },
    apollo: {
      me: auth.query.me,
    },
    methods: {
      async doCreateCoupon() {
        const { data: { create_coupon_token: tokens } } = await this.$apollo.mutate({
          mutation: misc.mutation.create_coupon_token,
          variables: { type: this.type, count: this.num },
        });
        this.generated = tokens;
        this.$refs.couponModalRef.show();
      },
      async doSendCoupons() {
        const { data: { send_coupon_tokens: ret } } = await this.$apollo.mutate({
          mutation: misc.mutation.send_coupon_tokens,
          variables: { type: this.type2, emails: this.emails },
        });
        // eslint-disable-next-line
        alert(ret);
      },
    },
  };
</script>

<style lang="scss">
  .loading { height: 100vh; }
</style>
