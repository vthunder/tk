import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Calendar from '@/views/Calendar.vue';
import Event from '@/views/Event.vue';
import Membership from '@/views/Membership.vue';
import FAQ from '@/views/FAQ.vue';
import Groups from '@/views/Groups.vue';
import Commercial from '@/views/Commercial.vue';
import AdminCoupons from '@/views/admin/Coupons.vue';
import AdminEvent from '@/views/admin/Event.vue';
import MemberAccount from '@/views/member/Account.vue';
import MemberMembership from '@/views/member/Membership.vue';
import MemberDayPasses from '@/views/member/DayPasses.vue';
import MemberRentals from '@/views/member/Rentals.vue';
import MemberBilling from '@/views/member/Billing.vue';
import MemberCoupon from '@/views/member/Coupon.vue';
import AccountVerify from '@/views/member/Verify.vue';
import AccountForgot from '@/views/member/Forgot.vue';
import Kickstarter from '@/views/Kickstarter.vue';
import Press from '@/views/Press.vue';
import Incubator from '@/views/Incubator.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
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
      path: '/faq',
      name: 'faq',
      component: FAQ,
    },
    {
      path: '/groups',
      name: 'groups',
      component: Groups,
    },
    {
      path: '/commercial',
      name: 'commercial',
      component: Commercial,
    },
    {
      path: '/account',
      name: 'account-home',
      redirect: { name: 'member-membership' },
    },
    {
      path: '/account/account',
      name: 'member-account',
      component: MemberAccount,
    },
    {
      path: '/account/membership',
      name: 'member-membership',
      component: MemberMembership,
    },
    {
      path: '/account/daypasses',
      name: 'member-daypasses',
      component: MemberDayPasses,
    },
    {
      path: '/account/rentals',
      name: 'member-rentals',
      component: MemberRentals,
    },
    {
      path: '/account/billing',
      name: 'member-billing',
      component: MemberBilling,
    },
    {
      path: '/account/coupon',
      name: 'member-coupon',
      component: MemberCoupon,
    },
    {
      path: '/account/verify/:token(.*)',
      component: AccountVerify,
      props: true,
    },
    {
      path: '/account/forgot/:token(.*)',
      component: AccountForgot,
      props: true,
    },
    {
      path: '/ks',
      name: 'kickstarter',
      component: Kickstarter,
      alias: '/ksshare',
    },
    {
      path: '/press',
      name: 'press',
      component: Press,
    },
    {
      path: '/incubator',
      name: 'incubator',
      component: Incubator,
    },
    {
      path: '/admin',
      name: 'admin-home',
      redirect: { name: 'admin-coupons' },
    },
    {
      path: '/admin/coupons',
      name: 'admin-coupons',
      component: AdminCoupons,
    },
    {
      path: '/admin/events',
      name: 'admin-events',
      component: AdminEvent,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});
