<template>
  <div class="container section">
    <b-row class="justify-content-center">
      <b-col lg="9">
        <!-- eslint-disable-next-line -->
        <full-calendar :eventSources="events" :config="config" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import * as misc from '@/graphql/misc';

  export default {
    apollo: {
      calendar_events: misc.query.calendar_events,
    },
    data() {
      return {
        calendar_events: [],
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
              timeFormat: 'h(:mm)t',
            },
          },
          themeSystem: 'bootstrap4',
        },
      };
    },
    computed: {
      events() {
        return [
          {
            events: this
              .calendar_events
              .filter(e => !e.calendar_hide)
              .map((e) => {
                const evt = { ...e, url: `/event/${e.slug}?id=${e.id}` };
                if (e.category.match(/class/)) evt.color = '#CD5828';
                else if (e.category.match(/talk/)) evt.color = '#D0AD2A';
                else if (e.category.match(/meetup/)) evt.color = '#5B3826';
                else if (e.category.match(/special/)) evt.color = '#A1C4A9';
                else if (e.category.match(/private/)) evt.color = '#000';
                else evt.color = '#4D468F';
                return evt;
              }),
          },
        ];
      },
    },
    methods: {
    },
    head() {
      return {
        title: 'Calendar',
      };
    },
  };
</script>

<style lang="scss">
  @import 'fullcalendar/dist/fullcalendar.css';
  #calendar {
    width: 100%;
  }
</style>
