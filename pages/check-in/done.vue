<template>
  <b-container class="thanks-form">
    <b-row align-h="center">
      <b-col sm="8" class="thanks-content">
        <h2 class="thanks-msg">Thanks for checking in!</h2>
        <b-card v-if="showSub" bg-variant="dark" text-variant="white" class="subscribe-card">
          <h2>Stay in touch</h2>
          <div class="ml-btn">
            <b-btn v-if="subSuccess === null" variant="primary" @click="subscribe">
              Get TK news via email
            </b-btn>
            <div v-else-if="subFailure">
              Oops... something went wrong. Please let TK staff know!
            </div>
            <div v-else>
              Success! Thanks for subscribing :-)
            </div>
          </div>
        </b-card>
        <div class="next-button">
          <b-btn :to="{ name: 'check-in' }">Reset Form</b-btn>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import VueMarkdown from 'vue-markdown';
  import { mapState } from 'vuex'
  import * as misc from '@/graphql/misc';

  export default {
    components: {
      VueMarkdown,
    },
    data() {
      return {
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
        return true;
      },
    },
    methods: {
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
          this.subSuccess = true;
        }).catch(({ graphQLErrors: [{ message }] }) => {
          switch (message) {
            case 'Member Exists':
              this.successMsg = 'Success! But... it seems you were already subscribed.';
              this.subSuccess = true;
              break;
            default:
              this.failure = true;
          }
        });
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
