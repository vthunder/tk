<template>
  <div class="container section">
    <b-row class="justify-content-center">
      <b-col lg="12">
        <no-ssr>
          <full-calendar :event-sources="events" :config="config" @day-click="dayClick" />
        </no-ssr>
        <b-card>
          <b-row align-v="center">
            <b-col sm="6">
              <h5>Click on a date to make a reservation.</h5>
              <div>Open Hours: 10am-9pm Wed-Mon (closed Tue)</div>
            </b-col>
            <b-col sm="6" class="text-right">
              Add to your calendar:
              <b-btn href="/ical" class="mr-2">iCal (all events)</b-btn>
              <b-btn href="/ical/closed">iCal (TK closed)</b-btn>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-modal
      id="book-modal" ref="bookModal"
      :ok-disabled="modalOkDisabled"
      size="lg"
      title="Make a Reservation"
      ok-title="Request Booking"
      centered
      @ok="requestBooking" @hide="resetBooking">
      <b-card no-body>
        <b-tabs ref="bookModalTabs" v-model="tabIndex" card>
          <b-tab title="Private Event" active>
            <b-form-group label="Date & Time" horizontal>
              <div class="mt-2">{{ bookingDateStr }}</div>
              <b-form-radio-group
                v-model="selectedBookingTime"
                :options="bookingTimeOptions"
                button-variant="outline-secondary"
                buttons
              /> (select one)
            </b-form-group>
            <b-form-group
              label="Name:"
              label-cols-sm="8"
              label-align-sm="right"
              class="mt-2" horizontal>
              <b-input v-model="name" />
            </b-form-group>
            <b-form-group
              label="Email:"
              label-cols-sm="8"
              label-align-sm="right"
              class="mt-2" horizontal>
              <b-input v-model="email" />
            </b-form-group>
            <div v-if="privateEventEstimate">Price: {{ privateEventEstimateStr }}</div>
          </b-tab>
          <b-tab title="Teach a Class">
            <b-form-group label="Date & Time" horizontal>
              <div class="mt-2">{{ bookingDateStr }}</div>
              <b-form-radio-group
                v-model="selectedBookingTime"
                :options="bookingTimeOptions"
                button-variant="outline-secondary"
                buttons
              /> (select one)
            </b-form-group>
            <b-form-group
              label="Name:"
              label-cols-sm="8"
              label-align-sm="right"
              class="mt-2" horizontal>
              <b-input v-model="name" />
            </b-form-group>
            <b-form-group
              label="Email:"
              label-cols-sm="8"
              label-align-sm="right"
              class="mt-2" horizontal>
              <b-input v-model="email" />
            </b-form-group>
            <b-form-group
              label="Class info:<br>(topic, price, etc)"
              label-cols-sm="8"
              label-align-sm="right"
              class="mt-2" horizontal>
              <b-form-textarea v-model="classInfo" rows="3" />
            </b-form-group>
            <p>
              Read our <b-link href="https://docs.google.com/document/d/15X3lgjmMvnN2IFoZKrFGEmceOEtd2QMTakMIg2-cK9k/edit#">Teacher Manual</b-link> for all our policies and info
              on teaching classes at Tinker Kitchen.
            </p>
          </b-tab>
          <b-tab title="Dinner Party">
            <b-form-group label="Date & Time" horizontal>
              <div class="mt-2">{{ bookingDateStr }}</div>
              <b-form-radio-group
                v-model="selectedBookingTime"
                :options="bookingTimeOptions"
                button-variant="outline-secondary"
                buttons
              /> (select one)
            </b-form-group>
            <h5>Number of guests</h5>
            <b-form-group
              label="Dining ($10):"
              label-cols-sm="8"
              label-align-sm="right"
              class="mt-2" horizontal>
              <b-select v-model="diningGuests" :options="diningGuestOptions" />
            </b-form-group>
            <b-form-group
              label="Cooking/Dining ($25):"
              label-cols-sm="8"
              label-align-sm="right"
              class="mt-2" horizontal>
              <b-select v-model="kitchenGuests" :options="kitchenGuestOptions" />
            </b-form-group>
            <div class="mt-2 text-center">
              Party size: {{ diningGuests + kitchenGuests + 1 }} (including you +1).
              Cost: {{ dinnerPartyEstimateStr }}
            </div>
            <h5 v-if="!me || !me.is_member_eq" class="mt-2 text-center">
              Dinner parties are a member perk! <nuxt-link :to="{ name: 'membership' }">
              Become a member</nuxt-link> to reserve one.
            </h5>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-modal>
  </div>
