<template>
  <b-container>
    <b-row align-h="center" class="mt-4">
      <b-col sm="8">
        <h1>Operations Manager</h1>

        <p class="mt-4">
          Tinker Kitchen is a brand new cooking makerspace in the Mission
          District in San Francisco. It's a unique cooking school, event
          space, and community kitchen space all rolled into one. Our
          customers come to cook, learn and have fun.
        </p>

        <p>
          We're looking for a part-time operations manager to help us
          grow our business to the next level. This is an opportunity
          to get in at the ground level and work directly with the
          founder to create the policies and processes that define the
          operation, hire and train other staff, and generally make
          sure the space is operating optimally.
        </p>

        <p>
          Tinker Kitchen is not a restaurant, but it helps to be
          familiar with commercial kitchen operations. You also need
          to have a passion for cooking and for teaching others. And
          since you'll be interacting with our customers you'll need
          to be personable, polite, and able to think on your feet to
          keep events and activities running smoothly.
        </p>

        <h2>Job Responsibilities</h2>

        <ul>
          <li>Write, maintain and apply our ops "handbook" & SOPs</li>
          <li>Manage inventory & supplies</li>
          <li>Manage kitchen & event staff, including training, scheduling, hiring & firing</li>
          <li>
            Work with customers: help walk-ins, teach procedures and
            equipment use, and act as a resource in general
          </li>
          <li>
            Ensure all equipment is in working order, maintain and
            schedule repairs as necesary
          </li>
          <li>
            Clean, organize, and help with events as necessary, by
            directing other staff or doing the work in their absence
          </li>
          <li>
            Manage and grow teacher network to create a vibrant set of
            classes and activities: recruit teachers, help train them
            in our SOPs, answer any questions and help them with
            scheduling
          </li>
        </ul>

        <h3>Skills</h3>

        <ul>
          <li>Highly organized and detail-oriented</li>
          <li>Passion for food and cooking</li>
          <li>Good teaching skills and ability to explain cooking concepts</li>
          <li>
            Ability to multi-task and stay focused and calm in a busy
            environment, including being able to talk with customers
            while working
          </li>
        </ul>

        <h3>Other Requirements</h3>

        <ul>
          <li>Food manager certificate required</li>
        </ul>

        <h2>How To Apply</h2>

        <p>
          Please submit your resume to
          <a href="mailto:hello@tinkerkitchen.org">hello@tinkerkitchen.org</a>, thanks!
        </p>

        <p>
          Address: 3233 22nd St, San Francisco CA
        </p>

        <iframe
          :src="maps.src"
          width="100%" height="450" frameborder="0" style="border:0"
          allowfullscreen/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
        maps: {
          src: '//www.google.com/maps/embed/v1/place?q=' +
               'place_id:ChIJu3WgID9-j4ARp-tuXllo1y8&key=AIzaSyBY6GbaztLA3fPKcxuK1JTOlzvGkJJ-DzI',
        },
      };
    },
    head() {
      return {
        title: 'Operations Manager',
      };
    },
  };
</script>
