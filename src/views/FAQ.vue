<template>
    <b-container>
        <h1 class="mt-4">FAQ</h1>

        <b-row class="justify-content-center">
            <b-col sm="10" lg="8">
                <h3>What is Tinker Kitchen?</h3>
                <p>Tinker Kitchen is a makerspace for food and
                    cooking.</p>
                <p>You can bring your own ingredients and use our
                    fully equipped kitchen to make whatever you've
                    been dreaming of cooking.</p>
                <p>You can pay by the day, or become a monthly
                    member. If you pay monthly, you can come anytime
                    and bring a +1 with you as well, plus discounts on
                    classes and other goodies.</p>
            </b-col>
            <b-col sm="10" lg="8">
                <h3>Can my friend come just to eat?</h3>
                <p>If you're a member, you can bring a +1
                    anytime. Additional people need to get a day
                    pass. There's no "eating only" pass.</p>
                <p>We do have <b-link :to="{ name: 'groups' }">group pricing options</b-link>,
                    though (e.g. for a dinner party).</p>
            </b-col>
            <b-col sm="10" lg="8">
                <h3>What are your opening hours?</h3>
                <p>We're open daily from 10AM - 9PM, except on
                    Tuesdays.</p>
            </b-col>
            <b-col sm="10" lg="8">
                <h3>Is there an age requirement?</h3>
                <p>Tinker Kitchen is open to all ages. Children under
                    3 years of age enter free of charge. All minors
                    must be accompanied by an adult.</p>
                <p>Note: our classes may have separate age
                    requirements, often 16 and up.</p>
            </b-col>
            <b-col sm="10" lg="8">
                <h3>Is there bicycle parking?</h3>
                <p>Yes! There's bicycle parking right across the
                    street.</p>
            </b-col>
            <b-col sm="10" lg="8">
                <h3>What's the closest BART stop?</h3>
                <p>We're just 2 blocks away from the 24th St BART
                    station.</p>
            </b-col>
            <b-col sm="10" lg="8">
                <h3>I'm driving there. Where can I park?</h3>
                <p>We're close to public transit, but if you're
                    driving we do have parking nearby.</p>
                <p>There's metered street parking in front (except on
                    Thursday afternoons when the farmer's market is
                    there).</p>
                <p>There's also a garage half a block away, look for
                    the "Mission Bartlett Garage". You can also drive
                    around the side streets to look for non-metered
                    parking (2-hour limit, at least in theory).</p>
            </b-col>
        </b-row>

    </b-container>
</template>

<script>
export default {
  metaInfo: {
    title: 'FAQ',
  },
};
</script>

<style lang="scss">
</style>
