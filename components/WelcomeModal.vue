<template>
  <b-modal
    id="welcome-modal" ref="welcomeModal" title="Welcome!"
    ok-title="Let's get cookin'!" ok-only centered
    @ok="goToAccount">
    <p>Welcome to Tinker Kitchen! Hope to cook up a storm with you
    at our makerspace :-)</p>
  </b-modal>
</template>

<script>
  export default {
    methods: {
      goToAccount() {
        // if nextRoute is set do nothing, our caller will redirect
        if (localStorage && localStorage.nextRoute) return;
        this.$router.push({ name: 'index' });
      },
    },
  };
</script>
