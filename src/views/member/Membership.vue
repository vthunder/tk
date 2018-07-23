<template>
    <div v-if="$apollo.loading" class="loading"><h3>Loading...</h3></div>
    <div v-else class="container section">
        <StorePage>
            <div class="tab-pane fade show active" id="membership" role="tabpanel">
                <div v-if="me.is_member">
                    <p>Membership status: <span class="font-weight-bold">active</span>
                        since {{ me.membership_sub.created_at }}</p>

                    <p>Your membership includes:</p>

                    <ul class="list">
                        <li>Use our makerspace as often as you want</li>
                        <li>Access all our gadgets and equipment</li>
                        <li>Join our culinary clubs, make friends, learn something new</li>
                        <li>Bring a guest for free whenever you visit.</li>
                        <li>Host a dinner party! We&#x27;ll even help you with the dishes.</li>
                        <li>We&#x27;ll receive your monthly CSA, Blue Apron, or other cooking box
                            for you, so you can just come and cook (subject to space
                            availability)</li>
                        <li>Get discounts on classes, specialized ingredients, and events</li>
                        <li>Get invites for special member-only events (pop-up dinners, guest
                            speakers, beta-test new gadgets, and more)</li>
                    </ul>
                </div>
                <div v-else>
                    <p>Membership status: inactive</p>

                    <div class="card-deck mt-2">
                        <div v-for="product in products" :key=product.id class="card">
                            <div class="card-body">
                                <h5 class="card-title">{{ product.title }}</h5>
                                <p class="card-text">{{ product.description }}</p>
                                <p class="product-price">
                                    {{ product.list_unit_price }}/{{ product.unit }}
                                </p>
                            </div>
                            <div class="card-footer text-center">

                                <!-- Opens payment confirmation modal -->
                                <b-button variant="primary" @click="checkout(product)">
                                    Become a Member
                                </b-button>

                                <!-- Product metadata used when opening confirmation
                                     or Stripe modals -->
                                <!--
                                     :data-subscription=product.is_subscription
                                     :data-subscription-period=product.subscription_period
                                     :data-saved-card=defaultCard
                                -->

                                <!-- After successful modal (confirmation or Stripe),
                                     this form will be submitted -->
                                <!-- <form action="{{ route('post-purchase',
                                                   ['product' => product.id]) }}" method="POST"
                                      class="finalize-payment-form d-none">
                                    <input type="hidden" name="token">
                                    <input type="hidden" name="quantity" value="1">
                                </form> -->

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StorePage>
    </div>
</template>

<script>
import StorePage from '@/components/MemberPage.vue';
import * as auth from '@/graphql/auth';
import * as misc from '@/graphql/misc';

export default {
  data() {
    return {
      me: {},
      products: [],
      subscriptions: [],
      saved_cards: [],
    };
  },
  computed: {
    sub() {
      return this.me.is_member;
    },
  },
  apollo: {
    me: auth.query.me,
    products: misc.query.products,
    subscriptions: misc.query.subscriptions,
    saved_cards: misc.query.saved_cards,
  },
  components: {
    StorePage,
  },
  methods: {
    // eslint-disable-next-line
    checkout(product) {
      if (this.saved_cards.length) {
        this.$root.$emit('tk::pay-modal::open', { product });
      } else {
        this.$apollo.mutate({
          mutation: misc.mutation.new_order,
          variables: {
            items: [
              {
                product_id: product.id,
                price: product.price,
                qty: 1,
              },
            ],
            adjustment: 0,
            comment: '',
          },
        }).then(({ order }) => {
          console.log(order);
          // this.$checkout.open({
          //   description: product.billing_description,
          //   amount: product.price,
          //   email: this.me.email,
          //   // eslint-disable-next-line
          //   token: (token) => {
          //     this.$apollo.mutate({
          //       mutation: misc.mutation.pay_order,
          //       variables: {
          //         order_id: 1, // FIXME
          //         total: product.price,
          //         token,
          //       },
          //     }).then(({ data }) => {
          //       console.log(data);
          //       // this.$refs.authModal.hide();
          //     }).catch((err) => {
          //       console.log(`Error: ${err}`);
          //     });
          //     // this.$refs.authModal.hide();
          //   },
          // }).catch((err) => {
          //   console.log(`Error: ${err}`);
          // });
        });
      }
    },
  },
};
</script>

<style lang="scss">
.tab-pane {
}
</style>
