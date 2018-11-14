<template>
    <div>
        <div class="membership section container">
            <h1>Membership</h1>

            <b-row class="justify-content-center">
                <b-col md="10">
                    <p class="text-center">Ready to embark on your own
                        cooking adventures? Get out of your tiny apartment
                        kitchen! Join us at our gorgeous 1700sqft space
                        for all your personal cooking projects.</p>
                    <p class="text-center">{{ monthly.monthly_price }}/month
                        <br>{{ yearly.monthly_price }}/month
                        (paid yearly)</p>
                </b-col>
                <b-col md="4">
                    <b-card>
                        <div v-if="me && me.is_member" class="card-text">
                            Membership <strong>active</strong>. Yay!
                            <div class="mt-2 text-center">
                                <b-button :to="{ name: 'member-membership' }"
                                          variant="primary">
                                    Account & Billing
                                </b-button>
                            </div>
                        </div>
                        <div v-else class="card-text">
                            Membership <strong>inactive</strong>.
                            <RequireSignIn post_text="to become a member."
                                           :next_route="{ name: 'member-membership' }">
                                <div class="text-center">
                                    <b-button :to="{ name: 'member-membership' }"
                                              variant="primary">Sign up</b-button>
                                </div>
                            </RequireSignIn>
                        </div>
                    </b-card>
                </b-col>
            </b-row>

            <h5 class="mt-4 mb-4">Memberships include:</h5>

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
                        <span class="oi oi-box feature-icon"></span>
                        <h6 class="mb-2">Host a dinner party</h6>
                        <p>Invite additional guests for dinner (not
                            cooking) for just $10 each. We'll even
                            reserve space for you. Limited to 10
                            guests, 3 hours.</p>
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
                        <span class="oi oi-cart feature-icon-plus"></span>
                        <h6 class="mb-2">Discounts and freebies</h6>
                        <p>Get discounts on classes, specialized
                            ingredients, day passes for additional
                            guests, and more.</p>
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

        <div class="tinker-with-us-image"></div>

        <div class="membership section container">
            <h1 class="mt-4">Day Passes</h1>

            <b-row class="justify-content-center">
                <b-col md="10">
                    <p class="text-center">Just want to try things out?
                        Get a day pass and join us at our gorgeous
                        1700sqft space for a day!</p>
                    <p class="text-center">$35/day<br>$30/day (5-pack)
                        <br>Member discount: $5 off/pass</p>
                </b-col>
                <b-col md="4">
                    <RequireSignIn post_text="to purchase a day pass."
                                   :next_route="{ name: 'member-daypasses' }">
                        <div class="text-center">
                            <b-button :to="{ name: 'member-daypasses' }" variant="primary">
                                Purchase day passes
                            </b-button>
                        </div>
                    </RequireSignIn>
                </b-col>
            </b-row>

            <h5 class="mt-4 mb-4">Day passes include:</h5>

            <div class="justify-content-center">
                <div class="row">
                    <div class="feature-card mb-4 pl-5 col-sm-6 col-md-4">
                        <span class="oi oi-calendar feature-icon"></span>
                        <h6 class="mb-2">Full day access</h6>
                        <p>Use a day pass anytime and use the space for a
                            full day.</p>
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
                        <h6 class="mb-2">Clubs & activities</h6>
                        <p>Attend open events and activities on the day
                            you use your pass.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RequireSignIn from '@/components/RequireSignIn.vue';
import MailingListSignup from '@/components/MailingListSignup.vue';
import { monthlyQuery, yearlyQuery } from '@/lib/plans';
import * as auth from '@/graphql/auth';

export default {
  data() {
    return {
      me: {},
      monthly: {},
      yearly: {},
    };
  },
  apollo: {
    me: auth.query.me,
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
  metaInfo: {
    title: 'Membership',
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
