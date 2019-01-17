<template>
  <div v-if="$apollo.loading" class="loading"><h3>Loading...</h3></div>
  <div v-else class="container section">
    <StorePage>
      <div v-if="working" class="center">
        <span class="fas fa-spinner fa-7x"/>
      </div>
      <div v-else>
        <p v-if="gift_certificate_balance">
          Your gift certificate balance is:
          <span class="gift-cert-balance">
            {{ formatPrice(gift_certificate_balance) }}
          </span>. To
          apply any amount of it towards a purchase,
          <b-link href="mailto:hello@tinkerkitchen.org">email us</b-link>!
        </p>
        <p>
          Note: activating a membership coupon begins your
          membership immediately. If you want to start it
          later, just keep the coupon safe until then!</p>
        <b-form @submit.prevent="processCoupon">
          <label for="inputCoupon">Coupon/cerificate code:</label>
          <b-form-input
            id="inputCoupon"
            ref="inputCouponRef"
            v-model.trim="coupon"
            :state="couponState"
            type="text"
            aria-describedby="inputCouponFeedback"
            placeholder="XXXX-XXXX-XXXX-XXXX"/>
          <b-form-invalid-feedback id="inputCouponFeedback">
            <!-- This will only be shown if the preceeding
                 input has an invalid state -->
            Invalid coupon code
          </b-form-invalid-feedback>
          <b-button class="mt-2" variant="primary" @click="processCoupon">
            Redeem</b-button>
        </b-form>
      </div>
      <b-modal
        id="coupon-success-modal" ref="couponSuccessModalRef"
        title="Success!" centered
        @ok.prevent="processCouponSuccess">
        <div v-if="working" class="center">
          <span class="fas fa-spinner fa-7x"/>
        </div>
        <div v-else-if="couponType.match(/^ks_/)">
          <p>
            Your coupon has been applied, Hooray! Welcome to
            Tinker Kitchen.</p>
          <p>
            Lock in our special Kickstarter rate! Sign up for
            ongoing membership now:</p>
          <ul>
            <li>$125/month (reg. $150)</li>
            <li>$1300/year (reg. $1500)</li>
          </ul>
          <p>(Only backers get this special deal!)</p>
        </div>
        <div v-else>
          <p>Your coupon has been applied, Hooray!</p>
        </div>
        <template slot="modal-footer">
          <div v-if="couponType.match(/^ks_/)">
            <b-button @click="successModalCancel">Not now</b-button>
            <b-button variant="primary" @click="successModalSignup(monthly)">
              Sign-up Monthly
            </b-button>
            <b-button variant="primary" @click="successModalSignup(yearly)">
              Sign-up Yearly
            </b-button>
          </div>
          <div v-else>
            <b-button variant="primary" @click="successModalCancel">OK</b-button>
          </div>
        </template>
      </b-modal>
      <b-modal
        id="sub-success-modal" ref="subSuccessModalRef"
        title="Success!" centered>
        <p>
          Hooray! You've successfully signed up as an ongoing
          member. Looking forward to cooking with you!</p>
      </b-modal>
    </StorePage>
  </div>
</template>

<script>
  import StorePage from '@/components/MemberPage.vue';
  import * as misc from '@/graphql/misc';
  import { monthlyQuery, yearlyQuery } from '@/lib/plans';
  import * as format from '@/lib/format';

  export default {
    apollo: {
      monthly: monthlyQuery,
      yearly: yearlyQuery,
      gift_certificate_balance: misc.query.gift_certificate_balance,
    },
    components: {
      StorePage,
    },
    data() {
      return {
        coupon: '',
        couponState: null,
        working: false,
        couponType: '',
        gift_certificate_balance: null,
      };
    },
    computed: {
    },
    methods: {
      formatPrice(p) {
        return format.priceWhole(p);
      },
      async processCoupon() {
        this.working = true;
        const { data: { use_coupon_token: ret } } = await this.$apollo.mutate({
          mutation: misc.mutation.use_coupon_token,
          variables: { token: this.coupon },
        });
        this.working = false;

        if (ret.status !== 'OK') this.couponState = false;
        else {
          this.couponType = ret.type;
          this.$apollo.provider.defaultClient.cache.reset();
          this.$refs.couponSuccessModalRef.show();
        }
      },
      async successModalCancel() {
        this.$refs.couponSuccessModalRef.hide();
        this.$root.$emit('tk::coupon-modal::complete');
        this.$router.push({ name: 'index' });
      },
      async successModalSignup(plan) {
        this.$root.$emit('tk::checkout::subscribeCheckout', { plan, code: 'KS_CONVERT' });
        this.$apollo.provider.defaultClient.cache.reset();
        this.$root.$on('tk::checkout::complete', this.subSuccess);
      },
      subSuccess() {
        this.$root.$off('tk::checkout::complete', this.subSuccess);
        this.coupon = null;
        this.$refs.subSuccessModalRef.show();
        this.$router.push({ name: 'index' });
      },
    },
  };
</script>

<style lang="scss">
  .loading { height: 100vh; }
  @keyframes spin {
    100% { transform: rotate(360deg); }
  }
  .fa-spinner {
    animation: spin 2s linear infinite;
    margin: 0 auto;
  }
  .total-footer {
    font-weight: 500;
  }
  .gift-cert-balance {
    font-size: 1.5rem;
    font-weight: 500;
  }
</style>
