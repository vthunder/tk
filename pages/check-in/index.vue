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
      <div v-show="kiosk" class="qr-code">
        <img src="/images/Check in QR code.png">
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import * as auth from '@/graphql/auth';
  import * as misc from '@/graphql/misc';

  export default {
    components: {
    },

    data() {
      return {
        me: null,
      };
    },
    apollo: {
      me: auth.query.me,
    },

    computed: mapState('layout', ['kiosk']),

    mounted() {
      this.setNoload('drift');
      this.kioskSetup();
      setTimeout(() => { this.kioskSetup(); }, 1000); // FIXME: uuuuuuggggghhhh
    },

    methods: {
      ...mapMutations('layout', ['setKiosk', 'setShow', 'setHide', 'setLoad', 'setNoload']),
      ...mapMutations('checkin', ['setName', 'setEmail', 'setUserType', 'clearUserData']),

      kioskSetup() {
        if (this.$route.query.kiosk) {
          this.setKiosk(parseInt(this.$route.query.kiosk, 10));
        }
      },

      goto3() {
        this.setName(this.me.name);
        this.setEmail(this.me.email);
        this.setUserType('member');
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
