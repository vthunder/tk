<template>
  <div v-if="$apollo.loading" class="loading"><h3>Loading...</h3></div>
  <div v-else class="container section">
    <StorePage>
      <div v-if="qrCode">
        <p>Use this code to check in at Tinker Kitchen:</p>
        <qrcode-vue :value="qrCode" class="mb-2" />
        <hr>
      </div>
      <p v-if="class_passes.length > 0">You have {{ class_passes.length }} class
        {{ class_passes.length | pluralize('pass', 'passes') }}. You
        can claim passes via <b-link :to="{ name: 'calendar' }">our
        calendar</b-link>
      </p>
      <p v-if="day_passes.length > 0">You have {{ day_passes.length }} day
        {{ day_passes.length | pluralize('pass', 'passes') }}.
      </p>
      <b-row>
        <b-col sm="3">
          Change password:
        </b-col>
        <b-col sm="3">
          <b-form-input
            id="inputPw1"
            v-model="old_password"
            :state="pwState"
            type="password"
            aria-describedby="old_pw_feedback"
            placeholder="old password"/>
          <b-form-invalid-feedback id="old_pw_feedback"/>
          <div v-if="pwState">Password changed!</div>
        </b-col>
        <b-col sm="3">
          <b-form-input
            id="inputPw2"
            v-model="password"
            :state="pwState"
            type="password"
            aria-describedby="pw_feedback"
            placeholder="new password"/>
          <b-form-invalid-feedback id="pw_feedback">
            Invalid old or new password
          </b-form-invalid-feedback>
        </b-col>
        <b-col sm="3">
          <b-button size="sm" @click="change_password">Change</b-button>
        </b-col>
      </b-row>
    </StorePage>
  </div>
</template>

<script>
  import QrcodeVue from 'qrcode.vue';
  import StorePage from '@/components/MemberPage.vue';
  import * as auth from '@/graphql/auth';
  import * as products from '@/graphql/products';

  export default {
    apollo: {
      me: auth.query.me,
      class_passes: {
        query: products.query.user_passes,
        variables: { type: 'class' },
        update(data) {
          return data.user_passes || [];
        },
      },
      day_passes: {
        query: products.query.user_passes,
        variables: { type: 'day_pass' },
        update(data) {
          return data.user_passes || [];
        },
      },
    },
    components: {
      StorePage,
      QrcodeVue,
    },
    data() {
      return {
        me: {},
        old_password: null,
        password: null,
        pwState: null,
      };
    },
    computed: {
      qrCode() {
        return 'https://tinkerkitchen.org/qr/token/' + this.me.qr_token;
      },
    },
    mounted() {
      this.pwState = null;
    },
    methods: {
      async change_password() {
        const { data: { update_password: ret } } = await this.$apollo.mutate({
          mutation: auth.mutation.update_password,
          variables: { old_password: this.old_password, password: this.password },
        });
        this.pwState = (ret === 'OK');
        this.password = null;
        this.old_password = null;
      },
    },
  };
</script>

<style lang="scss">
</style>
