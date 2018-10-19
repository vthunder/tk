<template>
    <div v-if="$apollo.loading" class="loading"><h3>Loading...</h3></div>
    <div v-else class="container section">
        <StorePage>
            <div class="tab-pane fade show active" id="membership" role="tabpanel">
                <div v-if="me.is_member">
                    <p>Membership status: <span class="font-weight-bold">active</span>
                        since {{ subscribed_since }}</p>

                    <p>Your membership includes:</p>

                    <ul class="list">
                        <li>Use our makerspace as often as you want</li>
                        <li>Access all our gadgets and equipment</li>
                        <li>Join our culinary clubs, make friends, learn something new</li>
                        <li>Bring a guest for free whenever you visit.</li>
                        <li>Host a dinner party! We&#x27;ll even help you with the dishes.</li>
                        <li>We&#x27;ll receive your CSA, Blue Apron, or other cooking box
                            for you, so you can just come and cook (subject to space
                            availability)</li>
                        <li>Get discounts on classes, specialized ingredients, and events</li>
                        <li>Get invites for special member-only events (pop-up dinners, guest
                            speakers, beta-test new gadgets, and more)</li>
                    </ul>
                </div>
                <div>
                    <div v-if="free_member_ks">
                        <p>Membership status: <span class="font-weight-bold">active</span>.
                            Thanks for backing us on Kickstarter <i class="fas fa-grin"></i><br>
                            Membership expires: {{ free_member_until }}</p>
                        <p>Extend your membership before it expires
                            and keep the Kickstarter rate!</p>
                    </div>
                    <div v-else-if="free_member_staff">
                        <p>Membership status: <span class="font-weight-bold">active</span>.
                            Thanks for working at Tinker Kitchen <i class="fas fa-grin"></i>
                            You're awesome.<br>
                            Membership expires: {{ free_member_until }}</p>
                    </div>
                    <p v-else>Membership status: inactive</p>

                    <div v-if="!free_member_staff">
                        <b-card-group deck class="mt-2">
                            <b-card v-for="plan in plans" :key=plan.id>
                                <h4>{{ plan.metadata.title }}</h4>
                                <h6 v-if="me.is_free_member" class="text-muted">
                                    <strike class="small">{{ plan.monthly_price }}/month
                                        <span v-if="plan.interval === 'year'">
                                            &nbsp;({{ plan.price }}/year)
                                        </span>
                                    </strike><br>
                                    {{ plan.ks_monthly_price }}/month
                                    <span v-if="plan.interval === 'year'">
                                        &nbsp;({{ plan.ks_price }}/year)
                                    </span>
                                </h6>
                                <h6 v-else class="text-muted">
                                    {{ plan.monthly_price }}/month
                                    <span v-if="plan.interval === 'year'">
                                        &nbsp;({{ plan.price }}/year)
                                    </span>
                                </h6>
                                <p class="card-text">{{ plan.metadata.description }}</p>
                                <div slot="footer" v-if="me.is_free_member" class="text-center">
                                    <b-button v-if="plan.interval === 'month'"
                                              @click="checkout(plan, 'KS_CONVERT')"
                                              variant="primary">
                                        Sign up Monthly
                                    </b-button>
                                    <b-button v-else-if="plan.interval === 'year'"
                                              @click="checkout(plan, 'KS_CONVERT')"
                                              variant="primary">
                                        Sign up Yearly
                                    </b-button>
                                    <b-button v-else
                                              @click="checkout(plan, 'KS_CONVERT')"
                                              variant="primary">
                                        Become a Member
                                    </b-button>
                                </div>
                                <div slot="footer" v-else class="text-center">
                                    <b-button @click="checkout(plan)"
                                              variant="primary">
                                        Become a Member
                                    </b-button>
                                </div>
                            </b-card>
                        </b-card-group>
                    </div>

                    <p v-if="me.is_free_member" class="mt-4">
                        Your card will pre-authorized now, but
                        <span class="font-weight-bold">will not</span> be
                        billed until your Kickstarter benefit expires
                    </p>
                    <p v-else class="text-center mt-4">
                        <b-button v-b-modal.coupon-modal>I have a coupon code</b-button>
                    </p>
                </div>
            </div>
        </StorePage>

        <b-modal id="coupon-modal" ref="couponModalRef"
                 title="Membership Coupon" centered
                 @ok.prevent=processCoupon
                 @shown=onCouponModalShown>
            <div v-if="working" class="center">
                <span class="fas fa-spinner fa-7x"></span>
            </div>
            <div v-else>
                <b-form @submit.prevent="processCoupon">
                    <label for="inputCoupon">Coupon code:</label>
                    <b-form-input id="inputCoupon"
                                  ref="inputCouponRef"
                                  v-model.trim="coupon"
                                  type="text"
                                  :state="couponState"
                                  aria-describedby="inputCouponFeedback"
                                  placeholder="Enter the coupon code"></b-form-input>
                    <b-form-invalid-feedback id="inputCouponFeedback">
                        <!-- This will only be shown if the preceeding
                             input has an invalid state -->
                        Invalid coupon code
                    </b-form-invalid-feedback>
                </b-form>
            </div>
        </b-modal>
        <b-modal id="coupon-success-modal" ref="couponSuccessModalRef"
                 title="Success!" centered
                 @ok.prevent=processCouponSuccess>
            <div v-if="working" class="center">
                <span class="fas fa-spinner fa-7x"></span>
            </div>
            <div v-else>
                <p>Your coupon has been applied, you are now a Tinker
                    Kitchen member and you have 2 day passes to give
                    out. Hooray!</p>
                <p>Lock in your special Kickstarter rate! Sign up for
                    ongoing membership now:</p>
                <ul>
                    <li>$125/month (reg. $150)</li>
                    <li>$1300/year (reg. $1500)</li>
                </ul>
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
    </div>
