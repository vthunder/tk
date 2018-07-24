import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Calendar from './views/Calendar.vue';
import Event from './views/Event.vue';
import Membership from './views/Membership.vue';
import MemberMembership from './views/member/Membership.vue';
import MemberDayPasses from './views/member/DayPasses.vue';
import MemberBilling from './views/member/Billing.vue';

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
      path: '/event/:id',
      name: 'event',
      component: Event,
    },
    {
      path: '/membership',
      name: 'learn-membership',
      component: Membership,
    },
    {
      path: '/member/membership',
      name: 'member-membership',
      component: MemberMembership,
    },
    {
      path: '/member/daypasses',
      name: 'member-daypasses',
      component: MemberDayPasses,
    },
    {
      path: '/member/billing',
      name: 'member-billing',
      component: MemberBilling,
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});
