<template>
  <div class="container section">
    <EventsCalendar/>
    <UpcomingEvents/>
  </div>
</template>

<script>
  import EventsCalendar from '~/components/EventsCalendar.vue';
  import UpcomingEvents from '~/components/UpcomingEvents.vue';

  export default {
    components: {
      EventsCalendar,
      UpcomingEvents,
    },
  };
</script>

<style lang="scss">
</style>
