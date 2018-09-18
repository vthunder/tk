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
                    <p>Membership status: inactive</p>

                    <b-card-group deck class="mt-2">
                        <b-card v-for="plan in plans" :key=plan.id
                                :title=plan.metadata.title
                                :sub-title="plan.monthly_price + '/month'">
                            <p class="card-text">{{ plan.metadata.description }}</p>
                            <div slot="footer" class="text-center">
                                <b-button variant="primary" @click="checkout(plan)">
                                    Become a Member
                                </b-button>
                            </div>
                        </b-card>
                    </b-card-group>
                </div>
            </div>
        </StorePage>
    </div>
</template>

<script>
import * as moment from 'moment';
import StorePage from '@/components/MemberPage.vue';
import * as auth from '@/graphql/auth';
import * as customerQueries from '@/graphql/customer';
import { monthlyQuery, yearlyQuery } from '@/lib/plans';

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
        const m = moment.unix(this.customer_subscriptions[0].created);
        return m.format('dddd, MMMM Do YYYY');
      }
      return '';
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
    checkout(plan) {
      this.$apollo
        .mutate({ mutation: customerQueries.mutation.get_or_create_customer })
        .then(({ data: { get_or_create_customer: customer } }) => {
          if (customer.sources && customer.sources.length) {
            this.$root.$emit('tk::pay-modal::open', { product: plan });
            return;
          }
          this.$checkout.open({
            description: plan.metadata.billing_description,
            amount: plan.amount,
            email: this.me.email,
            token: (token) => {
              this.$apollo.mutate({
                mutation: customerQueries.mutation.update_customer,
                variables: { source: token.id },
              }).then(() => {
                this.$apollo.mutate({
                  mutation: customerQueries.mutation.create_subscription,
                  variables: { plans: [plan.id] },
                }).then(() => {
                  ['me', 'customer_subscriptions'].forEach((q) => {
                    this.$apollo.queries[q].refetch();
                  });
                }).catch((err) => {
                  console.log(`Error: ${err}`);
                });
              });
            },
          });
        });
    },
  },
};
</script>

<style lang="scss">
#membership.tab-pane {
    .product-monthly-price {
        font-size: .8rem;
    }
}
</style>
