<template>
  <b-container>
    <h1 class="my-4">Rent our Space</h1>
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
        title: 'Rent our Space',
      };
    },
  };
</script>

<style lang="scss">
  .space-img {
    width: 100%;
  }
</style>
