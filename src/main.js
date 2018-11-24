import Vue from 'vue';
import Meta from 'vue-meta';
import BootstrapVue from 'bootstrap-vue';
import VueStripeCheckout from 'vue-stripe-checkout';
import VueAnalytics from 'vue-analytics';
import Vue2Filters from 'vue2-filters';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from './App.vue';
import router from './router';
import { createProvider } from './vue-apollo';

Vue.use(Meta);
Vue.use(Vue2Filters);
Vue.use(BootstrapVue);
Vue.use(VueStripeCheckout, {
  key: process.env.VUE_APP_STRIPE_KEY,
  name: 'Tinker Kitchen',
  image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
  locale: 'auto',
  currency: 'USD',
  allowRememberMe: false,
  zipCode: true,
});

Vue.use(VueAnalytics, {
  id: 'UA-54365170-1',
  debug: {
    sendHitTask: process.env.VUE_APP_ENV === 'production',
  },
  router,
});

Vue.config.productionTip = false;

new Vue({
  router,
  provide: createProvider({ wsEndpoint: null }).provide(),
  render: h => h(App),
}).$mount('#app');
