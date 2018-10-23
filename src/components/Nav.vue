<template>
    <b-navbar fixed="top" type="dark" variant="dark" toggleable="md">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand href="/"/>

        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav class="ml-auto">
                <b-collapse is-nav id="nav_collapse_icons">
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
                </b-collapse>
                <b-nav-item-dropdown v-if="me" :text=me.name right>
                    <b-nav-text class="signed-in-as">Signed in as {{ me.name }}</b-nav-text>
                    <b-dd-item :to="{ name: 'member-account' }">Account</b-dd-item>
                    <b-dd-item :to="{ name: 'member-membership' }">Membership</b-dd-item>
                    <b-dd-item :to="{ name: 'member-daypasses' }">Day Passes</b-dd-item>
                    <b-dd-item :to="{ name: 'member-rentals' }">Rentals</b-dd-item>
                    <b-dd-item :to="{ name: 'member-billing' }">Billing</b-dd-item>
                    <b-dd-item :to="{ name: 'member-coupon' }">Redeem Coupon</b-dd-item>
                    <b-dd-divider></b-dd-divider>
                    <b-dd-item-button @click="signout()">Sign out</b-dd-item-button>
                </b-nav-item-dropdown>
                <b-nav-item v-else v-b-modal.auth-modal>
                    <span v-if="enable_login">Sign in
                        <i class="fas fa-sign-in-alt"></i>
                    </span>
                </b-nav-item>
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
      enable_login: process.env.VUE_APP_ENABLE_LOGIN === 'true',
    };
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
    signout() {
      onLogout(this.$apollo.provider.defaultClient);
    },
  },
};
</script>

<style lang="scss">
.navbar-collapse {
    background:rgb(52, 58, 64);
}

.navbar {
    line-height: 1;

    .navbar-toggler {
        font-size: .85rem;
        padding: 4px;
    }

    .navbar-brand {
        background: url('/images/TK Wordmark White (1x).png');
        background-repeat: no-repeat;
        background-size: contain;
        height: 1.2rem;
        width: 320px;

        @media (min-width: 576px) { height: 1.4rem; }
    }

    .signed-in-as { display: none; }

    @media only screen and (max-width: 768px) {
        li > a.dropdown-toggle {
            display: none;
        }
        .signed-in-as { display: block; }
        .dropdown-menu {
            display:block;
            position: static;
            float: none;
            width: auto;
            margin-top: 0;
            background-color: transparent;
            border: 0;
            -webkit-box-shadow: none;
            box-shadow: none;
        }
        .dropdown-item {
            color: white;

            &:hover {
                color: #212529;
            }
        }
    }
}
.social-icon {
    opacity: 0.8;
    transition: opacity 250ms;
}
.social-icon:hover {
    opacity: 1;
}
</style>
