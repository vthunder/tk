<template>
  <b-navbar :class="{ subpage }" fixed="top" toggleable="md">
    <b-navbar-toggle v-if="me.name" target="nav_collapse"><i class="fas fa-bars"/></b-navbar-toggle>
    <b-navbar-brand :to="{ name: 'index' }"/>
    <span/>

    <b-nav-item v-b-modal.auth-modal v-if="!me.name">
      <span class="signin-link">Sign in <i class="fas fa-sign-in-alt"/></span>
    </b-nav-item>
    <b-collapse id="nav_collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown v-if="me.name" :text="me.name" right>
          <b-nav-text class="signed-in-as">Signed in as: {{ me.name }}</b-nav-text>
          <b-dd-item :to="{ name: 'account-account' }">Account</b-dd-item>
          <b-dd-item :to="{ name: 'account-billing' }">Billing</b-dd-item>
          <b-dd-item :to="{ name: 'account-coupon' }">Redeem Coupon</b-dd-item>
          <b-dd-divider/>
          <b-dd-item-button @click="signout()">Sign out</b-dd-item-button>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
  import * as auth from '../graphql/auth';

  export default {
    props: {
      subpage: { type: Boolean, default: false },
    },
    data() {
      return {
        me: '',
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
    mounted() {
      this.$root.$on('tk::nav::subpage', this.updateSubpage);
    },
    destroyed() {
      this.$root.$off('tk::nav::subpage', this.updateSubpage);
    },
    methods: {
      signout() {
        this.$apolloHelpers.onLogout()
      },
      updateSubpage(newValue) {
        this.subpage = newValue;
      },
    },
  };
</script>

<style lang="scss">
  .navbar-collapse.collapsing,
  .navbar-collapse.show {
    background: #f8f9fa;
    margin-top: .5em;
    border-radius: 10px;
  }

  .navbar {
    background: rgba(2, 2, 5, 0);
    box-shadow: 0 4px 8px rgba(14, 13, 29, 0);
    transition: all 250ms ease-out;
    line-height: 1;

    &.subpage {
      background: rgba(2, 2, 5, .8);
      box-shadow: 0 4px 8px rgba(14, 13, 29, 0.2);
    }

    .navbar-toggler {
      color: white;
      font-size: .85rem;
      padding: 4px;
    }

    .navbar-brand {
      background: url('/images/TK Wordmark White (1x).png');
      background-repeat: no-repeat;
      background-size: contain;
      height: 1.2rem;
      width: 250px;

      @media (min-width: 576px) {
        height: 1.4rem;
        width: 320px;
      }
    }

    .signed-in-as {
      display: none;
      margin-left: 1em;
    }

    .signin-link {
      color: white;
    }

    #nav_collapse > ul > li > a {
      color: white;
    }

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
      .dropdown-item:hover {
        background-color: #212529;
        color: #343a40;
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
