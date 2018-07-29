<template>
    <div v-if="$apollo.loading" class="loading"><h3>Loading...</h3></div>
    <div v-else class="container section">
        <b-link :to="{ name: 'calendar' }">&lt; Back to calendar</b-link>
        <div class="row mt-2">
            <div class="col-md-8">
                <h2 class="text-left">{{ calendar_event.title }}</h2>
                <h3>{{ date }}</h3>
                <h3>{{ start_time }}</h3>
                <h3 v-if="calendar_event.all_day">Duration: All day</h3>
                <h3 v-else-if="calendar_event.duration">
                    Duration: {{ calendar_event.duration }}
                </h3>

                <p class="event-description mt-4">
                    <vue-markdown :source="calendar_event.description"></vue-markdown>
                </p>
            </div>
            <div class="col-md-4 border p-4">
                <p v-if="calendar_event.category && calendar_event.category === 'private'">
                    Private event.
                </p>
                <div v-else>
                    <div class="price">
                        Price: {{ formatPrice(calendar_event.price) }}
                    </div>
                    <div v-if="calendar_event.member_price" class="price mb-2">
                        Member price: {{ formatPrice(calendar_event.member_price) }}
                    </div>
                    <div v-if="me">
                        <button class="btn btn-primary">Book Event</button>
                        <!--
                        @if (Auth::user()->subscribed("membership"))
                            <div>Member discount applied.</div>
                        @else
                            <div class="mt-2">Did you know? Members get discounts on all events.
                                <b-link to="learn-membership">Learn more</b-link>.</div>
                            @endif
                             -->
                    </div>
                    <div v-else><b-button v-b-modal.auth-modal>Sign in
                        <i class="fas fa-sign-in-alt"></i></b-button>
                        to book this event.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import VueMarkdown from 'vue-markdown';
import * as auth from '../graphql/auth';
import * as misc from '../graphql/misc';

export default {
  data() {
    return {
      calendar_event: {},
      me: '',
    };
  },
  computed: {
    date() {
      console.log(this.calendar_event);
      return moment(this.calendar_event.start)
        .format('dddd MMMM Do');
    },
    start_time() {
      return moment(this.calendar_event.start)
        .format('h:mm a');
    },
    end_time() {
      return moment(this.calendar_event.start)
        .add(this.calendar_event.duration, 'hours')
        .format('h:mm a');
    },
  },
  apollo: {
    calendar_event: {
      query: misc.query.calendar_event,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
    },
    me: {
      query: auth.query.me,
      update(data) {
        if (data.me) return data.me;
        return null;
      },
    },
  },
  components: {
    VueMarkdown,
  },
  methods: {
    formatPrice(p) {
      return `$${p / 100}`;
    },
  },
};
</script>

<style lang="scss">
.loading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    h3 {
        text-align: center;
    }
}
.price {
    font-weight: bold;
}
</style>
