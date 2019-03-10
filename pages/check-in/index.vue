<template>
  <div>
    <div class="top-half">
      <div class="logo"><img src="/images/Logo - orange - url.png"></div>
      <div class="check-in-button">
        <b-btn :to="{ name: 'check-in-2' }">Tap to check in &gt;</b-btn>
      </div>
    </div>
    <div class="bottom-half">
      <!-- <b-link class="qr-link" href="#" @click="getQrScan">I just scanned a QR code</b-link> -->
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag';
  import { mapState, mapMutations } from 'vuex'
  import * as misc from '@/graphql/misc';
  export default {
    components: {
    },
    data() {
      return {
      };
    },
    computed: {
      ...mapState('checkin', {
        qrData: state => state.qrData,
      }),
    },
    mounted() {
      this.clearQrData();
    },
    methods: {
      ...mapMutations('checkin', ['setQrData', 'clearQrData']),

      async getQrScan() {
        const ret = await this.$apollo.query({ query: misc.query.get_latest_qr_scan });
        this.qrScan(ret.data.get_latest_qr_scan);
      },

      qrScan(qrData) {
        this.setQrData(qrData);
        this.$router.push({ name: 'check-in-2'});
      },
    },
    head() {
      return {
        title: 'Check in',
      };
    },
  };
</script>

<style lang="scss">
  nav.navbar, .footer { display: none !important; }
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

    .qr-link {
      position: absolute;
      bottom: 2em;
      left: 0;
      width: 100%;
      text-align: center;
      font-size: 1.25rem;
    }
  }
</style>
