<template>
  <vue-markdown :source="mdText" />
</template>

<script>
  import axios from 'axios'
  import VueMarkdown from 'vue-markdown';

  export default {
    name: 'MdViewer',
    components: {
      VueMarkdown,
    },
    props: {
      src: { type: String, default: '' },
    },
    data: function() {
      return ({"mdText": ""});
    },
    async mounted() {
      this.mdText = await this.$axios.$get(this.src);
    }
  }
</script>

<style lang="scss"></style>
