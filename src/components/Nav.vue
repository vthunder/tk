<template>
    <b-navbar fixed type="dark" variant="dark" toggleable="md">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand href="/"/>

        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav class="ml-auto">

                <b-nav-item href="https://instagram.com/tinkerkitch/">
                    <img src="/images/Instagram-White2x.png" width="24"
                            class="social-icon">
                </b-nav-item>
                <b-nav-item href="https://twitter.com/tinkerkitch">
                    <img src="/images/Twitter-White2x.png" width="24"
                         class="social-icon">
                </b-nav-item>
                <b-nav-item href="https://www.facebook.com/tinkerkitchen">
                    <img src="/images/Facebook-White2x.png" width="24"
                         class="social-icon">
                </b-nav-item>

                <b-nav-item-dropdown v-if="me" :text=me.name right>
                    <b-dd-item-button :to="'member-membership'">Membership</b-dd-item-button>
                    <b-dd-item-button @click="signout()">Sign out</b-dd-item-button>
                </b-nav-item-dropdown>
                <b-nav-item v-else v-b-modal.auth-modal>Sign in
                    <i class="fas fa-sign-in-alt"></i></b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import * as auth from '../graphql/auth';
import { onLogout } from '../vue-apollo';

export default {
  data() {
    return {
      me: '',
    };
  },
  apollo: {
    me: auth.query.me,
  },
  methods: {
    signout() {
      onLogout(this.$apollo.provider.defaultClient);
    },
  },
};
</script>

<style lang="scss">
 .navbar .navbar-brand {
     background: url('/images/TK Wordmark White (1x).png');
     background-size: 220px 16px;
     width: 220px;
     height: 16px;
 }
 @media (min-width: 576px) {
     .navbar .navbar-brand {
         background-size: 300px 22px;
         width: 300px;
         height: 22px;
     }
 }

 /* Also used in footer */
 .social-icon {
     opacity: 0.8;
     transition: opacity 250ms;
 }
 .social-icon:hover {
     opacity: 1;
 }
</style>
