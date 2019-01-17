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
    data() {
      return {
        next: { name: 'index' },
      };
    },
    mounted() {
      // XXX hack: this is checking whether nextRoute happens to be set
      // when AuthModal calls us (true in the RequireSignIn path)
      if (!localStorage.nextRoute) {
        this.next = null;
      }
    },
    methods: {
      goToAccount() {
        if (this.next) this.$router.push(this.next);
      },
    },
  };
</script>
