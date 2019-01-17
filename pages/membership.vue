<template>
  <div>
    <div class="membership section container">
      <h1>Membership</h1>

      <b-row class="justify-content-center">
        <b-col md="10">
          <p class="text-center">
            Ready to embark on your own
            cooking adventures? Get out of your tiny apartment
            kitchen! Join us at our gorgeous 1700sqft space
            for all your personal cooking projects.</p>
        </b-col>
        <b-col md="6">
          <div class="text-center">
            <div v-if="me.is_member">
              Thanks for being a member!
            </div>
            <RequireSignInForm v-else>
              <b-card-group v-if="me.is_free_member">
                <b-card header="Pay Monthly">
                  <p><strike class="text-muted">$150/month</strike>
                    $125/month (Backer discount!)</p>
                  <b-button
                    variant="primary"
                    @click="signup(monthly, 'KS_CONVERT')">Sign up</b-button>
                </b-card>
                <b-card header="Pay Yearly">
                  <p><strike class="text-muted">$125/month</strike>
                    $108/month (Backer discount!)</p>
                  <b-button
                    variant="primary"
                    @click="signup(yearly, 'KS_CONVERT')">Sign up</b-button>
                </b-card>
              </b-card-group>
              <b-card-group v-else>
                <b-card header="Pay Monthly">
                  <p>$150/month</p>
                  <b-button
                    variant="primary"
                    @click="signup(monthly)">Sign up</b-button>
                </b-card>
                <b-card header="Pay Yearly">
                  <p>$125/month</p>
                  <b-button
                    variant="primary"
                    @click="signup(yearly)">Sign up</b-button>
                </b-card>
              </b-card-group>
            </RequireSignInForm>
          </div>
        </b-col>
      </b-row>

      <h5 class="mt-4 mb-4">Memberships include:</h5>

      <div class="justify-content-center">
        <div class="row">
          <div class="feature-card mb-4 pl-5 col-sm-6 col-md-4">
            <span class="oi oi-calendar feature-icon"/>
            <h6 class="mb-2">Flexible schedule</h6>
            <p>
              We're a makerspace! Drop by anytime to use
              the space for your own projects (except
              during special events).</p>
          </div>
          <div class="mb-4 pl-5 col-sm-6 col-md-4">
            <span class="oi oi-task feature-icon"/>
            <h6 class="mb-2">All-equipment access</h6>
            <p>
              Access to all of our equipment included, there
              are no additional rental fees. We'll teach you
              how to use it, too!</p>
          </div>
          <div class="mb-4 pl-5 col-sm-6 col-md-4">
            <span class="oi oi-fire feature-icon"/>
            <h6 class="mb-2">Culinary clubs</h6>
            <p>
              Join one of our culinary clubs that meet
              regularly for some group-cooking fun. Make
              some new friends and learn something new.</p>
          </div>
          <div class="mb-4 pl-5 col-sm-6 col-md-4">
            <span class="oi oi-people feature-icon"/>
            <h6 class="mb-2">Guests welcome</h6>
            <p>
              Free entry for one guest anytime you
              come. Because cooking together is twice the fun.</p>
          </div>
          <div class="mb-4 pl-5 col-sm-6 col-md-4">
            <span class="oi oi-box feature-icon"/>
            <h6 class="mb-2">Host a dinner party</h6>
            <p>
              Invite additional guests for dinner (not
              cooking) for just $10 each. We'll even
              reserve space for you. Limited to 10
              guests, 3 hours.</p>
          </div>
          <div class="mb-4 pl-5 col-sm-6 col-md-4">
            <span class="oi oi-beaker feature-icon"/>
            <h6 class="mb-2">Special events</h6>
            <p>
              Get invites for special member-only events
              and activities, like pop-up dinners, guest
              speakers, and more.</p>
          </div>
          <div class="mb-4 pl-5 col-sm-6 col-md-4">
            <span class="oi oi-droplet feature-icon"/>
            <h6 class="mb-2">Dishwashing help</h6>
            <p>
              We're always around to lend a hand to make cleanup
              a breeze.</p>
          </div>
          <div class="mb-4 pl-5 col-sm-6 col-md-4">
            <span class="oi oi-cart feature-icon-plus"/>
            <h6 class="mb-2">Discounts and freebies</h6>
            <p>
              Get discounts on classes, specialized
              ingredients, day passes for additional
              guests, and more.</p>
          </div>
          <div class="mb-4 pl-5 col-sm-6 col-md-4">
            <span class="oi oi-thumb-up feature-icon-plus"/>
            <h6 class="mb-2">Logistics help</h6>
            <p>
              We&#x27;ll receive your monthly CSA or
              meal-kit, or help you coordinate ingredient order
              & delivery, so you can just come and cook.</p>
          </div>
        </div>
      </div>
    </div>
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
  </div>
</template>

<script>
  import RequireSignInForm from '@/components/RequireSignInForm.vue';
  import * as customerQueries from '@/graphql/customer';
  import { monthlyQuery, yearlyQuery } from '@/lib/plans';
  import * as auth from '@/graphql/auth';

  export default {
    components: {
      RequireSignInForm,
    },
    data() {
      return {
        me: {},
        monthly: {},
        yearly: {},
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
      checkoutButtonLabel() {
        return `Subscribe (monthly)`;
      },
    },
    apollo: {
      me: auth.query.me,
      monthly: monthlyQuery,
      yearly: yearlyQuery,
    },
    methods: {
      async signup(plan, code) {
        await this.$apollo.mutate({ mutation: customerQueries.mutation.get_or_create_customer });
        this.checkout.description = plan.metadata.billing_description;
        this.checkout.amount = (code === 'KS_CONVERT') ? plan.ks_amount : plan.amount;
        this.checkout.email = this.me.email;
        const { token, args } = await this.$refs.checkoutRef.open();

        if (token) {
          await this.$apollo.mutate({
            mutation: customerQueries.mutation.update_customer,
            variables: { source: token.id },
          });
          await this.$apollo.mutate({
            mutation: customerQueries.mutation.create_subscription,
            variables: { plans: [plan.id], code },
          });
          this.$root.$emit('tk::checkout::complete');
        }
      },
    },
    head() {
      return {
        title: 'Membership',
      };
    },
  };
</script>

<style lang="scss">
  .membership {
    h6 {
      font-weight: 600;
    }

    .feature-card {
      position: relative;
    }

    .feature-icon {
      position: absolute;
      top: 0;
      left: 15px;
      height: 20px;
      width: 20px;
    }

    .feature-icon-plus {
      @extend .feature-icon;
      font-size: 18px;
    }

    #register-form {
      input {
        display: inline;
        width: unset;
      }
    }
  }
</style>
