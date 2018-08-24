<template>
    <div>
        <b-alert :show=success variant="success">
            {{ successMsg }}
        </b-alert>
        <b-alert :show=failure variant="danger">
            {{ failureMsg }}
        </b-alert>
        <b-form @submit="onSubmit" @reset="onReset" v-if="showForm">
            <div class="cta-text">{{ ctaText }}</div>
            <b-form-group label="Email" label-sr-only label-for="email-field">
                <b-input-group>
                    <b-form-input id="email-field"
                                  type="email"
                                  v-model="form.email"
                                  required
                                  placeholder="your.email@example.com">
                    </b-form-input>
                    <b-input-group-append>
                        <b-button type="submit" :variant=btnVariant>Subscribe</b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-form-group>
        </b-form>
    </div>
</template>

<script>
import * as auth from '../graphql/auth';
import * as misc from '../graphql/misc';

export default {
  props: ['cta', 'variant', 'list'],
  data() {
    return {
      btnVariant: this.variant ? this.variant : 'primary',
      me: null,
      success: false,
      successMsg: 'Thanks! Check your email to confirm your subscription.',
      failure: false,
      failureMsg: 'Oops, something went wrong. Maybe you mistyped your email?',
      form: {
        email: '',
      },
      showForm: true,
    };
  },
  computed: {
    ctaText() {
      return this.cta ? this.cta :
        'Sign up below to hear the latest and get on our membership waitlist.';
    },
    listName() {
      return this.list ? this.list :
        'Tinker Kitchen Newsletter';
    },
  },
  apollo: {
    me: {
      query: auth.query.me,
      update(data) {
        if (data.me) return data.me;
        return null;
      },
    },
  },
  methods: {
    onSubmit() {
      try {
        this.$ga.event('SubscribeButton', 'click');
      } catch (e) { /* ignore */ }

      this.success = false;
      this.failure = false;

      const mutation = misc.mutation.mailing_list_signup;
      const variables = {
        email: this.form.email,
        list: this.listName,
      };

      this.$apollo.mutate({
        mutation,
        variables,
      }).then(() => {
        this.success = true;
        this.showForm = false;
      }).catch(({ graphQLErrors: [{ message }] }) => {
        switch (message) {
          case 'Member Exists':
            this.successMsg = 'Success! But... it seems you were already subscribed.';
            this.success = true;
            this.showForm = false;
            break;
          default:
            this.failure = true;
        }
      });
    },
    onReset() {
      this.success = false;
      this.failure = false;
      this.form.email = '';
      /* Trick to reset/clear native browser form validation state */
      this.showForm = false;
      this.$nextTick(() => { this.showForm = true; });
    },
  },
};
</script>

<style>
.cta-text {
    font-family: museo;
    font-weight: 300;
}
</style>