</template>

<script>
  import * as _ from 'lodash';
  import moment from 'moment';
  import * as auth from '@/graphql/auth';
  import * as misc from '@/graphql/misc';
  import * as format from '@/lib/format';

  function eventEnd(event) {
    return moment(event.start).add(event.duration, 'hours');
  }
  function overlap(period1, period2) {
    let p1 = { start: moment(period1.start), end: eventEnd(period1) },
        p2 = { start: moment(period2.start), end: eventEnd(period2) };
    if (p1.start.isSame(p2.start) ||
        p1.start.isBetween(p2.start, p2.end) || p1.end.isBetween(p2.start, p2.end) ||
        p2.start.isBetween(p1.start, p1.end) || p2.end.isBetween(p1.start, p1.end)) {
      return true;
    }
    return false;
  }

  export default {
    apollo: {
      me: auth.query.me,
      calendar_events: misc.query.calendar_events,
    },
    data() {
      return {
        mounted: false,
        calendar_events: [],
        config: {
          businessHours: {
            dow: [ 0, 1, 3, 4, 5, 6 ], // days of week. (0=Sunday)
            start: '10:00', // 10am start time
            end: '21:00', // 9pm end time
          },
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
        tabIndex: 0,
        name: null,
        email: null,
        classInfo: null,
        bookingDate: null,
        diningGuests: null,
        kitchenGuests: 1,
        selectedBookingTime: null,
      };
    },
    computed: {
      isTeacher() {
        return false;
      },
      events() {
        return [
          {
            events: this
              .calendar_events
              .filter(e => !e.calendar_hide)
              .map((e) => {
                const evt = { ...e };

                if (!e.category.match(/^held$/)) evt.url = `/event/${e.slug}?id=${e.id}`;

                if (e.category.match(/class/)) evt.color = '#CD5828';
                else if (e.category.match(/talk/)) evt.color = '#D0AD2A';
                else if (e.category.match(/meetup/)) evt.color = '#5B3826';
                else if (e.category.match(/special/)) evt.color = '#A1C4A9';
                else if (e.category.match(/private/)) evt.color = '#000';
                else if (e.category.match(/held/)) evt.color = '#777';
                else evt.color = '#4D468F';

                return evt;
              }),
          },
        ];
      },
      bookingDateStr() {
        if (!this.bookingDate) return '';
        return this.bookingDate.format('MMMM Do YYYY');
      },
      bookingEvents() {
        if (!this.bookingDate) return [];
        const dayStart = moment(this.bookingDate).startOf('day');
        const dayEnd = moment(this.bookingDate).endOf('day');
        return this
          .calendar_events
          .filter((e) => {
            if (moment(e.start).isBetween(dayStart, dayEnd)) return true;
            if (moment(e.start).add(e.duration, 'hours')
                               .isBetween(dayStart, dayEnd)) return true;
          })
      },
      bookingBusy() {
        if (!this.bookingDate) return {};
        let date = moment(this.bookingDate);

        let busy = {};
        let busyTest = [
          { period: 'morning', start: moment(date), duration: 10 },
          { period: 'lunch', start: moment(date).add('10', 'hours'), duration: 5 },
          { period: 'dinner', start: moment(date).add('15', 'hours'), duration: 9 },
        ];
        this.bookingEvents.forEach((e) => {
          busyTest.forEach((t) => {
            if (overlap(e, t)) busy[t.period] = true;
          });
        });
        return busy;
      },
      bookingTimeOptions() {
        return [
          { text: 'Lunch (10am-3pm)', value: 'lunch' },
          { text: 'Dinner (4pm-9pm)', value: 'dinner' },
        ].map((o) => {
          if (this.bookingBusy[o.value]) return { ...o, disabled: true };
          return o;
        });
      },
      diningGuestOptions() {
        return [
          { text: '0', value: null },
          ..._.range(1, 10).map(i => ({ text: i, value: i })),
        ];
      },
      kitchenGuestOptions() {
        return [
          { text: '1', value: 1 },
          ..._.range(2, 10).map(i => ({ text: i, value: i })),
        ];
      },
      dinnerPartyEstimate() {
        let dining = parseInt(this.diningGuests, 10) || 0,
            kitchen = parseInt(this.kitchenGuests, 10) || 0;
        if (!dining && !kitchen) return 0;
        if (!kitchen) return (dining - 1) * 1000;
        return (kitchen - 1) * 2500 + dining * 1000;
      },
      dinnerPartyEstimateStr() {
        return format.priceWhole(this.dinnerPartyEstimate);
      },
      privateEventEstimate() {
        const day = moment(this.bookingDate).day();
        if (day === 0 || day === 6) return 95000; // Sat, Sun
        if (!this.selectedBookingTime) return 0;
        if (this.selectedBookingTime === 'lunch') return '95000';
        return 95000;
      },
      privateEventEstimateStr() {
        return format.priceWhole(this.privateEventEstimate);
      },
      tabCategory() {
        if (!this.mounted) return null;
        const tabs = this.$refs.bookModalTabs,
              tabName = tabs.tabs[this.tabIndex].title;
        console.log(tabName);
        if (tabName === 'Teach a Class') return 'class';
        if (tabName === 'Private Event') return 'private';
        return 'dinnerparty';
      },
      modalOkDisabled() {
        if (this.bookingDate && this.bookingDate.isBefore(moment())) return true;
        if (this.tabCategory === 'dinnerparty') return !this.me.is_member_eq;
        if (this.selectedBookingTime && this.name && this.email) return false;
        return true;
      },
    },
    mounted() {
      this.mounted = true;
    },
    methods: {
      dayClick(date, event) {
        this.bookingDate = moment(date.format('YYYY-MM-DD'));
        this.$refs.bookModal.show();
      },
      async requestBooking() {
        const ret = await this.$apollo.mutate({
          mutation: misc.mutation.create_calendar_hold,
          variables: { event_data: {
            category: this.tabCategory,
            date: moment(this.bookingDate).format('YYYY-MM-DD'),
            time: this.selectedBookingTime === 'lunch' ? '10:00:00' : '16:00:00',
            duration: 5,
            party_diners: parseInt(this.diningGuests, 10),
            party_cooks: parseInt(this.kitchenGuests, 10),
            size: parseInt(this.diningGuests, 10) + parseInt(this.kitchenGuests, 10),
            name: this.name,
            email: this.email,
            class_info: this.classInfo,
          }},
        });
        if (ret && ret.data && ret.data.create_calendar_hold === 'OK') {
          this.$apollo.queries.calendar_events.refetch();
          this.$refs.bookModal.hide();
          alert('Hold added! You\'ll hear from us soon to confirm.');
        } else {
          alert(`Something went wrong adding the calendar hold.
Please contact us at hello@tinkerkitchen.org.`);
        }
      },
      resetBooking() {
        this.tabIndex = 0;
        this.name = null;
        this.email = null;
        this.bookingDate = null;
        this.diningGuests = null;
        this.kitchenGuests = 1;
        this.selectedBookingTime = null;
      },
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
  .btn-primary.disabled {
    background-color: #6c757d;
    border-color: #6c757d;
  }
</style>
