<template>
  <b-container>
    <h1>Cart</h1>

    <b-alert :show="showAlert" variant="danger">{{ alertMessage }}</b-alert>

    <div v-if="working" class="center">
      <span class="fas fa-spinner fa-7x"/>
    </div>
    <div v-else>
      <div v-if="!shownItems.length">
        <p>Cart is empty.</p>
        <p><nuxt-link :to="{ name: 'index' }">Return to the homepage.</nuxt-link></p>
      </div>
      <b-table
        v-else id="cart-items"
        :items="shownItems" :fields="table_fields"
        striped hover>

        <template slot="delete" slot-scope="data">
          <b-button
            v-if="data.item.type !== 'discount'"
            size="sm" variant="outline-secondary"
            @click.stop="deleteItem(data.item.id)">
            <span class="fas fa-times"/>
          </b-button>
        </template>

        <template slot="title" slot-scope="data">
          {{ data.item.title }}
          <div v-if="data.item.subtitle" class="subtitle">{{ data.item.subtitle }}</div>
        </template>

        <template slot="quantity" slot-scope="data">
          <div v-if="data.item.type !== 'discount'" class="quantity">
            <b-button
              size="sm" variant="outline-secondary"
              @click.stop="minusItem(data.item.id)">
              <span class="fas fa-minus"/>
            </b-button>
            <span class="quantity-text">{{ data.item.quantity }}</span>
            <b-button
              size="sm" variant="outline-secondary"
              @click.stop="plusItem(data.item.id)">
              <span class="fas fa-plus"/>
            </b-button>
          </div>
        </template>
      </b-table>

      <b-row v-if="total" align-h="end">
        <b-col md="6" lg="4">
          <b-row v-if="subtotal !== total" class="mb-2">
            <b-col><h5>Subtotal:</h5></b-col>
            <b-col class="text-right">{{ subtotalPrice }}</b-col>
          </b-row>
          <b-row v-if="itemDiscounts" class="mb-2">
            <b-col sm="8"><h5>Member discounts:</h5></b-col>
            <b-col class="text-right">{{ itemDiscountsPrice }}</b-col>
          </b-row>
          <b-row v-if="couponDiscount" class="mb-2">
            <b-col sm="8">
              <h5>Coupon ({{ couponName }}):</h5>
              <b-link class="small" @click.stop="clearCoupon">Remove coupon</b-link>
            </b-col>
            <b-col class="text-right">{{ couponDiscountPrice }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col><h5>Total:</h5></b-col>
            <b-col class="text-right">{{ totalPrice }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col>
              <b-form @submit.prevent="applyCoupon()">
                <b-input-group prepend="Coupon code" size="sm">
                  <b-form-input v-model="coupon_input"/>
                  <b-input-group-append>
                    <b-btn variant="secondary" @click.stop="applyCoupon()">
                      Apply
                    </b-btn>
                  </b-input-group-append>
                </b-input-group>
              </b-form>
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col class="text-right">
              <b-btn variant="primary" @click.stop="doCheckout()">Checkout</b-btn>
            </b-col>
          </b-row>
          <p v-if="default_card" class="text-right">
            Using saved card: {{ default_card.brand }}
            ending in {{ default_card.last4 }}
          </p>
        </b-col>
      </b-row>
    </div>
    <b-modal
      id="success-modal" ref="successModalRef"
      title="Success!" centered ok-only>
      <p>Hooray! Purchase successful.</p>
    </b-modal>
    <vue-stripe-checkout
      ref="checkoutRef"
      :name="checkout.name"
      :image="checkout.image"
      :locale="checkout.locale"
      :currency="checkout.currency"
      :allow-remember-me="checkout.allowRememberMe"
      :zip-code="checkout.zipCode"
      :panel-label="checkoutButtonLabel"
      :description="checkout.description"
      :amount="checkout.amount"
      :email="checkout.email" />
  </b-container>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import * as auth from '@/graphql/auth';
  import * as customerQueries from '@/graphql/customer';
  import * as misc from '@/graphql/misc';
  import * as format from '@/lib/format';

  export default {
    apollo: {
      me: auth.query.me,
      customer_payment_sources: customerQueries.query.customer_payment_sources,
    },
    data() {
      return {
        me: null,
        customer_payment_sources: null,
        coupon_input: '',
        showAlert: false,
        alertMessage: 'Error!',
        table_fields: [
          { key: 'delete', label: '' },
          { key: 'title', label: 'Item' },
          { key: 'quantity' },
          { key: 'price', class: 'text-right' },
        ],
        saveCard: true,
        working: false,
        checkout: {
          name: 'Tinker Kitchen',
          image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
          locale: 'auto',
          currency: 'USD',
          allowRememberMe: false,
          zipCode: true,
          description: '',
          amount: 0,
          email: '',
        },
      };
    },
    computed: {
      ...mapState('cart', {
        items: state => state.items,
        coupon: state => state.coupon,
      }),

      checkoutButtonLabel() {
        return `Pay ${this.totalPrice}`;
      },

      couponName() {
        if (this.coupon.name) return this.coupon.name;
        return '';
      },

      default_card() {
        if (!this.customer_payment_sources) return null;
        return this.customer_payment_sources.find(() => true);
      },

      //
      // Item collections
      //
      skuItems() {
        return this.items.filter(i => i.type !== 'discount');
      },
      discountItems() {
        return this.items.filter(i => i.type === 'discount');
      },
      shownItems() {
        return this.items.filter(i => i.amount > 0);
      },

      //
      // Discounts
      //
      itemDiscounts() {
        return this.discountItems.reduce((acc, cur) => acc + cur.amount, 0);
      },
      couponDiscount() {
        if (!this.coupon.valid) return 0;
        // todo: implement/check addt'l conditions json

        if (this.coupon.amount_off) return this.coupon.amount_off;
        if (this.coupon.percent_off) return this.coupon.percent_off * this.subtotal;

        return 0;
      },

      //
      // Aggregate (sub-)totals
      //
      subtotal() {
        return this.skuItems.reduce((acc, cur) => acc + cur.amount, 0);
      },
      totalDiscounts() {
        return this.itemDiscounts + this.couponDiscount;
      },
      total() {
        return this.subtotal - this.totalDiscounts;
      },

      //
      // Formatted amounts for display
      //
      itemDiscountsPrice() {
        return format.priceCents(this.itemDiscounts);
      },
      couponDiscountPrice() {
        return format.priceCents(this.couponDiscount);
      },
      subtotalPrice() {
        return format.priceCents(this.subtotal);
      },
      totalPrice() {
        return format.priceCents(this.total);
      },
    },
    methods: {
      ...mapMutations('cart', ['minusItem', 'plusItem', 'deleteItem', 'clear', 'clearCoupon']),
      clearCart() {
        this.clear()
        this.onReset()
      },
      onReset() {
        this.showAlert = false;
        this.alertMessage = 'Error!';
        this.working = false;
      },
      async doCheckout() {
        this.working = true;

        // fixme: what to do if any items are not type sku?
        const items = this.items
                          .filter(i => i.type !== 'discount')
                          .filter(i => i.quantity > 0);

        if (items.length === 0) {
          this.working = false;
          // eslint-disable-next-line
          alert('Cart is empty');
        }

        // Make sure a Stripe customer record exists for current user (if logged in)
        let customer;
        if (this.me) {
          const ret = await this.$apollo.mutate({
            mutation: customerQueries.mutation.get_or_create_customer,
          });
          customer = ret.data.get_or_create_customer;
        }

        // Create a Stripe order
        const { data: { create_order: order } } = await this.$apollo.mutate({
          mutation: customerQueries.mutation.create_order,
          variables: {
            items: items.map(i => ({ sku: i.sku, quantity: i.quantity })),
            coupon_code: this.coupon ? this.coupon.code : null,
          },
        });

        // If customer has a saved card ready to go, pay the order
        // FIXME: allow user to use a diff card
        if (customer && customer.sources && customer.sources.length) {
          await this.$apollo.mutate({
            mutation: customerQueries.mutation.pay_order,
            variables: { order: order.id, customer: customer.id },
          });
          this.clearCart();
          this.$refs.successModalRef.show();
          this.$root.$emit('tk::checkout::complete');
          return;
        }

        // Otherwise, open the Stripe payment modal
        let [{ title: description }] = items;
        if (items.length === 2) description += ' and 1 more item';
        if (items.length > 2) description += ` and ${items.length - 1} more items`;

        this.checkout.description = description;
        this.checkout.amount = order.amount;
        if (this.me) this.checkout.email = this.me.email;

        const { token, args } = await this.$refs.checkoutRef.open();

        if (token) {
          const payVars = { order: order.id };

          if (this.me) {
            if (this.saveCard) {
              await this.$apollo.mutate({
                mutation: customerQueries.mutation.update_customer,
                variables: { source: token.id },
              });
            } else {
              payVars.source = token.id;
            }
          } else {
            payVars.email = token.email;
            payVars.source = token.id;
          }

          await this.$apollo.mutate({
            mutation: customerQueries.mutation.pay_order,
            variables: payVars,
          });

          this.clearCart();

          this.$refs.successModalRef.show();
          this.$root.$emit('tk::checkout::complete');
        }
      },
      // FIXME: doesn't work, because this component is no longer loaded all the time
      // maybe make a special cart subscription item that will trigger this flow?
      async subscribeCheckout({ plan, code }) {
        await this.$apollo.mutate({ mutation: customerQueries.mutation.get_or_create_customer });
        this.$checkout.open({
          description: plan.metadata.billing_description,
          amount: (code === 'KS_CONVERT') ? plan.ks_amount : plan.amount,
          email: this.me.email,
          token: async (token) => {
            await this.$apollo.mutate({
              mutation: customerQueries.mutation.update_customer,
              variables: { source: token.id },
            });
            await this.$apollo.mutate({
              mutation: customerQueries.mutation.create_subscription,
              variables: { plans: [plan.id], code },
            });
            this.$root.$emit('tk::checkout::complete');
          },
        });
      },

      async applyCoupon() {
        const { data: { get_cart_coupon: ret } } = await this.$apollo.query({
          query: misc.query.get_cart_coupon,
          variables: { code: this.coupon_input },
        });
        // this.$root.$emit('tk::cart::setCoupon', ret);
        this.coupon_input = '';
      },
    },
    head() {
      return {
        title: 'Cart',
      };
    },
  };
</script>

<style lang="scss">
  @keyframes spin {
    100% { transform: rotate(360deg); }
  }
  .fa-spinner {
    animation: spin 2s linear infinite;
    margin: 0 auto;
  }
  #cart-items {
    .subtitle {
      font-size: .875rem;
    }

    .quantity {
      display: flex;
      flex-direction: row;

      .quantity-text {
        width: 2em;
        text-align: center;
      }
    }

    button.delete_item {
      opacity: 0;
      transition: opacity 250ms;
      color: gray;
      margin: 0;
      padding: 0;

      &:hover {
        opacity: 1;
      }
    }
  }
</style>
