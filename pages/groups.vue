<template>
  <b-container>
    <h1 class="mt-4">Group Events</h1>

    <b-card no-body>
      <b-tabs v-model="tabIndex" card>
        <b-tab title="Team Building Offsites" active>
          <p>
            Looking for a fun cooking-themed team offsite for your
            team? Whether you're looking for a short afternoon
            activity, or a guided multi-course dinner party--we can
            make it happen at Tinker Kitchen!</p>
          <h2 class="text-center my-4">Cooking Workshops</h2>
          <b-row class="mb-4">
            <group-activity-card
              title="Chocolate Making"
              img="/images/Chocolate.jpg"
              price="$80">
              <p>
                Learn about chocolate and make a
                variety of shapes of solid bonbons
                with dark Belgian chocolate. Some will
                have fancy decorations on the top just
                like at a chocolatier shop. Decorate
                boxes and take some home with you to
                give to a special someone.
              </p>
            </group-activity-card>
            <group-activity-card
              title="Pasta Extrusion"
              img="/images/Pasta.jpg"
              price="$80">
              <p>
                Learn to make pasta from scratch using
                a commercial extruder! We’ll make
                different shapes, colors, and an
                oven-roasted tomato sauce to go with
                it.
              </p>
            </group-activity-card>
          </b-row>
          <b-row>
            <group-activity-card
              title="Ice Cream Making"
              img="/images/Ice Cream Paddle.jpg"
              price="$80-95">
              <p>
                Learn how to make various flavors of
                rich custard ice cream using modern
                techniques: sous vide cooking, batch
                freezing, and a “paco
                jet”. Optionally, we can also get
                liquid nitrogen!
              </p>
              <p>
                $80 per person for our ice cream class, $95 with
                liquid nitrogen add-on.
              </p>
            </group-activity-card>
            <group-activity-card
              title="Pasta + Ice Cream"
              img="/images/Pasta and Ice Cream.png"
              price="$105-120">
              <p>
                Combine our pasta and ice cream workshops! We'll make
                pasta and ice cream at the same time, so after eating
                your freshly made pasta you can enjoy some ice cream.
              </p>
              <p>
                $105 per person for our pasta + ice cream class, $120
                with liquid nitrogen add-on.
              </p>
            </group-activity-card>
          </b-row>

          <h2 class="text-center my-4">Cooking Competitions</h2>

          <b-row class="mt-4">
            <group-activity-card-h
              title="Cookie Bake-off Competition"
              img="/images/Cookies tall.jpg"
              price="$80">
              <p>
                Your group will be divided into small teams, and each
                team will get to create an original cookie
                dessert. Everyone will be given a basic recipe for how
                to make cookies. Follow that recipe or come up with
                your own! Then create an original cookie with
                ingredients from our wide ranging pantry. Spice it up
                with flavorings, decorate with colorful chocolate
                chips, give it some crunch with nuts or Frosted Flakes
                - oh, the possibilities! Turn your cookies into
                showstoppers with creative plating. Serve them in
                novel shapes and pair them with whipped cream or
                sauces. Nominate a couple of your teammates to be
                judges. You will be judged on taste, presentation and
                originality.
              </p>
            </group-activity-card-h>
          </b-row>

          <b-row class="mt-4">
            <group-activity-card-h
              title="Ice Cream Making Competition"
              img="/images/Ice Cream Group tall.jpg"
              img_right="true"
              price="$95-110">
              <p>
                Your group will be divided into small teams, and each
                team will get to create an original ice
                cream. Everyone will be given a recipe for how to make
                a simple ice cream base. Then create your dream flavor
                with ingredients from our wide ranging pantry. We’ll
                have everything from flavors and syrups, to nut
                butters, to mix-ins like marshmallows, Oreos, colorful
                chocolate chips, Cornflakes, walnuts, pecans, and
                more! Once your ice cream is ready, don’t forget to
                plate it to impress everyone. Finish it off with
                whipped cream, toppings, perhaps a drizzle of
                syrup. Nominate a couple of your teammates to be
                judges. You will be judged on taste, presentation and
                originality.
              </p>
            </group-activity-card-h>
          </b-row>

          <ul class="mt-4">
            <li>
              Events are usually 3 hours, but we can adapt to
              your schedule! Let us know and we can
              customize as needed.</li>
            <li>
              Need to include lunch, but you're only interested in a
              dessert-focused activity? No problem! Just order
              something in (e.g., pizza) and eat in our dining
              area. Just let us know so we can plan the timing.</li>
            <li>
              Our buy-out minimum for private events (where our whole
              space is exclusive to you) is $1600. Smaller events can
              add on extras, or pay the difference to make it private.</li>
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
  import GroupActivityCard from '~/components/GroupActivityCard.vue';
  import GroupActivityCardH from '~/components/GroupActivityCardH.vue';

  export default {
    components: {
      GroupActivityCard,
      GroupActivityCardH,
    },
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
