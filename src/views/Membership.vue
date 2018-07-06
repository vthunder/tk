<template>
    <div class="section container">
        <h2 id="pricing">Tinker Kitchen Membership</h2>

        <div class="row justify-content-center">
            <div class="col-md-10">
                <p>Ready to embark on your own cooking adventures? Get out of your
                    tiny apartment kitchen! Join us at our gorgeous 1700sqft space
                    for all your personal cooking projects.</p>
                <p class="text-center">${{ membershipMonthly.formattedUnitPrice }}/month
                    <br>${{ membershipYearly.formattedUnitPrice }}/month
                    (paid yearly)</p>
            </div>
        </div>

        <div class="row justify-content-center">
        </div>

        <h5 class="mt-4 mb-4">All memberships include:</h5>

        <div class="justify-content-center">
            <div class="row">
                <div class="feature-card mb-4 pl-5 col-sm-6 col-md-4">
                    <img class="feature-icon"
                         src="/vendor/open-iconic/svg/calendar.svg">
                    <h6 class="mb-2">Flexible schedule</h6>
                    <p>We're a makerspace! Drop by anytime to use
                        the space for your own projects (except
                        during special events). We're open 7 days
                        a week.</p>
                </div>
                <div class="mb-4 pl-5 col-sm-6 col-md-4">
                    <img class="feature-icon" src="/vendor/open-iconic/svg/task.svg">
                    <h6 class="mb-2">All-equipment access</h6>
                    <p>Your monthly membership includes access to
                        all of our equipment, there aren't
                        additional rental fees. We'll teach you
                        how to use it, too!</p>
                </div>
                <div class="mb-4 pl-5 col-sm-6 col-md-4">
                    <img class="feature-icon" src="/vendor/open-iconic/svg/fire.svg">
                    <h6 class="mb-2">Culinary clubs</h6>
                    <p>Join one of our culinary clubs that meet
                        regularly for some group-cooking fun. Make
                        some new friends and learn something new.</p>
                </div>
                <div class="mb-4 pl-5 col-sm-6 col-md-4">
                    <img class="feature-icon" src="/vendor/open-iconic/svg/people.svg">
                    <h6 class="mb-2">Guests welcome</h6>
                    <p>Free entry for two guests each month, so
                        you can bring your family or friends and
                        cook up a dinner party.</p>
                </div>
                <div class="mb-4 pl-5 col-sm-6 col-md-4">
                    <img class="feature-icon" src="/vendor/open-iconic/svg/cart.svg">
                    <h6 class="mb-2">Discounts and freebies</h6>
                    <p>Get discounts on classes, specialized
                        ingredients, day passes for additional
                        guests, and more.</p>
                </div>
                <div class="mb-4 pl-5 col-sm-6 col-md-4">
                    <img class="feature-icon" src="/vendor/open-iconic/svg/beaker.svg">
                    <h6 class="mb-2">Special events</h6>
                    <p>Get invites for special member-only events
                        and activities, like pop-up dinners, guest
                        speakers, and more.</p>
                </div>
                <div class="mb-4 pl-5 col-sm-6 col-md-4">
                    <img class="feature-icon" src="/vendor/open-iconic/svg/droplet.svg">
                    <h6 class="mb-2">Dishwashing help</h6>
                    <p>We're always around to lend a hand to make cleanup
                        a breeze.</p>
                </div>
                <div class="mb-4 pl-5 col-sm-6 col-md-4">
                    <img class="feature-icon" src="/vendor/open-iconic/svg/box.svg">
                    <h6 class="mb-2">Dry & cold storage</h6>
                    <p>Rent shelf space in our storage room or fridge,
                        so you don't have to bring your ingredients
                        every time (subject to availability).</p>
                </div>
                <div class="mb-4 pl-5 col-sm-6 col-md-4">
                    <img class="feature-icon" src="/vendor/open-iconic/svg/thumb-up.svg">
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

export default {
  data() {
    // mock membership data
    return {
      products: [
        {
          id: 1,
          title: 'Membership (Monthly)',
          description: 'Get all membership benefits, billed monthly',
          billingDescription: 'Tinker Kitchen membership (monthly)',
          price: 15000,
          memberPrice: null,
          bundledUnits: 1,
          unit: 'month',
          isSubscription: true,
          subscriptionPeriod: 'monthly',
          subscriptionName: 'membership',
          subscriptionPlan: 'membership-monthly',
          createdAt: '2018-06-14 04:27:07',
          updatedAt: '2018-06-14 04:27:07',
        },
        {
          id: 2,
          title: 'Membership (Yearly)',
          description: 'Get all membership benefits, billed yearly',
          billingDescription: 'Tinker Kitchen membership (yearly)',
          price: 150000,
          memberPrice: null,
          bundledUnits: 12,
          unit: 'month',
          isSubscription: true,
          subscriptionPeriod: 'yearly',
          subscriptionName: 'membership',
          subscriptionPlan: 'membership-yearly',
          createdAt: '2018-06-14 04:27:07',
          updatedAt: '2018-06-14 04:27:07',
        },
      ],
    };
  },
  computed: {
    membershipMonthly() {
      let ret;
      this.products.forEach((p) => {
        if (p.isSubscription &&
            p.subscriptionName === 'membership' &&
            p.subscriptionPeriod === 'monthly') {
          ret = p;
          ret.unitPrice = (p.price / p.bundledUnits);
          ret.formattedUnitPrice = (ret.unitPrice / 100).toFixed(2);
        }
      });
      return ret;
    },
    membershipYearly() {
      let ret;
      this.products.forEach((p) => {
        if (p.isSubscription &&
            p.subscriptionName === 'membership' &&
            p.subscriptionPeriod === 'yearly') {
          ret = p;
          ret.unitPrice = (p.price / p.bundledUnits);
          ret.formattedUnitPrice = (ret.unitPrice / 100).toFixed(2);
        }
      });
      return ret;
    },
  },
  apollo: {
  },
};
</script>
