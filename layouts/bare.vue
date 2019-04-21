<template>
  <div id="app">
    <router-view id="router-view" />
    <AuthModal/>
    <WelcomeModal/>
  </div>
</template>

<script>
  import AuthModal from '@/components/AuthModal.vue';
  import WelcomeModal from '@/components/WelcomeModal.vue';

  export default {
    components: {
      AuthModal,
      WelcomeModal,
    },
  };
</script>

<style lang="scss">
  .async-hide { opacity: 0 !important}

  #router-view {
    min-height: 60vh;
  }
</style>
