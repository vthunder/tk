<template>
  <div id="app">
    <Nav :subpage="this.$route.name !== 'index'" />
    <router-view id="router-view" />
    <AuthModal/>
    <WelcomeModal/>
    <Footer/>
  </div>
</template>

<script>
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
  };
</script>

<style lang="scss">
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
