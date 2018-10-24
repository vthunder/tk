<template>
    <div class="container section">
        <b-row class="justify-content-center">
            <b-col lg="9">
                <FullCalendar :events=events :config=config />
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar';
import * as misc from '../graphql/misc';

export default {
  apollo: {
    calendar_events: misc.query.calendar_events,
  },
  components: {
    FullCalendar,
  },
  computed: {
    events() {
      return this
        .calendar_events
        .map(e => ({ ...e, url: `/event/${e.id}` }));
    },
  },
  data() {
    return {
      calendar_events: [],
      config: {
        defaultView: 'listWeek',
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'listWeek,month',
        },
        height: 'auto',
        views: {
          month: {
            displayEventTime: false,
          },
          listWeek: {
            titleFormat: 'MMM D, YYYY',
          },
        },
      },
    };
  },
};
</script>

<style lang="scss">
@import '~fullcalendar/dist/fullcalendar.css';
#calendar {
    width: 100%;
}
</style>
