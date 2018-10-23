<template>
    <b-modal id="welcome-modal" ref="welcomeModal" title="Welcome!"
             ok-title="Go to account" ok-only centered
             @ok="goToAccount">
        <p>Welcome to Tinker Kitchen! Hope to cook up a storm with you
            at our makerspace :-)</p>
    </b-modal>
</template>

<script>
export default {
  methods: {
    goToAccount() {
      this.$router.push({ name: 'member-membership' });
    },
  },
};
</script>
