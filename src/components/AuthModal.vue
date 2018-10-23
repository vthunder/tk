<template>
    <b-modal id="auth-modal" ref="authModal"
             centered hide-footer
             @ok.prevent=onSubmit @hide=onReset>

        <template slot="modal-title">{{ mode[activeMode].title }}</template>
        <b-alert :show=showAlert variant="danger">{{ alertMessage }}</b-alert>

        <b-form @submit.prevent="onSubmit" @reset="onReset" v-if="showForm">
            <b-form-group v-if="activeMode === 'register'"
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
            <b-form-group v-if="activeMode !== 'forgot'"
                          label="Password" label-sr-only label-for="password-field">
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
            &nbsp;&middot;&nbsp;
            <b-link @click="switchMode('forgot')">Forgot your password?</b-link>
        </div>
    </b-modal>
</template>

<script>
import { onLogin } from '@/vue-apollo';
import * as auth from '@/graphql/auth';

export default {
  data() {
    return {
      activeMode: 'signin',
      alertMessage: 'Invalid username/password',
      form: {
        name: '',
        email: '',
        password: null,
      },
      mode: {
        signin: {
          title: 'Sign in',
          submitText: 'Sign in',
          footerPrompt: '',
          footerLink: 'Register new account',
        },
        register: {
          title: 'Register',
          submitText: 'Register',
          footerPrompt: '',
          footerLink: 'Use existing account',
        },
        forgot: {
          title: 'Forgot password',
          submitText: 'Submit',
          footerPrompt: '',
          footerLink: 'Back to Sign in',
        },
      },
      showAlert: false,
      showForm: true,
    };
  },
  mounted() {
    this.$root.$on('tk::auth-modal::open', this.open);
  },
  methods: {
    open() {
      this.onReset();
      this.$refs.authModal.show();
    },
    switchMode(forgot) {
      if (forgot === 'forgot') {
        this.activeMode = 'forgot';
        this.onReset();
        return;
      }
      this.activeMode = (this.activeMode === 'signin') ? 'register' : 'signin';
      this.onReset();
    },
    async onSubmit() {
      let mutation = auth.mutation.login;
      const variables = {
        email: this.form.email,
        password: this.form.password,
      };

      if (this.activeMode === 'forgot') {
        const { data: { forgot_password: ok } } = await this.$apollo.mutate({
          mutation: auth.mutation.forgot_password,
          variables: { email: this.form.email },
        });

        if (ok) this.alertMessage = 'Email sent';
        else this.alertMessage = ok;
        this.showAlert = true;

        return;
      }

      if (this.activeMode === 'register') {
        mutation = auth.mutation.signup;
        variables.name = this.form.name;
      }

      try {
        const { data } = await this.$apollo.mutate({ mutation, variables });
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
      } catch (e) {
        if (this.activeMode === 'signin') {
          console.log(`Login error: ${e}`);
          this.showAlert = true;
        } else {
          console.log(`Signup error: ${e}`);
          this.alertMessage = 'Signup error!';
          this.showAlert = true;
        }
      }
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
