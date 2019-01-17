<template>
  <b-container>
    <h1 class="mt-4">Group Events</h1>

    <p>
      There are several ways to have a group activity at Tinker
      Kitchen! We're a perfect space for a small cooking-themed
      team offsite, dinner party, or even a larger celebration.</p>

    <b-card no-body>
      <b-tabs card>
        <b-tab title="Team Building" active>
          <p>
            Looking for a fun cooking-themed team offsite
            for your team?</p>
          <p>
            Whether you're looking for a short afternoon
            activity, or a guided multi-course dinner
            party--we can make it happen at Tinker
            Kitchen!</p>
          <b-row class="mt-4">
            <b-col sm="5">
              <img src="/images/Chocolate.jpg" class="feature-img">
            </b-col>
            <b-col sm="7">
              <h3>Chocolate Making</h3>
              <p>
                Learn about chocolate and make a
                variety of shapes of solid bonbons
                with dark Belgian chocolate. Some will
                have fancy decorations on the top just
                like at a chocolatier shop. Decorate
                boxes and take some home with you to
                give to a special someone.</p>
            </b-col>
          </b-row>
          <b-row class="mt-4">
            <b-col sm="5" order-sm="2">
              <img src="/images/Pasta.jpg" class="feature-img">
            </b-col>
            <b-col sm="7">
              <h3>Pasta Extrusion</h3>
              <p>
                Learn to make pasta from scratch using
                a commercial extruder! We’ll make
                different shapes colors, and an
                oven-roasted tomato sauce to go with
                it.</p>
            </b-col>
          </b-row>
          <b-row class="mt-4">
            <b-col sm="5">
              <img src="/images/Ice Cream.jpg" class="feature-img">
            </b-col>
            <b-col sm="7">
              <h3>Ice Cream Making</h3>
              <p>
                Learn how to make various flavors of
                rich custard ice cream using modern
                techniques: sous vide cooking, batch
                freezing, and a “paco
                jet”. Optionally, we can also get
                liquid nitrogen!</p>
            </b-col>
          </b-row>

          <div class="pricing">
            <b-card-group deck class="mt-4">
              <b-card title="One Topic" class="text-center">$80/person</b-card>
              <b-card title="Two topics" class="text-center">$105/person</b-card>
            </b-card-group>
            <p class="text-center mt-2">Liquid nitrogen add-on: $15/person</p>
          </div>

          <ul class="mt-4">
            <li>
              Events are usually 3 hours, but we can adapt to
              your schedule! Let us know and we can
              customize as needed.</li>
            <li>
              Need to include lunch, but you're only
              interested in a dessert-focused activity? No
              problem! Just order something in (e.g., pizza)
              and eat in our dining area.</li>
            <li>
              Because we are a makerspace, our regular
              members may drop by during the event. If
              you’d like exclusive use of the space, you
              can do a private event buy-out for an
              additional $475 for 4 hours.</li>
          </ul>

          <h2 class="text-center">Ready to book?</h2>
          <p>
            Awesome! Shoot us an email at
            hello@tinkerkitchen.org so we can
            schedule. Can't wait to cook with you!</p>
        </b-tab>
        <b-tab title="Dinner Party">
          <p>Available to members only:</p>
          <p>
            Tinker Kitchen is the perfect space for your
            dinner party!</p>
          <p>
            As a member, you can always bring a +1 with you
            to cook anytime. Additional people cooking
            (3+) are just $25 each. But what if you want
            to cook up a storm and have some friends join
            you for dinner? The answer: dinner party
            passes!</p>
          <p>
            You can invite up to 10 additional guests to have dinner
            for <strong>just $10 each</strong>. Guests limited to
            dining (not cooking).</p>
        </b-tab>
        <b-tab title="Space Rental">
          <b-card-group deck>
            <b-card
              title="Partial space rental"
              sub-title="$75-140/hr + $50-100 cleaning" class="mt-2">
              <p>
                Get access to our space for your team-building
                activity, pop-up demo, class, or other
                activity / gathering.</p>
              <p>
                We'll reserve cooking workspaces and seating
                space as needed, for groups from 10 to 20
                people.</p>
            </b-card>
            <b-card
              title="Full space rental"
              sub-title="$200/hr + $150 cleaning" class="mt-2">
              <p>
                Exclusive use for your private party, product
                launch, or other activity/celebration.</p>
              <p>
                We'll reserve the entire Tinker Kitchen space
                for you (up to 40 guests), and help you with
                guidance, logistics, and hiring staff if
                needed. 2 weeks advance booking required.</p>
            </b-card>
          </b-card-group>
        </b-tab>
      </b-tabs>
    </b-card>

    <p class="mt-4 text-center">
      <b-button href="mailto:hello@tinkerkitchen.org" variant="primary">
        Contact us
      </b-button><br>
    </p>
    <p class="text-center">email: hello@tinkerkitchen.org</p>
  </b-container>
</template>

<script>
  export default {
    head() {
      return {
        title: 'Groups & Events',
      };
    },
  };
</script>

<style lang="scss">
  .feature-img {
    width: 100%;
    border-radius: 4px;
    box-shadow: 1px 1px 2px #ccc;
  }
  .pricing {
    background-color: rgba(0, 0, 0, 0.03);
    border-radius: 4px;
    margin-top: 1em;
    padding: .5em;
  }
</style>
