<template>
    <div>
        <div class="daypasses section container">
            <h1 class="mt-4">Day Passes</h1>

            <b-row class="justify-content-center">
                <b-col md="10">
                    <p class="text-center">
                        Get a day pass and join us at our gorgeous
                        1700sqft space for a day!</p>
                    <p class="text-center">$35/day per person (members: only $25!)<br>
                    </p>
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
