<template>
  <div>
    <div class="top-half">
      <no-ssr>
        <qrcode-stream :camera="{ facingMode: 'environment' }" @decode="onDecode"/>
      </no-ssr>
      {{ qrData }}
      <div class="check-in-button">
        <b-btn :to="{ name: 'check-in-2' }">Tap to check in &gt;</b-btn>
      </div>
    </div>
  </div>
</template>

<script>
  const QrcodeStream =
    process.client ? require('vue-qrcode-reader').QrcodeStream : undefined;

  export default {
    components: {
      QrcodeStream,
    },
    data() {
      return {
        qrData: '',
      };
    },
    methods: {
      onDecode(str) {
        this.qrData = str;
      },
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
      width: 100%;

      img { width: 25%; }
    }

    .qrcode-stream__camera {
//      display: none;
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
</style>
