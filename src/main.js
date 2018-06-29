import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from './App.vue';
import router from './router';
import { createProvider } from './vue-apollo';

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  router,
  provide: createProvider({ wsEndpoint: null }).provide(),
  render: h => h(App),
}).$mount('#app');
