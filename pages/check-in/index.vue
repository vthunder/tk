<template>
  <div>
    <div class="top-half">
      <div class="logo"><img src="/images/Logo - orange - url.png"></div>
      <div class="check-in-button">
        <b-btn :to="{ name: 'check-in-2' }">Tap to check in &gt;</b-btn>
      </div>
    </div>
    <div class="bottom-half">
      <img v-if="kiosk" class="qr-code" src="/images/Check in QR code.png">
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        kiosk: this.$route.query.kiosk? true : false,
      };
    },
    mounted() {
      this.set_noload('drift');
      if (this.kiosk) {
        this.set_hide('signIn');
      } else {
        this.set_show('signIn');
      }
    },
    methods: mapMutations('layout', ['set_show', 'set_hide', 'set_load', 'set_noload']),
    head() {
      return {
        title: 'Check in',
      };
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
    }
  }
  .bottom-half {
    background-color: #ddd;
    height: 40%;

    .qr-code {
      position: absolute;
      bottom: 2em;
      left: 2em;
      width: 6em;
    }
  }
</style>
