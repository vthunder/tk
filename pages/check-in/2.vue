<template>
  <div class="form">
    <div class="top-buttons">
      <b-btn :to="{ name: 'check-in' }">&lt;</b-btn>
      <b-btn :to="{ name: 'check-in-3' }">&gt;</b-btn>
    </div>

    <div class="center-form">
      <h2>Full name</h2>
      <b-form-input v-model="name" />
      <h2 class="mt-4">Email address</h2>
      <b-form-input v-model="email" type="email" />
      <!--
      <h2 class="mt-4">I am a...</h2>
      <b-select v-model="userType" :options="userTypeOpts" />
       -->
      <h2 class="mt-4">
        <b-form-checkbox id="mladd" v-model="mladd" class="ml-add">
          Add me to the TK mailing list
        </b-form-checkbox>
      </h2>
    </div>

    <div class="next-button">
      <b-btn :disabled="!name || !email" @click="next">Next &gt;</b-btn>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        mladd: false,
        name: '',
        email: '',
        userType: '',
        userTypeOpts: [
          { value: 'guest', text: 'Guest'},
          { value: 'member', text: 'Member'},
        ],
      };
    },
    computed: {
      ...mapState('checkin', {
        qrData: state => state.qrData,
        userData: state => state.userData,
      }),
    },
    mounted() {
      this.clearUserData();
      // if (this.qrData) {
      //   this.name = qrData.name;
      //   this.email = qrData.email;
      // }
    },
    methods: {
      ...mapMutations('checkin', ['clearQrData', 'setName', 'setEmail',
                                  'setAddToMailingList', 'clearUserData']),

      next() {
        this.setName(this.name);
        this.setEmail(this.email);
        this.setAddToMailingList(this.mladd);
        this.$router.push({ name: 'check-in-3' });
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
