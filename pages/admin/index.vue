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
  },
  methods: {
  },
};
</script>

<style lang="scss">
.loading { height: 100vh; }
</style>
