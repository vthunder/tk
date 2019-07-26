<template>
  <b-container>
    <h1 class="mt-4">Group Events</h1>

    <b-card no-body>
      <b-tabs v-model="tabIndex" card>
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
            <p class="text-center mt-2">Liquid nitrogen add-on: $15/person ($150 min)</p>
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
              Events larger than 20 people are booked as private
              events at no extra cost. Smaller events can be made
              private for an additional buy-out cost.</li>
          </ul>

          <h2 class="text-center">Ready to book?</h2>
          <p>
            Awesome! Shoot us an email at
            hello@tinkerkitchen.org so we can
            schedule. Can't wait to cook with you!</p>
        </b-tab>
        <b-tab title="Space Rental">
          <b-row>
            <b-col sm="4">
              <a href="/images/Space photos/IMG_2581.jpg">
                <img class="space-img" src="/images/Space photos/IMG_2581.jpg">
              </a>
            </b-col>
            <b-col sm="4">
              <a href="/images/Space photos/IMG_2576.jpg">
                <img class="space-img" src="/images/Space photos/IMG_2576.jpg">
              </a>
            </b-col>
            <b-col sm="4">
              <a href="/images/Space photos/IMG_2573.jpg">
                <img class="space-img" src="/images/Space photos/IMG_2573.jpg">
              </a>
            </b-col>
          </b-row>
          <b-row align-h="center" class="mt-3">
            <b-col sm="10">
              <p>
                Our space is great for:
              </p>
              <ul>
                <li>Cooking classes</li>
                <li>Private dinners</li>
                <li>Cooking-centric team building events</li>
                <li>Food photo shoots</li>
              </ul>
              <p>
                Our space is like a kitchen playground. We have an
                enormous kitchen in an open-plan space with every
                piece of equipment you could imagine, plus plenty of
                space to eat and hang out.
              </p>
              <p>
                You'll have a wide choice of possible activities, with
                multiple ovens, including a German-made "combi oven"
                with built-in humidity/steam control, commercial
                deep-fryer, and even a real wok range. We also have a
                commercial pasta extruder, ice cream machines
                (several!), chocolate-making tools, and even coffee
                roasters and an espresso machine.
              </p>
              <p>
                Our 1700sqft open-concept space has tall ceilings and
                lots of natural light, making it very spacious and
                comfortable. And we've designed it to be easy to
                re-arrange for different needs—whether you're looking
                to have a chef come in and do a demonstration, a team
                cooking competition, a photo shoot, or something
                completely different.
              </p>
            </b-col>
          </b-row>

          <b-row align-h="center" class="mt-3">
            <b-col sm="10">
              <h2 class="text-center">Included in your booking</h2>
              <b-row>
                <b-col sm="6">
                  <ul>
                    <li>Projector</li>
                    <li>Whiteboards</li>
                    <li>Excellent WiFi</li>
                    <li>Dining area access</li>
                    <li>Tables & Chairs</li>
                  </ul>
                </b-col>
                <b-col sm="6">
                  <ul>
                    <li>
                      Full kitchen access (<a href="/about#equipment">equipment list</a>)
                      <ul>
                        <li>4 commercial ovens (including a combi oven)</li>
                        <li>Restaurant-grade pasta extruder</li>
                        <li>Ice cream machines</li>
                        <li>A Thermomix multi-cooker</li>
                      </ul>
                    </li>
                  </ul>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row align-h="center" class="mt-3">
            <b-col sm="10">
              <h2 align="center">Capacity</h2>
              <p>
                Our space is 1700 sqft in total, and designed to
                easily adapted to support different uses.
              </p>
              <ul>
                <li>~35 comfortably seated with tables</li>
                <li>~45-50 cocktail style</li>
              </ul>
            </b-col>
          </b-row>
          <h2 align="center">Rental Options</h2>
          <b-card-group deck>
            <b-card
              title="Shared use rental"
              sub-title="$35/person" class="mt-2">
              <p>
                Get access to our space for your team-building
                activity, pop-up demo, class, or other
                activity / gathering.</p>
              <p>
                We'll reserve cooking workspaces and seating
                space as needed, for groups up to 20
                people.</p>
            </b-card>
            <b-card
              title="Full space rental"
              sub-title="$950/5h (10-3PM or 4-9PM)" class="mt-2">
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
    data() {
      return {
        tabIndex: 0,
      };
    },
    mounted() {
      if (this.$route.hash.match(/(Space%20)?Rental/)) {
        this.tabIndex = 1;
      }
    },
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
  .space-img {
    width: 100%;
  }
</style>
