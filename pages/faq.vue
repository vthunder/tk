<template>
  <b-container class="faq">
    <b-row class="justify-content-center mt-4">
      <b-col sm="10" lg="8">
        <h1>FAQ</h1>

        <h3>What is Tinker Kitchen?</h3>
        <p>
          Tinker Kitchen is a makerspace for food and
          cooking.</p>
        <p>
          You can bring your own ingredients and use our
          fully equipped kitchen to make whatever you've
          been dreaming of cooking.</p>
        <p>
          You can pay by the day, or become a monthly
          member. If you pay monthly, you can come anytime
          and bring a +1 with you as well, plus discounts on
          classes and other goodies.</p>

        <h3>Can my friend come just to eat?</h3>
        <p>
          If you're a member, you can bring a +1
          anytime. Additional people need to get a day pass.</p>
        <p>
          Members can also purchase "eating only" passes for
          extra friends coming to a dinner party, more details
          on our <b-link :to="{ name: 'groups' }">group
          pricing page</b-link>.</p>

        <h3>What are your opening hours?</h3>
        <p>
          We're open daily from 10AM - 9PM, except on
          Tuesdays.</p>

        <h3>Is there an age requirement?</h3>
        <p>
          Tinker Kitchen is open to all ages. Children under
          3 years of age enter free of charge. All minors
          must be accompanied by an adult.</p>
        <p>
          Note: our classes may have separate age
          requirements, often 16 and up.</p>

        <h3>Is there bicycle parking?</h3>
        <p>
          Yes! There's bicycle parking right across the
          street.</p>

        <h3>What's the closest BART stop?</h3>
        <p>
          We're just 2 blocks away from the 24th St BART
          station.</p>

        <h3>I'm driving there. Where can I park?</h3>
        <p>
          There's metered street parking in front (except on
          Thursday afternoons when the farmer's market is
          there). You can also drive around the side streets
          to look for non-metered parking (2-hour limit).</p>
        <p>
          There's also a garage half a block away, look for
          the "Mission Bartlett Garage".</p>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
  export default {
    head() {
      return {
        title: 'FAQ',
      };
    },
  };
</script>

<style lang="scss">
  .faq {
    p { padding-left: 1em; }
  }
</style>
