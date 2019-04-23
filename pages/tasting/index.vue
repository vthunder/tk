<template>
  <b-container/>
</template>

<script>
  import * as misc from '@/graphql/misc';
  export default {
    layout: 'bare',
    async mounted() {
      const { data: { tasting_info: info } } = await this.$apollo.query({
        query: misc.query.tasting_info,
        variables: { date: 'next', station: 0 },
      });
      document.location = info.survey_url;
    },
  };
</script>
