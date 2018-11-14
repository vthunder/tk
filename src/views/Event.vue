<template>
    <div v-if="$apollo.loading" class="loading"><h3>Loading...</h3></div>
    <div v-else class="container section">
        <b-link :to="{ name: 'calendar' }">&lt; Back to calendar</b-link>

        <div class="row mt-2">
            <div class="col-md-8">
                <b-img v-if="calendar_event.image_header"
                       :src=calendar_event.image_header fluid />

                <h1 class="text-left">{{ calendar_event.title }}</h1>
                <p class="event-description mt-4">
                    <vue-markdown :source="calendar_event.description"></vue-markdown>
                </p>
            </div>
            <div class="col-md-4 border-left p-4">
                <h3>{{ date }}</h3>
                <h5><strong>{{ start_time }}</strong>,
                    <strong v-if="calendar_event.all_day">all day</strong>
                    <strong v-else-if="calendar_event.duration">
                        {{ calendar_event.duration }}h long
                    </strong>
                </h5>
                <h5 v-if="calendar_event.category && calendar_event.category === 'private'">
                    <strong>Private event.</strong>
                </h5>
                <div v-else>
                    <h5 v-if="calendar_event.price === 0">
                        <strong>Price: Free!</strong>
                    </h5>
                    <h5 v-else-if="!calendar_event.price">
                        <!-- null / otherwise falsy, hide price altogether -->
                    </h5>
                    <h5 v-else>
                        <strong>Price: {{ formatPrice(calendar_event.price) }}</strong>
                        <strong v-if="calendar_event.member_sku" class="price mb-2">
                            &nbsp;(members: {{ formatPrice(calendar_event.member_price) }})
                        </strong>
                    </h5>
                    <div v-if="calendar_event.ext_book_url">
                        <b-button :href="calendar_event.ext_book_url"
                                  variant="primary">Book Event</b-button>
                        <div v-if="show_member_discount">
                            Member discount code: {{ calendar_event.ext_member_discount_code }}
                        </div>
                    </div>
                    <div v-else>
                        <div v-if="me">
                            <b-button variant="primary"
                                      @click="book()">Book Event</b-button>
                        </div>
                        <div v-else>
                            <b-button variant="primary"
                                      v-b-modal.auth-modal>Sign in</b-button> to Book Event
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal id="booking-success-modal" ref="bookingSuccessModalRef"
                 title="Success!" centered ok-only>
            <p>Hooray! Your booking is confirmed.</p>
            <p>You'll get a confirmation email, bring it and show
                Tinker Kitchen staff to get in.</p>
            <p>Looking forward to cooking with you!</p>
        </b-modal>
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
    show_member_discount() {
      if (!this.me) return false;
      if (this.me.is_member || this.me.is_free_member) {
        return this.calendar_event.ext_member_discount_code;
      }
      return false;
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
      if ((this.me.is_member || this.me.is_free_member) && this.calendar_event.member_sku) {
        sku = this.calendar_event.member_sku;
        if (!sku.attributes) sku.attributes = {};
        sku.attributes.title = this.calendar_event.title;
      }
      this.$root.$emit('tk::pay-modal::open', [sku]);
      this.$root.$on('tk::pay-modal::complete', this.payComplete);
    },
    payComplete() {
      this.$refs.bookingSuccessModalRef.show();
    },
  },
  metaInfo: {
    title: 'Event',
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
