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
                <div v-else>
                    <div v-if="free_member_ks">
                        <p>Membership status: <span class="font-weight-bold">active</span>.
                            Thanks for backing us on Kickstarter!<br>
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
                        Your card will be pre-authorized now, but
                        <span class="font-weight-bold">will not</span> be
                        billed until your Kickstarter benefit expires
                    </p>
                </div>
            </div>
        </StorePage>

    </div>
</template>

<script>
import StorePage from '@/components/MemberPage.vue';
import * as auth from '@/graphql/auth';
import * as customerQueries from '@/graphql/customer';
import { monthlyQuery, yearlyQuery } from '@/lib/plans';
import * as format from '@/lib/format';

export default {
  data() {
    return {
      me: {},
      customer_subscriptions: [],
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
  mounted() {
    this.$root.$on('tk::coupon-modal::complete', this.refresh);
    this.$root.$on('tk::pay-modal::complete', this.refresh);
  },
  methods: {
    checkout(plan, code) {
      this.$root.$emit('tk::pay-modal::subscribeCheckout', { plan, code });
    },
    refresh() {
      ['me', 'customer_subscriptions'].forEach((q) => {
        this.$apollo.queries[q].refetch();
      });
    },
  },
  metaInfo: {
    title: 'Account - Membership',
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
