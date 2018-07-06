import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Calendar from './views/Calendar.vue';
import Membership from './views/Membership.vue';
import About from './views/About.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar,
    },
    {
      path: '/membership',
      name: 'membership',
      component: Membership,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
  ],
});
