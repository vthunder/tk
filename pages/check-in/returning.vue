<template>
  <div class="form">
    <div class="top-buttons">
      <b-btn :to="{ name: 'check-in' }">&lt;</b-btn>
      <b-btn :to="{ name: 'check-in-2' }">&gt;</b-btn>
    </div>

    <div class="center-form">
      <h2 class="mt-4">Email address</h2>
      <b-form-input/>
    </div>

    <div class="next-button">
      <b-btn :to="{ name: 'check-in-2' }">Next &gt;</b-btn>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mladd: false,
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

  .btn {
    background-color: #CC562A;
    border: 0;
    color: #fff;
    font-size: 2rem;
    padding: .5em 1em;
    font-weight: 600;
  }

  .form {
    position: relative;
    top: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .top-buttons {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      position: absolute;
      top: 0;
      padding: 2em;
      width: 100%;
    }

    .center-form {
      max-width: 50em;
      * { width: 100%; }
      .ml-add {
        font-family: 'Museo sans rounded';
        padding-left: 1.75rem;
        .custom-control-label::before {
          left: -1.75rem;
          height: 1.5rem;
          width: 1.5rem;
        }
        .custom-control-label::after {
          left: -1.75rem;
          height: 1.5rem;
          width: 1.5rem;
        }
      }
    }

    .next-button {
      display: flex;
      flex-direction: row;
      justify-content: center;
      position: absolute;
      bottom: 2em;
      width: 100%;
    }
  }
</style>
