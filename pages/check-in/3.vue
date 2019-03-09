<template>
  <b-container>
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

  export default {
    components: {
      MdViewer,
    },
    data() {
      return {
        current: 0,
        terms: [
          'Liability_Waiver_and_Media_Release_2018_11_10.pdf',
          'Kitchentown Tasting Event Agreement - rbc 2019-03-04.pdf',
        ],
      };
    },
    methods: {
      ...mapMutations('checkin', ['setAgreedToTerms']),

      agree() {
        this.setAgreedToTerms(this.terms[this.current]);
        if (this.terms[this.current+1]) {
          this.current = this.current + 1;
          window.scrollTo(0, 0);
        } else {
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