</template>

<script>
import StorePage from '@/components/MemberPage.vue';
import * as auth from '@/graphql/auth';
import * as misc from '@/graphql/misc';
import * as customerQueries from '@/graphql/customer';
import { monthlyQuery, yearlyQuery } from '@/lib/plans';
import * as format from '@/lib/format';

export default {
  data() {
    return {
      me: {},
      customer_subscriptions: [],
      coupon: '',
      couponState: true,
      working: false,
    };
  },
  computed: {
    sub() {
      return this.me.is_member;
    },
    subscribed_since() {
      if (this.customer_subscriptions &&
          this.customer_subscriptions.length) {
        return format.date(this.customer_subscriptions[0].created);
      }
      return '';
    },
    free_member_until() {
      if (!this.me.is_free_member) return '';
      return format.date(this.me.free_member_until);
    },
    free_member_ks() {
      if (this.me.free_membership_type === 'ks_month') return true;
      if (this.me.free_membership_type === 'ks_year') return true;
      return false;
    },
    free_member_staff() {
      if (this.me.free_member_type === 'staff') return true;
      return false;
    },
    plans() {
      return [this.monthly, this.yearly];
    },
  },
  apollo: {
    me: auth.query.me,
    monthly: monthlyQuery,
    yearly: yearlyQuery,
    customer_subscriptions: customerQueries.query.customer_subscriptions,
  },
  components: {
    StorePage,
  },
  methods: {
    async checkout(plan, code) {
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
          ['me', 'customer_subscriptions'].forEach((q) => {
            this.$apollo.queries[q].refetch();
          });
        },
      });
    },
    onCouponModalShown() {
      this.$refs.inputCouponRef.focus();
    },
    async processCoupon() {
      this.working = true;
      const { data: { use_membership_coupon: ret } } = await this.$apollo.mutate({
        mutation: misc.mutation.use_membership_coupon,
        variables: { token: this.coupon },
      });
      this.working = false;

      if (ret !== 'OK') this.couponState = false;
      else {
        this.$refs.couponModalRef.hide();
        this.$refs.couponSuccessModalRef.show();
      }
    },
    async successModalCancel() {
      this.$apollo.queries.me.refetch();
      this.$refs.couponSuccessModalRef.hide();
    },
    async successModalSignup(plan) {
      this.working = true;
      await this.checkout(plan, 'KS_CONVERT');
      this.$apollo.queries.me.refetch();
      this.working = false;
    },
  },
};
</script>

<style lang="scss">
.loading { height: 100vh; }

#membership.tab-pane {
    .product-monthly-price {
        font-size: .8rem;
    }
}
</style>
