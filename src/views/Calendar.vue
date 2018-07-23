<template>
    <div class="container section">
        <h2>Calendar</h2>
        <div class="row justify-content-center">
            <FullCalendar :events=events :config=config />
        </div>
    </div>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar';
import * as misc from '../graphql/misc';

export default {
  data() {
    return {
      calendar_events: [],
      config: {
        defaultView: 'month',
        height: 'auto',
      },
    };
  },
  computed: {
    events() {
      return this
        .calendar_events
        .map(e => ({ ...e, url: `#/event/${e.id}` }));
    },
  },
  apollo: {
    calendar_events: misc.query.calendar_events,
  },
  components: {
    FullCalendar,
  },
};
</script>

<style lang="scss">
@import '~fullcalendar/dist/fullcalendar.css';
</style>
