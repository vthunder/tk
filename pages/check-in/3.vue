<template>
  <b-container v-if="loading" />
  <b-container v-else>
    <div class="top-buttons">
      <b-btn :to="{ name: 'check-in' }">&lt;</b-btn>
    </div>

    <b-row align-h="center">
      <b-col sm="10">
        <iframe
          :src="'/vendor/pdfjs/web/viewer.html?file=/files/' + terms[current] + '#scrollTop=0'"
          class="tos-viewer" />
      </b-col>
    </b-row>

    <div class="agree-button">
      <b-btn @click="agree()">I Agree</b-btn>
    </div>
  </b-container>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import MdViewer from '@/components/MdViewer.vue';
  import * as misc from '@/graphql/misc';

  export default {
    components: {
      MdViewer,
    },
    data() {
      return {
        loading: true,
        current: 0,
        terms: [
          'Liability_Waiver_and_Media_Release_2018_11_10.pdf',
        ],
      };
    },
    computed: {
      ...mapState('checkin', {
        userData: state => state.userData,
      }),
    },
    async mounted() {
      const ret = await this.$apollo.query({
        query: misc.query.get_legal_terms,
        variables: { name: this.userData.name, email: this.userData.email },
      });
      this.terms = ret.data.get_legal_terms;
      if (!this.terms.length) {
        this.$router.push({ name: 'check-in-done' });
      } else {
        this.loading = false;
      }
    },
    methods: {
      ...mapMutations('checkin', ['setAgreedToTerms']),

      async agree() {
        this.setAgreedToTerms(this.terms[this.current]);
        if (this.terms[this.current+1]) {
          this.current = this.current + 1;
          window.scrollTo(0, 0);
        } else {
          const ret = await this.$apollo.mutate({
            mutation: misc.mutation.checkin,
            variables: {
              data: {
                name: this.userData.name,
                email: this.userData.email,
                subscribe_to_list: this.userData.addToMailingList,
                agreed_terms: Object.entries(this.userData.agreedToTerms)
                                    .map(e => ({ terms_name: e[0], agreed_timestamp: e[1] })),
              },
            },
          });
          this.$router.push({ name: 'check-in-done' });
        }
      },
    },
  };
</script>

<style lang="scss">
  nav.navbar, .footer { display: none !important; }
  #router-view {
    height: 100vh;
    padding: 0 !important;
    margin-top: 1em;
  }

  .tos-viewer {
    border: 1px solid black;
    margin: 1em 0;
    min-height: 65vh;
    width: 100%;
  }

  .btn {
    background-color: #CC562A;
    border: 0;
    color: #fff;
    font-size: 2rem;
    padding: .5em 1em;
    font-weight: 600;
  }

  .agree-button {
    display: flex;
    justify-content: center;
  }
</style>
