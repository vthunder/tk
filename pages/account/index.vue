<template>
  <b-container/>
</template>

<script>
  import * as misc from '@/graphql/misc';
  export default {
    layout: 'bare',
    async mounted() {
      document.location = '/account/account';
    },
  };
</script>
