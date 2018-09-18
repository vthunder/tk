<template>
    <div class="membership section container">
        <h2 id="pricing">Tinker Kitchen Membership</h2>

        <div class="row justify-content-center">
            <div class="col-md-10">
                <p>Ready to embark on your own cooking adventures? Get out of your
                    tiny apartment kitchen! Join us at our gorgeous 1700sqft space
                    for all your personal cooking projects.</p>
                <p class="text-center">{{ monthly.monthly_price }}/month
                    <br>{{ yearly.monthly_price }}/month
                    (paid yearly)</p>
            </div>
        </div>

        <div v-if="enable_login" class="row justify-content-center">
            <RequireSignIn post_text="to become a member."
                           :next_route="{ name: 'member-membership' }">
                <b-button :to="{ name: 'member-membership' }"
                          variant="primary">Click here</b-button> to
                sign up.
            </RequireSignIn>
        </div>
        <div v-else-if="enable_ks">
            <div class="row justify-content-center">
                Become a member by backing our Kickstarter and take
                advantage of our special launch pricing.
            </div>
            <div class="row justify-content-center">
                <b-button variant="primary" href="https://www.kickstarter.com/projects/20846993/tinker-kitchen">Back our Kickstarter</b-button>
            </div>
        </div>
        <div v-else class="row justify-content-center">
            <MailingListSignup cta="Sign up below to get on our membership waitlist:" />
        </div>

        <h5 class="mt-4 mb-4">All memberships include:</h5>

        <div class="justify-content-center">
            <div class="row">
                <div class="feature-card mb-4 pl-5 col-sm-6 col-md-4">
                    <span class="oi oi-calendar feature-icon"></span>
                    <h6 class="mb-2">Flexible schedule</h6>
                    <p>We're a makerspace! Drop by anytime to use
                        the space for your own projects (except
                        during special events).</p>
                </div>
                <div class="mb-4 pl-5 col-sm-6 col-md-4">
                    <span class="oi oi-task feature-icon"></span>
                    <h6 class="mb-2">All-equipment access</h6>
                    <p>Access to all of our equipment included, there
                        are no additional rental fees. We'll teach you
                        how to use it, too!</p>
                </div>
                <div class="mb-4 pl-5 col-sm-6 col-md-4">
                    <span class="oi oi-fire feature-icon"></span>
                    <h6 class="mb-2">Culinary clubs</h6>
                    <p>Join one of our culinary clubs that meet
                        regularly for some group-cooking fun. Make
                        some new friends and learn something new.</p>
                </div>
                <div class="mb-4 pl-5 col-sm-6 col-md-4">
                    <span class="oi oi-people feature-icon"></span>
                    <h6 class="mb-2">Guests welcome</h6>
                    <p>Free entry for one guest anytime you
                    come. Because cooking together is twice the fun.</p>
                </div>
                <div class="mb-4 pl-5 col-sm-6 col-md-4">
                    <span class="oi oi-cart feature-icon-plus"></span>
                    <h6 class="mb-2">Discounts and freebies</h6>
                    <p>Get discounts on classes, specialized
                        ingredients, day passes for additional
                        guests, and more.</p>
                </div>
                <div class="mb-4 pl-5 col-sm-6 col-md-4">
                    <span class="oi oi-beaker feature-icon"></span>
                    <h6 class="mb-2">Special events</h6>
                    <p>Get invites for special member-only events
                        and activities, like pop-up dinners, guest
                        speakers, and more.</p>
                </div>
                <div class="mb-4 pl-5 col-sm-6 col-md-4">
                    <span class="oi oi-droplet feature-icon"></span>
                    <h6 class="mb-2">Dishwashing help</h6>
                    <p>We're always around to lend a hand to make cleanup
                        a breeze.</p>
                </div>
                <div class="mb-4 pl-5 col-sm-6 col-md-4">
                    <span class="oi oi-box feature-icon"></span>
                    <h6 class="mb-2">Dry & cold storage</h6>
                    <p>Rent shelf space in our storage room or fridge,
                        so you don't have to bring your ingredients
                        every time (subject to availability).</p>
                </div>
                <div class="mb-4 pl-5 col-sm-6 col-md-4">
                    <span class="oi oi-thumb-up feature-icon-plus"></span>
                    <h6 class="mb-2">Logistics help</h6>
                    <p>We&#x27;ll receive your monthly CSA or
                        meal-kit, or help you coordinate ingredient order
                        & delivery, so you can just come and cook.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RequireSignIn from '@/components/RequireSignIn.vue';
import MailingListSignup from '@/components/MailingListSignup.vue';
import { monthlyQuery, yearlyQuery } from '@/lib/plans';

export default {
  data() {
    return {
      monthly: {},
      yearly: {},
      enable_login: process.env.VUE_APP_ENABLE_LOGIN === 'true',
      enable_ks: process.env.VUE_APP_ENABLE_KS === 'true',
    };
  },
  apollo: {
    monthly: monthlyQuery,
    yearly: yearlyQuery,
  },
  computed: {
    plans() {
      return [this.monthly, this.yearly];
    },
  },
  components: {
    RequireSignIn,
    MailingListSignup,
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
