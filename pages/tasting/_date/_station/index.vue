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
        variables: {
          date: this.$route.params.date,
          station: this.$route.params.station,
        },
      });
      const products =
        info.products
            .map((p, i) => `product${i+1}=${parseInt(p.product_code, 10)}`).join('&')
      document.location = info.survey_url + products + '&products=' + info.products.length;
    },
  };
</script>
