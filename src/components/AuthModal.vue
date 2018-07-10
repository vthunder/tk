<template>
    <b-modal id="auth-modal" ref="authModal"
             centered hide-footer
             @ok.prevent=onSubmit @hide=onReset>

        <template slot="modal-title">{{ mode[activeMode].title }}</template>
        <b-alert :show=showAlert variant="danger">{{ alertMessage }}</b-alert>

        <b-form @submit="onSubmit" @reset="onReset" v-if="showForm">
            <b-form-group v-if="activeMode == 'register'"
                          label="Name" label-sr-only label-for="name-field">
                <b-form-input id="name-field"
                              type="text"
                              v-model="form.name"
                              required
                              placeholder="Name">
                </b-form-input>
            </b-form-group>
            <b-form-group label="Email" label-sr-only label-for="email-field">
                <b-form-input id="email-field"
                              type="email"
                              v-model="form.email"
                              required
                              placeholder="Email">
                </b-form-input>
            </b-form-group>
            <b-form-group label="Password" label-sr-only label-for="password-field">
                <b-form-input id="password-field"
                              type="password"
                              v-model="form.password"
                              required
                              placeholder="Password">
                </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">{{ mode[activeMode].submitText }}</b-button>
        </b-form>

        <div class="footer-link mt-2">
            {{ mode[activeMode].footerPrompt }}
            <b-link @click=switchMode>{{ mode[activeMode].footerLink }}</b-link>
        </div>
    </b-modal>
</template>

<script>
import * as auth from '../graphql/auth';
import { onLogin } from '../vue-apollo';

export default {
  data() {
    return {
      activeMode: 'signin',
      alertMessage: 'Invalid username/password',
      form: {
        name: '',
        email: '',
        password: '',
      },
      mode: {
        signin: {
          title: 'Sign in',
          submitText: 'Sign in',
          footerPrompt: 'Don\'t have an account?',
          footerLink: 'register',
        },
        register: {
          title: 'Register',
          submitText: 'Register',
          footerPrompt: 'Already have an account?',
          footerLink: 'sign in',
        },
      },
      showAlert: false,
      showForm: true,
    };
  },
  methods: {
    switchMode() {
      this.activeMode = (this.activeMode === 'signin') ? 'register' : 'signin';
      this.onReset();
    },
    onSubmit() {
      let mutation = auth.mutation.login;
      const variables = {
        email: this.form.email,
        password: this.form.password,
      };

      if (this.activeMode === 'register') {
        mutation = auth.mutation.signup;
        variables.name = this.form.name;
      }

      this.$apollo.mutate({
        mutation,
        variables,
      }).then(({ data }) => {
        const ret = data.login ? data.login : data.signup;
        this.token = ret.jwt.token;
        onLogin(this.$apollo.provider.defaultClient, ret.jwt.token);
        this.$refs.authModal.hide();
        if (this.activeMode === 'register') {
          this.$root.$emit('bv::show::modal', 'welcome-modal');
        }
        if (localStorage.nextRoute) {
          this.$router.push(JSON.parse(localStorage.nextRoute));
          delete localStorage.nextRoute;
          window.location.reload(); // FIXME: otherwise user won't be signed in...
        }
      }).catch((err) => {
        if (this.activeMode === 'signin') {
          console.log(`Login error: ${err}`);
          this.showAlert = true;
        } else {
          console.log(`Signup error: ${err}`);
          this.alertMessage = 'Signup error!';
          this.showAlert = true;
        }
      });
    },
    onReset() {
      this.form.name = '';
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

<style lang="scss" scoped>
button[type="submit"] {
    width: 100%;
}
.footer-link {
    text-align: center;
}
</style>
