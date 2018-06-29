<template>
    <b-modal id="auth-modal" ref="authModal"
             centered title="Sign in"
             @ok.prevent=onSubmit @hide=onReset>

        <b-alert :show=showAlert variant="danger">{{ alertMessage }}</b-alert>

        <b-form @submit="onSubmit" @reset="onReset" v-if="showForm">
            <b-form-group label="Email:" label-for="email-field">
                <b-form-input id="email-field"
                              type="email"
                              v-model="form.email"
                              required
                              placeholder="Email">
                </b-form-input>
            </b-form-group>
            <b-form-group label="Password:" label-for="password-field">
                <b-form-input id="password-field"
                              type="password"
                              v-model="form.password"
                              required
                              placeholder="Password">
                </b-form-input>
            </b-form-group>
            <b-button id="form-submit" type="submit">Submit</b-button>
        </b-form>

        <template slot="modal-ok">Sign in</template>
    </b-modal>
</template>

<script>
import * as auth from '../graphql/auth';
import { onLogin } from '../vue-apollo';

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      alertMessage: 'Invalid username/password',
      showAlert: false,
      showForm: true,
    };
  },
  methods: {
    onSubmit() {
      this.$apollo.mutate({
        mutation: auth.mutation.login,
        variables: {
          email: this.form.email,
          password: this.form.password,
        },
      }).then(({ data: { login } }) => {
        this.token = login.jwt.token;
        onLogin(this.$apollo.provider.defaultClient, login.jwt.token);
        this.$refs.authModal.hide();
      }).catch((err) => {
        console.log(`Login error: ${err}`);
        this.showAlert = true;
      });
    },
    onReset() {
      this.form.email = '';
      this.form.password = '';
      this.showAlert = false;
      this.alertMessage = 'Invalid username/password';
      /* Trick to reset/clear native browser form validation state */
      this.showForm = false;
      this.$nextTick(() => { this.showForm = true; });
    },
  },
};
</script>

<style>
#form-submit {
    display: none;
}
</style>
