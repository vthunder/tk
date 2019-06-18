<template>
  <b-container class="thanks-form">
    <b-row align-h="center">
      <b-col sm="8" class="thanks-content">
        <h2>Thanks for checking in!</h2>
        <div v-if="subscribed === false" class="next-button">
          <b-btn variant="primary" @click="subscribe">Subscribe to Our Email List</b-btn>
          <b-btn :to="{ name: 'check-in' }">No Thanks</b-btn>
        </div>
        <div v-else-if="subscribed" class="next-button">
          <b-btn :to="{ name: 'check-in' }">Done</b-btn>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import VueMarkdown from 'vue-markdown';
  import { mapState, mapMutations } from 'vuex'
  import * as misc from '@/graphql/misc';

  export default {
    layout: 'bare',
    components: {
      VueMarkdown,
    },
    data() {
      return {
        subscribed: null,
        subSuccess: null,
        subFailure: false,
        successMsg: '',
      };
    },
    computed: {
      ...mapState('checkin', {
        userData: state => state.userData,
      }),
      showSub() {
        return this.subscribed === false;
      },
    },
    watch: {
      'userData.email': {
        handler(newVal) { this.checkSubscription(); },
      },
    },
    mounted() {
      this.setNoload('drift');
      this.setHide('footer');
      this.setHide('signIn');
      this.checkSubscription();
    },
    methods: {
      ...mapMutations('layout', ['setShow', 'setHide', 'setLoad', 'setNoload']),

      async checkSubscription() {
        if (!this.userData || !this.userData.email) return;

        const ret = await this.$apollo.query({
          query: misc.query.mailing_list_check,
          variables: {
            email: this.userData.email,
          }
        });
        if (ret && ret.data) {
          this.subscribed = ret.data.mailing_list_check;
        }
      },

      subscribe() {
        this.subSuccess = null;
        this.subFailure = false;

        this.$apollo.mutate({
          mutation: misc.mutation.mailing_list_signup,
          variables: {
            name: this.userData.name,
            email: this.userData.email,
            list: 'Tinker Kitchen Newsletter',
          },
        }).then(() => {
          this.$router.push({ name: 'check-in' });
        }).catch(({ graphQLErrors: [{ message }] }) => {
          switch (message) {
            case 'Member Exists':
              this.successMsg = 'Success! But... it seems you were already subscribed.';
              this.subSuccess = true;
              break;
            default:
              this.failure = true;
          }
          // fixme: should we show an error?
          this.$router.push({ name: 'check-in' });
        });
      },
    },
  };
</script>

<style lang="scss">
  #router-view {
    height: 100vh;
    padding: 0 !important;
  }

  .thanks-form {
    .row {
      height: 100%;

      .thanks-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 10% 0;
        .ml-btn, .next-button { text-align: center; }
      }
    }
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
      max-width: 50em;
      padding-top: 8em;
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
