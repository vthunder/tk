<template>
    <div class="container section">
        <b-row class="justify-content-center">
            <b-col lg="9">
                <FullCalendar :eventSources=events :config=config />
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
      return [
        {
          events: this
            .calendar_events
            .map(e => ({ ...e, url: `/event/${e.id}` })),
        },
      ];
    },
  },
  data() {
    return {
      calendar_events: [],
      config: {
        defaultView: 'listTwoWeeks',
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'listTwoWeeks,month',
        },
        height: 'auto',
        views: {
          month: {
            displayEventTime: false,
          },
          listWeek: {
            titleFormat: 'MMM D, YYYY',
          },
          listTwoWeeks: {
            type: 'list',
            duration: { days: 14 },
            buttonText: 'list',
            titleFormat: 'MMM D, YYYY',
          },
        },
      },
    };
  },
  methods: {
  },
  metaInfo: {
    title: 'Calendar',
  },
};
</script>

<style lang="scss">
@import '~fullcalendar/dist/fullcalendar.css';
#calendar {
    width: 100%;
}
</style>
