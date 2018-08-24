<template>
    <div class="incubator section container">
        <h2 id="pricing">Tinker Kitchen Micro-Incubator</h2>

        <div class="container section">
            <div class="row justify-content-center">
                <div class="col-md-10">
                    <p>
                        Are you a recent culinary school grad, or are
                        you interested in developing a new food
                        product and need some help getting started?
                        The Tinker Kitchen Micro-Incubator is a program to
                        help aspiring food entrepreneurs to take their
                        very first steps towards finding their own
                        path in the food industry.
                    </p>
                    <p>
                        Our program has three pillars of focus:
                    </p>

                    <b-row class="pillars">
                        <b-col md="4">
                            <h3>Grow</h3>
                            <ul>
                                <li>Practice your skills&#8212;We're a perfect
                                    complement to a culinary degree program</li>
                                <li>Learn from experts and mentors: we have a wide
                                    network and events to learn and grow</li>
                            </ul>
                        </b-col>
                        <b-col md="4">
                            <h3>Tinker</h3>
                            <ul>
                                <li>Experiment in our awesome kitchen, use all of
                                    our equipment anytime you like</li>
                                <li>Create new recipes and test product
                                    ideas. We're the perfect venue for all your R&D</li>
                            </ul>
                        </b-col>
                        <b-col md="4">
                            <h3>Connect</h3>
                            <ul>
                                <li>Host micro-popup events and teach
                                classes to get feedback and refine
                                your products</li>
                                <li>Get to know others in the
                                industry&#8212;maybe find your future
                                co-founders!</li>
                            </ul>
                        </b-col>
                    </b-row>

                    <h3 class="mt-3">Pricing</h3>
                    <p>
                        While we are still working out the details,
                        the Tinker Kitchen Micro-Incubator will be
                        available to qualified low-income applicants
                        for free or at minimal cost. Stay tuned for
                        details.
                    </p>

                    <h3 class="mt-3">Interested?</h3>
                    <p>
                        We are still working on the program details
                        and the application process. Sign up below to
                        get notified when we launch:
                    </p>
                    <MailingListSignup cta=" " list="Tinker Kitchen Incubator" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MailingListSignup from '@/components/MailingListSignup.vue';

export default {
  components: {
    MailingListSignup,
  },
};
</script>

<style lang="scss">
.incubator {
    .pillars {
        h3 {
            text-align: center;
        }
    }
}
</style>
