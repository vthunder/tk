<template>
    <div class="container section">
        <h2>Calendar</h2>
        <div class="row justify-content-center">
            <FullCalendar :events=calendarEvents
                          :config=config
                          @event-selected=eventSelected />
        </div>
    </div>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar';
import * as misc from '../graphql/misc';

export default {
  data() {
    return {
      calendarEvents: [],
      config: {
      },
    };
  },
  apollo: {
    calendarEvents: misc.query.calendarEvents,
  },
  components: {
    FullCalendar,
  },
  methods: {
    eventSelected(calEvent) {
      // TODO: implement event view
      console.log(`Clicked on ${calEvent.title} (${calEvent.id})`);
    },
  },
};
</script>

<style lang="scss">
@import '~fullcalendar/dist/fullcalendar.css';
</style>
