import Vue from 'vue'; // eslint-disable-line import/no-extraneous-dependencies
import VueStripeCheckout from 'vue-stripe-checkout';

Vue.use(VueStripeCheckout, process.env.VUE_APP_STRIPE_KEY);
