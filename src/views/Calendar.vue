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
import * as evhelpers from '@/lib/calendar_events';

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
            .events
            .map(evhelpers.merge_master(this.calendar_events.masters))
            .map(e => ({ ...e, url: `/event/${e.id}` })),
        },
      ];
    },
  },
  data() {
    return {
      calendar_events: {
        events: [],
        masters: [],
      },
      config: {
        defaultView: 'month',
        header: {
          left: 'title',
          center: '',
          right: 'prev,next today',
        },
        height: 'auto',
        views: {
          month: {
            displayEventTime: false,
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
