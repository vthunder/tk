<template>
  <div>
    <b-modal
      id="auth-modal" ref="authModal"
      centered hide-footer
      @ok.prevent="onSubmit" @hide="onReset">

      <template slot="modal-title">{{ mode[activeMode].title }}</template>
      <b-alert :show="showAlert" variant="danger">{{ alertMessage }}</b-alert>

      <b-form v-if="showForm" @submit.prevent="onSubmit" @reset="onReset">
        <b-form-group v-if="activeMode === 'register'"
                      label="Name" label-sr-only label-for="name-field">
          <b-form-input
            id="name-field"
            v-model="form.name"
            type="text"
            required
            placeholder="Name"/>
        </b-form-group>
        <b-form-group label="Email" label-sr-only label-for="email-field">
          <b-form-input
            id="email-field"
            v-model="form.email"
            type="email"
            required
            placeholder="Email"/>
        </b-form-group>
        <b-form-group
          v-if="activeMode !== 'forgot'"
          label="Password" label-sr-only label-for="password-field">
          <b-form-input
            id="password-field"
            v-model="form.password"
            type="password"
            required
            placeholder="Password"/>
        </b-form-group>
        <b-button type="submit" variant="primary">
          {{ mode[activeMode].submitText }}
        </b-button>
      </b-form>

      <div class="footer-link mt-2">
        {{ mode[activeMode].footerPrompt }}
        <b-link @click="switchMode">{{ mode[activeMode].footerLink }}</b-link>
        <span v-if="activeMode === 'signin'">
          &nbsp;&middot;&nbsp;
          <b-link @click="switchMode('forgot')">Forgot your password?</b-link>
        </span>
      </div>
    </b-modal>
    <b-modal
      id="welcome-modal" ref="welcomeModal" title="Welcome!"
      ok-title="Let's get cookin'!" ok-only centered
      @ok="goToNext">
      <p>Welcome to Tinker Kitchen! Hope to cook up a storm with you
      at our makerspace :-)</p>
    </b-modal>
  </div>
</template>

<script>
import * as auth from '@/graphql/auth';

export default {
  data() {
    return {
      activeMode: 'register',
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
          footerLink: 'I already have an account',
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

        if (ok === 'OK') this.alertMessage = 'Email sent';
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
        await this.$apolloHelpers.onLogin(ret.jwt.token);
        this.$refs.authModal.hide();
        if (this.activeMode === 'register') {
          this.$refs.welcomeModal.show();
        } else {
          this.goToNext();
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
    goToNext() {
      if (localStorage.nextRoute) {
        this.$router.push(JSON.parse(localStorage.nextRoute));
        delete localStorage.nextRoute;
      }
      if (localStorage.nextAction) {
        const action = localStorage.nextAction;
        delete localStorage.nextAction;
        this.$root.$emit(action);
      }
      this.$root.$emit('tk::auth-modal::complete');
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
