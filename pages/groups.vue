<template>
  <b-container>
    <h1 class="my-4">Team Building Events</h1>
    <p>
      Looking for a fun cooking-themed team offsite for your team?
      Whether you're looking for a short afternoon activity, or a
      guided multi-course dinner party--we can make it happen at
      Tinker Kitchen!
    </p>

    <h2 class="text-center my-4">Cooking Workshops</h2>

    <b-row class="mb-4">
      <group-activity-card
        title="Chocolate Making"
        img="/images/Chocolate.jpg"
        price="$80">
        <p>
          Learn about chocolate and make a variety of shapes of solid
          bonbons with dark Belgian chocolate. Some will have fancy
          decorations on the top just like at a chocolatier
          shop. Decorate boxes and take some home with you to give to
          a special someone.
        </p>
      </group-activity-card>
      <group-activity-card
        title="Pasta Extrusion"
        img="/images/Pasta.jpg"
        price="$80">
        <p>
          Learn to make pasta from scratch using a commercial
          extruder! We’ll make different shapes, colors, and an
          oven-roasted tomato sauce to go with it.
        </p>
      </group-activity-card>
    </b-row>
    <b-row>
      <group-activity-card
        title="Ice Cream Making"
        img="/images/Ice Cream Paddle.jpg"
        price="$80-95">
        <p>
          Learn how to make various flavors of rich custard ice cream
          using modern techniques: sous vide cooking, batch freezing,
          and a “paco jet”. Optionally, we can also get liquid
          nitrogen!
        </p>
        <p>
          $80 per person for our ice cream class, $95 with liquid
          nitrogen add-on.
        </p>
      </group-activity-card>
      <group-activity-card
        title="Pasta + Ice Cream"
        img="/images/Pasta and Ice Cream.png"
        price="$105-120">
        <p>
          Combine our pasta and ice cream workshops! We'll make pasta
          and ice cream at the same time, so after eating your freshly
          made pasta you can enjoy some ice cream.
        </p>
        <p>
          $105 per person for our pasta + ice cream class, $120 with
          liquid nitrogen add-on.
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
          Your group will be divided into small teams, and each team
          will get to create an original cookie dessert. Everyone will
          be given a basic recipe for how to make cookies. Follow that
          recipe or come up with your own! Then create an original
          cookie with ingredients from our wide ranging pantry. Spice
          it up with flavorings, decorate with colorful chocolate
          chips, give it some crunch with nuts or Frosted Flakes - oh,
          the possibilities! Turn your cookies into showstoppers with
          creative plating. Serve them in novel shapes and pair them
          with whipped cream or sauces. Nominate a couple of your
          teammates to be judges. You will be judged on taste,
          presentation and originality.
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
          Your group will be divided into small teams, and each team
          will get to create an original ice cream. Everyone will be
          given a recipe for how to make a simple ice cream base. Then
          create your dream flavor with ingredients from our wide
          ranging pantry. We’ll have everything from flavors and
          syrups, to nut butters, to mix-ins like marshmallows, Oreos,
          colorful chocolate chips, Cornflakes, walnuts, pecans, and
          more! Once your ice cream is ready, don’t forget to plate it
          to impress everyone. Finish it off with whipped cream,
          toppings, perhaps a drizzle of syrup. Nominate a couple of
          your teammates to be judges. You will be judged on taste,
          presentation and originality.
        </p>
      </group-activity-card-h>
    </b-row>

    <ul class="mt-4">
      <li>
        Events are usually 3 hours, but we can adapt to your schedule!
        Let us know and we can customize as needed.</li>
      <li>
        Need to include lunch, but you're only interested in a
        dessert-focused activity? No problem! Just order something in
        (e.g., pizza) and eat in our dining area. Just let us know so
        we can plan the timing.</li>
      <li>
        Our buy-out minimum for private events (where our whole space
        is exclusive to you) is $1600. Smaller events can add on
        extras, or pay the difference to make it private.</li>
    </ul>

    <h2 class="text-center">Ready to book?</h2>
    <p>
      Awesome! Shoot us an email at hello@tinkerkitchen.org so we can
      schedule. Can't wait to cook with you!
    </p>

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
        document.location = '/rental';
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
