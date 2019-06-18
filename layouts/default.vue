<template>
  <div id="app">
    <Nav :subpage="this.$route.name !== 'index'" />
    <router-view id="router-view" />
    <AuthModal/>
    <WelcomeModal/>
    <Footer v-if="show.footer" />
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import Nav from '@/components/Nav.vue';
  import Footer from '@/components/Footer.vue';
  import AuthModal from '@/components/AuthModal.vue';
  import WelcomeModal from '@/components/WelcomeModal.vue';

  export default {
    components: {
      Nav,
      Footer,
      AuthModal,
      WelcomeModal,
    },
    computed: mapState('layout', ['show', 'load', 'kiosk']),
    watch: {
      $route() {
        this.resetDefaults();
      }
    },
    beforeMount() {
      this.resetDefaults();
    },
    mounted() {
      if (this.load.drift && !this.kiosk) {
        require('@/static/js/drift.js');
      }
    },
    methods: {
      ...mapMutations('layout', ['setShow', 'setHide', 'setLoad', 'setNoload']),
      resetDefaults() {
        this.setShow('signIn');
        if (process.client && process.env.NODE_ENV === 'production') {
          this.setLoad('drift');
        } else {
          this.setNoload('drift');
        }
      },
    },
  };
</script>

<style lang="scss">
  .async-hide { opacity: 0 !important}

  #app .navbar + div {
    @media (min-width: 768px) { padding-top: 56px; }
    @media (min-width: 992px) { padding-top: 56px; }
    @media (min-width: 1200px) { padding-top: 56px; }
    @media (min-width: 1400px) { padding-top: 56px; }
  }

  #router-view {
    min-height: 60vh;
  }

  .card-link {
    color: inherit;
    &:hover {
      color: inherit;
      text-decoration: none;
    }
  }
</style>
