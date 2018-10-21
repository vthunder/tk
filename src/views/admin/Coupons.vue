<template>
    <div v-if="$apollo.loading" class="loading"><h3>Loading...</h3></div>
    <div v-else class="container section">
        <AdminPage>
            <div class="tab-pane fade show active" id="membership" role="tabpanel">
                <b-form @submit.prevent="doCreateCoupon">
                    <b-container fluid>
                        <b-row>
                            <b-col sm="3"><label for="input_type">Coupon type:</label></b-col>
                            <b-col sm="9">
                                <b-form-select id="input_type" v-model="type"
                                               :options="type_options"></b-form-select>
                            </b-col>
                        </b-row>
                        <b-row class="mt-2">
                            <b-col sm="3"><label for="input_num">How many:</label></b-col>
                            <b-col sm="9">
                                <b-form-input id="input_num" v-model="num"
                                              type="number"></b-form-input>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-form>
                <div class="text-right mr-3">
                    <b-button @click="doCreateCoupon" class="mt-2">Create</b-button>
                </div>
            </div>
        </AdminPage>
        <b-modal id="coupon-modal" ref="couponModalRef" title="Coupon codes" centered ok-only>
            <p>Generated codes:</p>
            <ul>
                <li v-for="code in generated" :key="code">
                    {{ code }}
                </li>
            </ul>
        </b-modal>
    </div>
</template>

<script>
import AdminPage from '@/components/AdminPage.vue';
import * as auth from '@/graphql/auth';

export default {
  data() {
    return {
      me: {},
      num: 1,
      type: 'ks_month',
      type_options: [
        { value: 'ks_month', text: 'Kickstarter - 1 month' },
        { value: 'ks_year', text: 'Kickstarter - 1 year' },
        { value: 'staff', text: 'Staff - 1 month' },
      ],
      generated: [],
    };
  },
  computed: {
  },
  apollo: {
    me: auth.query.me,
  },
  components: {
    AdminPage,
  },
  methods: {
    doCreateCoupon() {
      this.$refs.couponModalRef.show();
    },
  },
};
</script>

<style lang="scss">
.loading { height: 100vh; }
</style>
