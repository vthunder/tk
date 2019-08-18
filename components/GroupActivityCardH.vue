<template>
  <div>
    <b-card no-body class="overflow-hidden">
      <b-row no-gutters>
        <b-col :order-md="img_right? 2 : null" md="5">
          <b-card-img :src="img" class="rounded-0"/>
        </b-col>
        <b-col md="7">
          <b-card-body :title="title">
            <b-card-text>
              <slot/>
              <div v-if="price">
                <p class="price-spacer" />
                <p class="price">
                  {{ price }}<br>
                  <span class="perperson">/person</span>
                </p>
              </div>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
  export default {
    props: {
      title: { type: String, default: '' },
      img: { type: String, default: '' },
      img_right: { type: Boolean, default: false },
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
