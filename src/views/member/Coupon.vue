<template>
    <div v-if="$apollo.loading" class="loading"><h3>Loading...</h3></div>
    <div v-else class="container section">
        <StorePage>
            <div v-if="working" class="center">
                <span class="fas fa-spinner fa-7x"></span>
            </div>
            <div v-else>
                <p>Note: activating a membership coupon begins your
                    membership immediately. If you want to start it
                    later, just keep the coupon safe until then!</p>
                <b-form @submit.prevent="processCoupon">
                    <label for="inputCoupon">Coupon code:</label>
                    <b-form-input id="inputCoupon"
                                  ref="inputCouponRef"
                                  v-model.trim="coupon"
                                  type="text"
                                  :state="couponState"
                                  aria-describedby="inputCouponFeedback"
                                  placeholder="XXXX-XXXX-XXXX-XXXX"></b-form-input>
                    <b-form-invalid-feedback id="inputCouponFeedback">
                        <!-- This will only be shown if the preceeding
                             input has an invalid state -->
                        Invalid coupon code
                    </b-form-invalid-feedback>
                    <b-button @click="processCoupon" variant="primary" class="mt-2">
                        Redeem</b-button>
                </b-form>
            </div>
            <b-modal id="coupon-success-modal" ref="couponSuccessModalRef"
                     title="Success!" centered
                     @ok.prevent=processCouponSuccess>
                <div v-if="working" class="center">
                    <span class="fas fa-spinner fa-7x"></span>
                </div>
                <div v-else>
                    <p>Your coupon has been applied, Hooray! Welcome to
                        Tinker Kitchen.</p>
                    <p>Lock in our special Kickstarter rate! Sign up for
                        ongoing membership now:</p>
                    <ul>
                        <li>$125/month (reg. $150)</li>
                        <li>$1300/year (reg. $1500)</li>
                    </ul>
                    <p>(Only backers get this special deal!)</p>
                </div>
                <template slot="modal-footer">
                    <b-button @click="successModalCancel">Not now</b-button>
                    <b-button @click="successModalSignup(monthly)" variant="primary">
                        Sign-up Monthly
                    </b-button>
                    <b-button @click="successModalSignup(yearly)" variant="primary">
                        Sign-up Yearly
                    </b-button>
                </template>
            </b-modal>
            <b-modal id="sub-success-modal" ref="subSuccessModalRef"
                     title="Success!" centered>
                <p>Hooray! You've successfully signed up as an ongoing
                    member. Looking forward to cooking with you!</p>
            </b-modal>
        </StorePage>
    </div>
</template>

<script>
import StorePage from '@/components/MemberPage.vue';
import * as misc from '@/graphql/misc';
import { monthlyQuery, yearlyQuery } from '@/lib/plans';

export default {
  apollo: {
    monthly: monthlyQuery,
    yearly: yearlyQuery,
  },
  data() {
    return {
      coupon: '',
      couponState: null,
      working: false,
    };
  },
  components: {
    StorePage,
  },
  computed: {
  },
  methods: {
    async processCoupon() {
      this.working = true;
      const { data: { use_coupon_token: ret } } = await this.$apollo.mutate({
        mutation: misc.mutation.use_coupon_token,
        variables: { token: this.coupon },
      });
      this.working = false;

      if (ret !== 'OK') this.couponState = false;
      else {
        this.$apollo.provider.defaultClient.cache.reset();
        this.$refs.couponSuccessModalRef.show();
      }
    },
    async successModalCancel() {
      this.$refs.couponSuccessModalRef.hide();
      this.$root.$emit('tk::coupon-modal::complete');
      this.$router.push({ name: 'member-membership' });
    },
    async successModalSignup(plan) {
      this.$root.$emit('tk::pay-modal::subscribeCheckout', { plan, code: 'KS_CONVERT' });
      this.$apollo.provider.defaultClient.cache.reset();
      this.$root.$on('tk::pay-modal::complete', this.subSuccess);
    },
    subSuccess() {
      this.$root.$off('tk::pay-modal::complete', this.subSuccess);
      this.coupon = null;
      this.$refs.subSuccessModalRef.show();
      this.$router.push({ name: 'member-membership' });
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
</style>
