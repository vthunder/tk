<template>
  <div id="app">
    <router-view id="router-view" />
  </div>
</template>

<script>
  export default {};
</script>

<style lang="scss">
  .async-hide { opacity: 0 !important}

  #router-view {
    min-height: 60vh;
  }
</style>
