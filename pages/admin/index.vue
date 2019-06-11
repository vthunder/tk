<template>
  <div v-if="$apollo.loading" class="loading"><h3>Loading...</h3></div>
  <div v-else class="container section">
    <AdminPage>
      <div class="tab-pane fade show active" role="tabpanel">
        <ul>
          <li><strong>Members:</strong>&nbsp;
            {{ admin_stats.num_members }}</li>
          <li><strong>Paying members:</strong>&nbsp;
            {{ admin_stats.num_paying_members }}</li>
          <li><strong>Coupon members:</strong>&nbsp;
            {{ admin_stats.num_coupon_members }}</li>
          <li><strong>Upcoming events:</strong>&nbsp;
            {{ admin_stats.num_events }}</li>
          <li><strong>Event bookings:</strong>&nbsp;
            {{ admin_stats.num_event_bookings }}</li>
        </ul>
      </div>
      <h3 class="mt-4">Checkins:</h3>
      <b-table :items="checkin_items" :fields="checkin_table_fields" striped hover />
    </AdminPage>
  </div>
</template>

<script>
import AdminPage from '@/components/AdminPage.vue';
import * as auth from '@/graphql/auth';
import * as admin from '@/graphql/admin';

export default {
  components: {
    AdminPage,
  },
  data() {
    return {
      me: {},
      admin_stats: {},
      admin_list_checkins: [],
      checkin_table_fields: ['name', 'email', 'user_type', 'date'],
    };
  },
  apollo: {
    me: {
      query: auth.query.me,
      update(data) {
        if (data.me) return data.me;
        return {};
      },
    },
    admin_stats: {
      query: admin.query.admin_stats,
      update(data) {
        if (data.admin_stats) return data.admin_stats;
        return {};
      },
    },
    admin_list_checkins: {
      query: admin.query.admin_list_checkins,
      update(data) {
        if (data.admin_list_checkins) return data.admin_list_checkins;
        return [];
      },
    },
  },
  computed: {
    checkin_items() {
      return this.admin_list_checkins;
    },
  },
  methods: {
  },
};
</script>

<style lang="scss">
.loading { height: 100vh; }
</style>
