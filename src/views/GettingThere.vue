<template>
    <b-container>
        <h2 class="section-heading text-center mt-4">Getting There</h2>

        <p>We're in the Mission District in San Francisco.</p>

        <p><strong>Address:</strong>&nbsp;3233 22nd St<br/>
            <strong>Hours:</strong>&nbsp;10 a.m.-9 p.m. Monday,
            Wednesday-Sunday. Closed Tuesday
            (see also our <b-link :to="{ name: 'calendar' }">calendar</b-link>).</p>

        <iframe width="100%" height="450" frameborder="0" style="border:0"
                :src=maps.src
                allowfullscreen></iframe>
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
  metaInfo: {
    title: 'Location & Hours',
  },
};
</script>
