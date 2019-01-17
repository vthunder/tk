<template>
  <div class="container section">
    <h1>Upcoming Events</h1>

    <b-row align-h="center">
      <b-col sm="6" md="4">
        <b-nav pills justified>
          <b-nav-item
            v-for="cat in categories" :key="cat"
            :active="catFilter.includes(cat)" @click="toggleCat(cat)">
            {{ cat }}
          </b-nav-item>
        </b-nav>
      </b-col>
    </b-row>

    <p v-if="!(classes.length && masters.length)">
      No matching events.
    </p>

    <b-row class="justify-content-center">
      <b-col md="12">
        <b-row>
          <b-col v-for="event in classes" :key="event.id" md="6">
            <nuxt-link
              :to="{ name: 'event-slug', params: { slug: event.slug }, query: { id: event.id } }"
              class="card-link">
              <b-card
                :title="event.title"
                :sub-title="event.date"
                :img-src="event.image_header"
                img-top
                class="class-card">
                <span class="category">{{ event.category }}</span>
                <p>{{ event.short_description }}</p>
                <p class="price">
                  {{ event.disp_price }}<br>
                  <span class="perperson">/person</span>
                </p>
              </b-card>
            </nuxt-link>
          </b-col>
        </b-row>

        <h3 v-if="masters.length">We also teach:</h3>
        <b-row>
          <b-col v-for="event in masters" :key="event.id" md="6">
            <nuxt-link
              :to="{ name: 'event-slug', params: { slug: event.slug } }"
              class="card-link">
              <b-card
                :title="event.title"
                :img-src="event.image_header"
                img-top
                class="class-card">
                <span class="category">{{ event.category }}</span>
                <p>{{ event.short_description }}</p>
                <p class="price">
                  {{ event.disp_price }}<br>
                  <span class="perperson">/person</span>
                </p>
              </b-card>
            </nuxt-link>
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

  export default {
    apollo: {
      calendar_events: misc.query.calendar_events,
      calendar_event_masters: misc.query.calendar_event_masters,
    },
    components: {
    },
    data() {
      return {
        calendar_events: [],
        calendar_event_masters: [],
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
        categories: ['class', 'talk', 'special'],
        catFilter: [],
      };
    },
    computed: {
      classes() {
        return this
          .calendar_events
          .filter(e => !this.catFilter.length || this.catFilter.includes(e.category))
          .filter(e => !e.calendar_hide)
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
      masters() {
        return this
          .calendar_event_masters
          .filter(e => e.featured)
          .filter(e => !e.calendar_hide)
          .filter(e => !this.catFilter.length || this.catFilter.includes(e.category))
          .filter(e => !this.classes.filter(c => c.master_id === e.id).length)
          .map(e => ({
            ...e,
            short_description: this.ellipsis(e.description, 110),
            disp_price: format.priceWhole(e.price),
            disp_member_price: format.priceWhole(e.member_price),
          }));
      },
    },
    methods: {
      ellipsis(string, max = 110) {
        if (string.length > max) {
          return `${string.substring(0, max)} [...]`;
        }
        return string;
      },
      toggleCat(cat) {
        if (this.catFilter.includes(cat)) {
          this.catFilter.splice(this.catFilter.indexOf(cat), 1);
        } else {
          this.catFilter.push(cat);
        }
      },
    },
    head() {
      return {
        title: 'Upcoming Classes',
      };
    },
  };
</script>

<style lang="scss">
  .class-card {
    margin-bottom: 2em;
    position: relative;

    .card-title {
      font-weight: 700;
    }
    .category {
      background-color: #000;
      color: #fff;
      position: absolute;
      padding: .25em 1em;
      right: 0;
      top: 0;
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
