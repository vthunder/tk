<template>
  <div class="container section">
    <b-row class="mt-2">
      <b-col md="7">
        <b-img v-if="event.image_header" :src="event.image_header" fluid />
        <h1 class="text-left">{{ event.title }}</h1>
        <div class="event-description mt-4">
          <vue-markdown :source="event.description" />
        </div>
      </b-col>
      <b-col md="5" class="border-left">
        <div v-if="event.category && event.category === 'private'">
          <h3>Private event</h3>
          <p>
            <strong>{{ private_date }}</strong><br>
            {{ private_start }} - {{ private_end }}
          </p>
        </div>
        <div v-else>
          <h4 v-if="event.price === 0" class="price">Price: Free!</h4>
          <!-- null / otherwise falsy, hide price altogether -->
          <h4 v-else-if="!event.price" class="price" />
          <h4 v-else class="price">
            Price: {{ formatPrice(event.price) }}
            <span v-if="event.member_price">
              &nbsp;(members: {{ formatPrice(event.member_price) }})
            </span>
          </h4>
          <vue-markdown v-if="event.sidebar_pre_text" :source="event.sidebar_pre_text" />
          <div v-if="event_opts.length">
            <b-form-select v-model="which_event" :options="event_opts" />
            <div v-if="event.ext_book_url">
              <b-button
                :href="event.ext_book_url"
                variant="primary">{{ book_event_label }}</b-button>
              <div v-if="show_member_discount">
                Member discount code: {{ event.ext_member_discount_code }}
              </div>
            </div>
            <div v-else>
              <b-form v-if="event.status === 'open'" class="booking_form" inline>
                <b-form-select v-model="how_many" :options="num_options" />
                <b-button variant="primary" @click="book()">{{ book_event_label }}</b-button>
              </b-form>
              <div v-if="event.status === 'soldout'">
                <h4 class="mt-3">Sorry, this date is sold out!</h4>
              </div>
            </div>
          </div>
          <vue-markdown
            v-if="event.sidebar_post_text"
            :source="event.sidebar_post_text"
            class="mt-3" />
          <div v-if="event.show_interested">
            <div v-if="interested_success" class="mt-2">
              <p>
                Thanks! We'll let you know when we schedule
                this class.</p>
            </div>
            <div v-else>
              <div v-if="event_opts.length" class="mt-4">
                <div v-if="event.status === 'soldout'">
                  <p>
                    Choose a different date, or sign up below and
                    we'll let you know when we add new dates to the
                    schedule.</p>
                </div>
                <div v-else>
                  <h4>None of these dates work?</h4>
                  <p>
                    Sign up below and we'll let you know
                    when we add new dates to the schedule!</p>
                </div>
              </div>
              <div v-else>
                <h3>Interested?</h3>
                <p>
                  Sign up below and we'll let you know
                  when it's back on the schedule!</p>
              </div>
              <b-form class="my-2" inline>
                <b-input
                  v-model="interested_email"
                  type="email"
                  placeholder="email@example.com" />
                <b-button
                  class="ml-1"
                  @click.prevent="interested()">Let me know</b-button>
              </b-form>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-modal v-model="success_modal" title="Success!" centered ok-only>
      <p>Hooray! Your booking is confirmed.</p>
      <p>
        You'll get a confirmation email, bring it and show
        Tinker Kitchen staff to get in.</p>
      <p>Looking forward to cooking with you!</p>
    </b-modal>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import moment from 'moment';
  import VueMarkdown from 'vue-markdown';
  import * as auth from '@/graphql/auth';
  import * as misc from '@/graphql/misc';
  import * as format from '@/lib/format';

  export default {
    apollo: {
      calendar_events: {
        query: misc.query.calendar_events,
        variables() {
          return { slug: this.$route.params.slug }
        },
        update(data) {
          if (!this.which_event &&
              data.calendar_events &&
              data.calendar_events.length) {
            this.which_event = data.calendar_events[0].id; // fixme
          }
          return data.calendar_events;
        },
      },
      me: {
        query: auth.query.me,
        update(data) {
          if (data.me) {
            this.interested_email = data.me.email;
            return data.me;
          }
          return null;
        },
      },
    },
    components: {
      VueMarkdown,
    },
    async asyncData({ app, route, store }) {
      const { data } = await app.apolloProvider.defaultClient.query({
        query: misc.query.calendar_events,
        variables: { slug: route.params.slug },
        update: data => data.calendar_events,
      });
      return { calendar_events: data.calendar_events };
    },
    data() {
      return {
        calendar_events: [],
        me: '',
        how_many: 1,
        num_options: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' },
        ],
        success_modal: false,
        interested_email: '',
        interested_success: false,
        which_event: null,
      };
    },
    computed: {
      private_date() {
        return moment.utc(this.event.start).format('dddd MMMM Do');
      },
      private_start() {
        return moment.utc(this.event.start).format('h:mm a');
      },
      private_end() {
        return moment.utc(this.event.start).add(this.event.duration, 'hours').format('h:mm a');
      },
      member() {
        return this.me && (this.me.is_member || this.me.is_free_member);
      },
      event_opts() {
        return (this.calendar_events||[])
          .filter(e => e.status !== 'closed')
          .map((e) => {
            // fixme: add all_day support
            const start = moment.utc(e.start).format('dddd MMMM Do h:mm a');
            const end = moment.utc(e.start).add(e.duration, 'hours').format('h:mm a');
            return {
              value: e.id,
              text: `${start} - ${end}`,
            };
          });
      },
      event() {
        const id = parseInt(this.which_event, 10);
        const event = this.calendar_events.find(e => e.id === id);
        return event || {};
      },
      show_member_discount() {
        if ((this.me.is_member || this.me.is_free_member) &&
            this.event.ext_member_discount_code) {
          return true;
        }
        return false;
      },
      book_event_label() {
        return this.event.book_event_label || 'Add to Cart';
      },
    },
    watch: {
      '$route': 'updateSelected',
    },
    created() {
      this.updateSelected();
    },
    destroyed() {
      this.$root.$off('tk::event::book', this.book);
    },
    methods: {
      ...mapMutations('cart', ['add']),

      updateSelected() {
        this.which_event = this.$route.query.id;
      },

      formatPrice(p) {
        return format.priceWhole(p);
      },
      book() {
        const qty = parseInt(this.how_many, 10);
        let discount = 0;

        // is this a free event?
        // fixme: track user going to this free event (!)
        if (!this.event.price) {
          this.$fb.track('AddToCart', { value: 0, currency: 'USD' });
          this.success_modal = true;
          return;
        }

        // current user is a member, and there is a discount available
        if (this.member && (this.event.price !== this.event.member_price)) {
          discount = this.event.price - this.event.member_price;
        }

        this.$fb.track('AddToCart', {
          value: (this.event.price - discount) / 100,
          currency: 'USD',
        });

        const items = [{
          id: `sku:${this.event.sku_id}`,
          type: 'sku',
          sku: this.event.sku_id,
          quantity: qty,
          title: this.event.title,
          subtitle: moment.utc(this.event.start).format('dddd MMMM Do h:mm a'),
          amount_each: this.event.price,
        }];
        if (discount) {
          items.push({
            id: `discount:${this.event.sku_id}`,
            type: 'discount',
            discount_for: [`sku:${this.event.sku_id}`],
            discount_per: 'order',
            title: 'Member event discount',
            amount_each: discount,
          });
        }

        this.add(items);
        this.$root.$on('tk::checkout::complete', this.payComplete);
        this.$router.push({ name: 'cart' });
      },
      payComplete() {
        this.success_modal = true;
      },
      async interested() {
        const { data: { class_interest: ret } } = await this.$apollo.mutate({
          mutation: misc.mutation.class_interest,
          variables: { email: this.interested_email, master_id: this.event.master_id },
        });
        if (ret === 'OK') this.interested_success = true;
      },
    },
    head() {
      return {
        title: this.event.title,
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
    font-weight: 300;
  }
  .event-description {
    img { width: 100%; }
  }
  .booking_form {
    select {
      margin: .5em .5em .5em 0;
      max-width: 4em;
    }
  }
</style>
