<template>
    <div class="container section">
        <h1>Gift Certificates</h1>

        <b-row align-h="center">
            <b-col md="10">

                <h3>How do these work?</h3>

                <p>Give the gift of cooking! We'll email you within 24
                hours of your purchase and either give you a
                certificate coupon you can print, or we can send it
                directly to the recipient if you prefer.</p>

                <p v-if="me">We'll use the email you signed in with.</p>
                <p v-else>We'll get your email during
                checkout. Make sure you type it in correctly!</p>

                <b-card-group deck>
                    <b-card title="$35 Gift Certificate"
                            sub-title="Perfect for a day pass!"
                            img-src="/images/Gift card promo.png"
                            img-top
                            class="class-card">
                        <p></p>
                        <b-form class="buy-form" inline>
                            <b-form-select v-model="count.gc35" :options="num_options" />
                            <b-button variant="primary"
                                      @click="buy('gc35')">Add to Cart</b-button>
                        </b-form>
                    </b-card>
                    <b-card title="$80 Gift Certificate"
                            sub-title="Covers most classes"
                            img-src="/images/Gift card promo.png"
                            img-top
                            class="class-card">
                        <p></p>
                        <b-form class="buy-form" inline>
                            <b-form-select v-model="count.gc80" :options="num_options" />
                            <b-button variant="primary"
                                      @click="buy('gc80')">Add to Cart</b-button>
                        </b-form>
                    </b-card>
                </b-card-group>
                <b-card-group deck class="mt-3">
                    <b-card title="$150 Gift Certificate"
                            sub-title="1 month of membership"
                            img-src="/images/Gift card promo.png"
                            img-top
                            class="class-card">
                        <p></p>
                        <b-form class="buy-form" inline>
                            <b-form-select v-model="count.gc150" :options="num_options" />
                            <b-button variant="primary"
                                      @click="buy('gc150')">Add to Cart</b-button>
                        </b-form>
                    </b-card>
                    <b-card title="$1500 Gift Certificate"
                            sub-title="1 year of membership"
                            img-src="/images/Gift card promo.png"
                            img-top
                            class="class-card">
                        <p></p>
                        <b-form class="buy-form" inline>
                            <b-form-select v-model="count.gc1500" :options="num_options" />
                            <b-button variant="primary"
                                      @click="buy('gc1500')">Add to Cart</b-button>
                        </b-form>
                    </b-card>
                </b-card-group>
            </b-col>
        </b-row>
        <b-modal id="success-modal" ref="successModalRef"
                 title="Success!" centered ok-only>
            <p>Hooray! Purchase successful.</p>
        </b-modal>
    </div>
</template>

<script>
export default {
  apollo: {
  },
  components: {
  },
  computed: {
  },
  data() {
    return {
      count: {
        gc35: 1,
        gc80: 1,
        gc150: 1,
        gc1500: 1,
      },
      num_options: [
        { value: 1, text: '1' },
        { value: 2, text: '2' },
        { value: 3, text: '3' },
        { value: 4, text: '4' },
        { value: 5, text: '5' },
      ],
      info: {
        gc35: {
          sku: process.env.VUE_APP_SKU_GIFT_CERT_35,
          title: 'Gift Certificate ($35)',
          amount: 3500,
        },
        gc80: {
          sku: process.env.VUE_APP_SKU_GIFT_CERT_80,
          title: 'Gift Certificate ($80)',
          amount: 8000,
        },
        gc150: {
          sku: process.env.VUE_APP_SKU_GIFT_CERT_150,
          title: 'Gift Certificate ($150)',
          amount: 15000,
        },
        gc1500: {
          sku: process.env.VUE_APP_SKU_GIFT_CERT_1500,
          title: 'Gift Certificate ($1500)',
          amount: 150000,
        },
      },
    };
  },
  methods: {
    buy(item) {
      const info = this.info[item];
      const qty = parseInt(this.count[item], 10);

      window.fbq('track', 'AddToCart', {
        value: info.amount / 100,
        currency: 'USD',
      });

      const items = [{
        id: `sku:${info.sku}`,
        sku: info.sku,
        quantity: qty,
        title: info.title,
        amount_each: info.amount,
      }];

      this.$root.$emit('tk::cart::add', items);
      this.$root.$on('tk::checkout::complete', this.payComplete);
      this.$router.push({ name: 'cart' });
    },
    payComplete() {
      this.$refs.successModalRef.show();
    },
  },
  metaInfo: {
    title: 'Gift Certificates',
  },
};
</script>

<style lang="scss">
.class-card {
    margin-bottom: 2em;

    .card-title {
        font-weight: 700;
    }
    p {
        margin-top: 2em;
    }
    p.price {
        margin-top: 1em;
        font-size: 1.25rem;
        font-weight: 300;
        line-height: 1.25rem;
        text-align: right;
        .perperson {
            font-size: 1rem;
        }
    }
}
.buy-form {
    justify-content: center;
    select {
        margin-right: .5em;
        max-width: 4em;
    }
}
</style>
