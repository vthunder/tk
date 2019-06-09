<template>
  <div>
    <div class="top-half">
      <div class="logo"><img src="/images/Logo - orange - url.png"></div>
      <div v-if="me.name">
        <div class="check-in-button">
          <b-btn @click="goto3">Check in as {{ me.name }}</b-btn>
          <p class="im-not-me">
            <b-link :to="{ name: 'check-in-2' }" class="ml-2 pb-1">I'm not {{ me.name }}</b-link>
          </p>
        </div>
      </div>
      <div v-else>
        <div class="check-in-button">
          <b-btn :to="{ name: 'check-in-2' }">Tap to check in &gt;</b-btn>
        </div>
      </div>
    </div>
    <div class="bottom-half">
      <div v-if="kiosk" class="qr-code">
        <img src="/images/Check in QR code.png">
        &lt;---- Scan me with the camera app on your phone!
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import * as auth from '@/graphql/auth';

  export default {
    data() {
      return {
        me: null,
        kiosk: this.$route.query.kiosk? true : false,
      };
    },
    apollo: {
      me: auth.query.me,
    },
    mounted() {
      this.set_noload('drift');
      this.set_hide('footer');
      if (this.kiosk) {
        this.set_hide('signIn');
      } else {
        this.set_show('signIn');
      }
    },
    methods: {
      ...mapMutations('layout', ['set_show', 'set_hide', 'set_load', 'set_noload']),
      ...mapMutations('checkin', ['setName', 'setEmail', 'clearUserData']),

      goto3() {
        this.setName(this.me.name);
        this.setEmail(this.me.email);
        this.$router.push({ name: 'check-in-3' });
      },

      head() {
        return {
          title: 'Check in',
        };
      },
    },
  };
</script>

<style lang="scss">
  #app .navbar {
    background-color: inherit;
    box-shadow: none;
    .navbar-brand { display: none; }
    .nav-item { display: block; }
    .signin-link, .signin-name a { color: black; }
  }

  #router-view {
    height: 100vh;
    padding: 0 !important;
  }
  .top-half {
    position: relative;
    top: 0;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .logo {
      display: flex;
      flex-direction: row;
      justify-content: center;

      img {
        height: 40vh;
        object-fit: contain;
      }
    }

    .qrcode-stream__camera {
      display: none;
    }

    .check-in-button {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      position: absolute;
      bottom: -2.25em;
      width: 100%;

      .btn {
        background-color: #CC562A;
        color: #fff;
        border: 0;
        font-size: 2rem;
        padding: .5em 1em;
        font-weight: 600;
      }

      .im-not-me {
        position: absolute;
        bottom: -3em;
        text-align: center;
        width: 100%;
      }
    }
  }
  .bottom-half {
    background-color: #ddd;
    height: 40%;

    .qr-code {
      position: absolute;
      bottom: 2em;
      left: 2em;
      img { width: 6em; }
    }
  }
</style>
