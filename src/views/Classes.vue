<template>
    <div class="container section">
        <h1>Classes & Talks</h1>
        <b-row class="justify-content-center">
            <b-col md="12">
                <b-row>
                    <b-col v-for="event in classes" v-bind:key="event.id" md="6">
                        <b-link :to="{ name: 'event', params: { id: event.id } }"
                                class="card-link">
                            <b-card :title="event.title"
                                    :sub-title="event.date"
                                    :img-src="event.image_header"
                                    img-top
                                    class="class-card">
                                <p>{{ event.short_description }}</p>
                                <p class="price">{{ event.disp_price }}<br>
                                    <span class="perperson">/person</span></p>
                            </b-card>
                        </b-link>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import moment from 'moment';
import * as misc from '@/graphql/misc';
import * as format from '@/lib/format';
import * as evhelpers from '@/lib/calendar_events';

export default {
  apollo: {
    calendar_events: misc.query.calendar_events,
  },
  components: {
  },
  computed: {
    classes() {
      return this
        .calendar_events
        .filter(e => (e.category === 'class' || e.category === 'talk'))
        .filter(e => moment(e.start).isAfter())
        .sort((a, b) => (moment(a.start).isAfter(moment(b.start)) ? 1 : -1))
        .map(e => ({
          ...e,
          short_description: this.ellipsis(e.description, 110),
          date: moment(e.start).format('dddd, MMMM Do YYYY, h a'),
          disp_price: format.priceWhole(e.price),
          disp_member_price: format.priceWhole(e.member_price),
        }));
    },
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
            displayEventTime: false,
          },
        },
      },
    };
  },
  methods: {
    ellipsis(string, max = 110) {
      if (string.length > max) {
        return `${string.substring(0, max)} [...]`;
      }
      return string;
    },
  },
  metaInfo: {
    title: 'Upcoming Classes',
  },
};
</script>

<style lang="scss">
.class-card {
    margin-bottom: 2em;

    .card-title {
        font-weight: 700;
    }
    p {
        margin-top: 2em;
    }
    p.price {
        margin-top: 1em;
        font-size: 1.25rem;
        font-weight: 300;
        line-height: 1.25rem;
        text-align: right;
        .perperson {
            font-size: 1rem;
        }
    }
}
</style>
