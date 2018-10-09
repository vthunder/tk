<template>
    <div v-if="$apollo.loading" class="loading"><h3>Loading...</h3></div>
    <div v-else class="container section">
        <b-link :to="{ name: 'calendar' }">&lt; Back to calendar</b-link>
        <div class="row mt-2">
            <div class="col-md-8">
                <h1 class="text-left">{{ calendar_event.title }}</h1>
                <p class="event-description mt-4">
                    <vue-markdown :source="calendar_event.description"></vue-markdown>
                </p>
            </div>
            <div class="col-md-4 border p-4">
                <h4>{{ date }}</h4>
                <h5><strong>{{ start_time }}</strong>,
                    <strong v-if="calendar_event.all_day">all day</strong>
                    <strong v-else-if="calendar_event.duration">
                        for {{ calendar_event.duration }}
                    </strong>
                </h5>
                <h5 v-if="calendar_event.category && calendar_event.category === 'private'">
                    <strong>Private event.</strong>
                </h5>
                <div v-else>
                    <h5>
                        <strong>Price: {{ formatPrice(calendar_event.sku.price) }}</strong>
                        <strong v-if="calendar_event.member_sku" class="price mb-2">
                            &nbsp;(members: {{ formatPrice(calendar_event.member_sku.price) }})
                        </strong>
                    </h5>
                    <div v-if="me">
                        <button class="btn btn-primary"
                                @click="book()">Book Event</button>
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
import * as auth from '@/graphql/auth';
import * as misc from '@/graphql/misc';
import * as kv from '@/lib/keyVal';
import * as format from '@/lib/format';

export default {
  data() {
    return {
      calendar_event: {},
      me: '',
    };
  },
  computed: {
    date() {
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
      update(data) {
        const ret = JSON.parse(JSON.stringify(data.calendar_event));
        ret.sku = kv.restoreObject(ret.sku, ['attributes', 'metadata']);
        ret.member_sku = kv.restoreObject(ret.member_sku, ['attributes', 'metadata']);
        return ret;
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
      return format.priceWhole(p);
    },
    book() {
      let { sku } = this.calendar_event;
      if (this.me.is_member && this.calendar_event.member_sku) {
        sku = this.calendar_event.member_sku;
      }
      this.$root.$emit('tk::pay-modal::open', [sku]);
      this.$root.$on('tk::pay-modal::complete', this.payComplete);
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
.event-description {
    img { width: 100%; }
}
</style>
