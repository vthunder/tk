<template>
    <b-card :key=sku.id
            :title=sku.attributes.title
            :sub-title="sku.attributes.subtitle">
        <p class="card-text">{{ sku.attributes.description }}</p>
        <div slot="footer" class="text-center">
            <b-button variant="primary" @click="buy(sku)">
                Buy
            </b-button>
        </div>
    </b-card>
</template>

<script>
export default {
  props: ['sku'],
  methods: {
    buy(sku) {
      this.$root.$emit('tk::pay-modal::open', [sku]);
    }
  },
};
</script>

<style lang="scss">
</style>
