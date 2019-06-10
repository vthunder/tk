<template>
  <div v-if="loading" />
  <div v-else class="form">
    <div class="top-buttons">
      <b-btn :to="{ name: 'check-in' }">&lt;</b-btn>
      <b-btn :disabled="notReadyNext" @click="next">&gt;</b-btn>
    </div>

    <div class="center-form">
      <h2>Full name</h2>
      <b-form-input v-model="name" />
      <h2 class="mt-4">Email address</h2>
      <b-form-input v-model="email" type="email" />
      <h2 class="mt-4">I am... (select one)</h2>
      <b-select v-model="userType" :options="userTypeOpts" />
    </div>

    <div class="next-button">
      <b-btn :disabled="notReadyNext" @click="next">Next &gt;</b-btn>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import * as auth from '@/graphql/auth';

  export default {
    layout: 'bare',
    data() {
      return {
        loading: true,
        name: '',
        email: '',
        userType: '',
        userTypeOpts: [
          { value: 'guest', text: 'A guest of a member'},
          { value: 'daypass', text: 'Using a day pass / gift certificate'},
          { value: 'class', text: 'Here for a class/event'},
          { value: 'member', text: 'Member'},
        ],
      };
    },
    computed: {
      ...mapState('checkin', {
        userData: state => state.userData,
      }),
      notReadyNext() {
        if (this.name && this.email && this.userType) return false;
        return true;
      },
    },
    async mounted() {
      this.clearUserData();
      const ret = await this.$apollo.query({ query: auth.query.me })
      if (ret && ret.data && ret.data.me) {
        this.name = ret.data.me.name;
        this.email = ret.data.me.email;
      }
      this.loading = false;
    },
    methods: {
      ...mapMutations('checkin', ['setName', 'setEmail', 'setUserType', 'clearUserData']),

      next() {
        this.setName(this.name);
        this.setEmail(this.email);
        this.setUserType(this.userType);
        this.$router.push({ name: 'check-in-3' });
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
    display: flex;
    flex-direction: column;
    align-items: center;

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
      padding-top: 8em;
      max-width: 50em;
      * { width: 100%; }
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
