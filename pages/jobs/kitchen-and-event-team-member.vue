<template>
  <b-container>
    <b-row align-h="center" class="mt-4">
      <b-col sm="8">
        <h1>Kitchen & Event Team Member</h1>

        <p class="mt-4">
          Tinker Kitchen is a brand new cooking makerspace in the Mission
          District in San Francisco. It's a unique cooking school, event
          space, and community kitchen space all rolled into one. Our
          customers come to cook, learn and have fun.
        </p>

        <p>
          We're looking for part-time staff to help us grow our
          business to the next level. You'll help with food prep,
          assist our customers with cooking activities, perform
          cooking demonstrations, and help the place clean and working
          smoothly.
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
          <li>Organize our space to prepare for activities (some lifting required)</li>
          <li>Prepare food and ingredients for cooking activities</li>
          <li>
            Demonstrate and teach to customers how to cook specific
            pre-arranged items, with attention to safety, cleanliness,
            and event flow
          </li>
          <li>
            Interact with customers in a friendly and patient
            manner, and with a good sense of humor
          </li>
          <li>Wash dishes and keep space clean</li>
        </ul>

        <h2>Skills</h2>

        <ul>
          <li>Passion for food and cooking</li>
          <li>Good teaching skills and ability to explain cooking concepts</li>
          <li>
            Ability to multi-task and stay focused and calm in a busy
            environment, including being able to talk with customers
            while working
          </li>
          <li>Ability to quickly learn recipes and key food/cooking concepts</li>
        </ul>

        <h2>Other Requirements</h2>

        <ul>
          <li>Flexible schedule--subject to event bookings</li>
          <li>Good personal hygiene and attention to cleanliness</li>
          <li>Catering, restaurant experience, or culinary school a plus</li>
          <li>Food handler (or manager) certificate a plus</li>
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
        title: 'Kitchen & Event Team Member',
      };
    },
  };
</script>
