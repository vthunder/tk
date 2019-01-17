<template>
  <div class="container section">
    <b-form @submit.prevent="changePassword">
      <label for="inputPw">New password:</label>
      <b-form-input
        id="inputPw"
        ref="inputPwRef"
        v-model="new_password"
        :state="pwState"
        type="password"
        aria-describedby="inputPwFeedback"
        placeholder="Password"/>
      <b-form-invalid-feedback id="inputPwFeedback">
        Error
      </b-form-invalid-feedback>
      <b-button class="mt-2" variant="primary" @click="changePassword">
        Submit
      </b-button>
    </b-form>
  </div>
</template>

<script>
  import * as auth from '@/graphql/auth';

  export default {
    props: {
      token: { type: String, default: '' }
    },
    data() {
      return {
        new_password: null,
        pwState: null,
      };
    },
    methods: {
      async changePassword() {
        const { data: { update_password_by_token: result } } = await this.$apollo.mutate({
          mutation: auth.mutation.update_password_by_token,
          variables: { token: this.token, password: this.new_password },
        });
        if (result === 'OK') {
          // eslint-disable-next-line
          alert("Password change successful!\nNow try signing in with your new password.");
          localStorage.nextRoute = JSON.stringify({ name: 'index' });
          this.$root.$emit('tk::auth-modal::open');
        } else {
          // eslint-disable-next-line
          alert(result);
        }
      },
    },
  };
</script>

<style lang="scss">
</style>
