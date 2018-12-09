<template>
    <div v-if="$apollo.loading" class="loading"><h3>Loading...</h3></div>
    <div v-else class="container section">
        <b-link :to="{ name: 'classes' }">&lt; Back to class list</b-link>

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
                                  variant="primary">Book this class</b-button>
                        <div v-if="show_member_discount">
                            Member discount code: {{ calendar_event.ext_member_discount_code }}
                        </div>
                    </div>
                    <div v-else>
                        <RequireSignInForm next_action="tk::event::book">
                            <b-form class="booking_form" inline>
                                <b-form-input id="how_many"
                                              v-model="how_many" type="number"></b-form-input>
                                <b-button variant="primary"
                                          @click="book()">Add to Cart</b-button>
                            </b-form>
                        </RequireSignInForm>
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
import RequireSignInForm from '@/components/RequireSignInForm.vue';
import * as auth from '@/graphql/auth';
import * as misc from '@/graphql/misc';
import * as kv from '@/lib/keyVal';
import * as format from '@/lib/format';

export default {
  data() {
    return {
      calendar_event: {},
      me: '',
      how_many: 1,
    };
  },
  mounted() {
    this.$root.$on('tk::event::book', this.book);
  },
  computed: {
    member() {
      return this.me.is_member || this.me.is_free_member;
    },
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
      if (this.me &&
          (this.me.is_member || this.me.is_free_member) &&
          this.calendar_event.ext_member_discount_code) {
        return true;
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
    RequireSignInForm,
    VueMarkdown,
  },
  methods: {
    formatPrice(p) {
      return format.priceWhole(p);
    },
    book() {
      const event = this.calendar_event;
      const qty = parseInt(this.how_many, 10);
      let discount = 0;

      // is this a free event?
      // fixme: track user going to this free event (!)
      if (!event.price) {
        window.fbq('track', 'AddToCart', { value: 0, currency: 'USD' });
        this.$refs.bookingSuccessModalRef.show();
        return;
      }

      // current user is a member, and there is a discount available
      if (this.member && (event.price !== event.member_price)) {
        discount = event.price - event.member_price;
      }

      window.fbq('track', 'AddToCart', {
        value: (event.price - discount) / 100,
        currency: 'USD',
      });

      const items = [{
        id: `sku:${event.sku.id}`,
        sku: event.sku.id,
        quantity: qty,
        title: event.title,
        amount_each: event.price,
      }];
      if (discount) {
        items.push({
          id: `discount:${event.sku.id}`,
          type: 'discount',
          quantity: qty,
          title: 'Member discount',
          amount_each: discount,
        });
      }

      this.$root.$emit('tk::pay-modal::add', items);
      this.$root.$emit('tk::pay-modal::open');
      this.$root.$on('tk::pay-modal::complete', this.payComplete);
    },
    payComplete() {
      this.$refs.bookingSuccessModalRef.show();
    },
  },
  metaInfo() {
    return {
      title: this.calendar_event.title,
    };
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
.booking_form {
    input {
        margin-right: .5em;
        max-width: 4em;
    }
}
</style>
