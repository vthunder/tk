<template>
  <b-col md="6">
    <b-card
      :title="title"
      :img-src="img"
      :img-alt="title"
      img-top
      style="min-height: 100%;"
      class="mb-2">
      <slot/>
      <div v-if="price">
        <p class="price-spacer" />
        <p class="price">
          {{ price }}<br>
          <span class="perperson">/person</span>
        </p>
      </div>
    </b-card>
  </b-col>
</template>

<script>
  export default {
    props: {
      title: { type: String, default: '' },
      img: { type: String, default: '' },
      price: { type: String, default: '' },
    },
  };
</script>

<style lang="scss">
  p.price-spacer {
    height: 1em;
  }
  p.price {
    position: absolute;
    right: 1em;
    bottom: .5em;
    font-size: 1.25rem;
    font-weight: 300;
    line-height: 1.25rem;
    text-align: right;
    .perperson { font-size: 1rem; }
  }
</style>
