<template>
    <div v-if="$apollo.loading" class="loading"><h3>Loading...</h3></div>
    <div v-else class="container section">
        <AdminPage>
            <div class="tab-pane fade show active" id="admin-event" role="tabpanel">
                <h3>New Event:</h3>
                <b-form id="new_event_form" @submit.prevent="doNewEvent">
                    <b-container fluid>
                        <b-row>
                            <b-col sm="3"><label for="input_title">Title:</label></b-col>
                            <b-col sm="9">
                                <b-form-input id="input_title" v-model="event.title"
                                              type="text"></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="3"><label for="input_category">Category:</label></b-col>
                            <b-col sm="9">
                                <b-form-select id="input_category" v-model="event.category"
                                               :options="category_options"></b-form-select>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="3"><label for="input_date">Date:</label></b-col>
                            <b-col sm="9">
                                <b-form-input id="input_date" v-model="event.date"
                                              type="date"></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="3"><label for="input_time">Time:</label></b-col>
                            <b-col sm="9">
                                <b-form-input id="input_time" v-model="event.time"
                                              type="time"></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="3">
                                <label for="input_duration">Duration (hrs):</label>
                            </b-col>
                            <b-col sm="9">
                                <b-form-input id="input_duration" v-model="event.duration"
                                              type="number"></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="3"><label for="input_price">Price:</label></b-col>
                            <b-col sm="9">
                                <b-form-select id="input_price"
                                               v-model="event.sku_id"
                                               @change="onEventPriceChanged"
                                               :options="price_options"></b-form-select>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="3">
                                <label for="input_price_member">Price (member):</label>
                            </b-col>
                            <b-col sm="9">
                                <b-form-select id="input_price_member"
                                               v-model="event.member_sku_id"
                                               :options="price_member_options"></b-form-select>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="3">
                                <label for="input_image_header">Header Image:</label>
                            </b-col>
                            <b-col sm="9">
                                <b-form-file v-model="event.image_header_file"
                                             :state="Boolean(event.image_header_file)"
                                             placeholder="Choose a file..."></b-form-file>
                                <div class="mt-3">Selected file:
                                    {{event.image_header_file && event.image_header_file.name}}
                                </div>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="3"><label for="input_description">Description:</label><br>
                                <b-link href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">Formatting help</b-link>
                            </b-col>
                            <b-col sm="9">
                                <b-form-textarea id="input_description"
                                                 v-model="event.description"
                                                 rows="6"></b-form-textarea>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-form>
                <div class="text-right mr-3">
                    <b-button @click="doNewEvent" class="mt-2">Make New Event</b-button>
                </div>
            </div>
        </AdminPage>
        <b-modal id="new-event-modal" ref="newEventModalRef"
                 title="Event Creation" centered ok-only>
            <p v-if="createdEventOk">New event created! It's on the calendar now.</p>
            <p v-else>Oops, something went wrong. Contact Dan for help!</p>
        </b-modal>
    </div>
</template>

<script>
import AdminPage from '@/components/AdminPage.vue';
import * as auth from '@/graphql/auth';
import * as misc from '@/graphql/misc';

export default {
  data() {
    return {
      event: {
        category: 'class',
        duration: 3,
        sku_id: process.env.VUE_APP_SKU_CLASS_100,
        member_sku_id: process.env.VUE_APP_SKU_MEMBER_CLASS_80,
      },
      category_options: [
        { value: 'class', text: 'Class' },
        { value: 'talk', text: 'Talk' },
        { value: 'club', text: 'Club Meeting' },
        { value: 'private', text: 'Private Event' },
      ],
      price_options: [
        { value: process.env.VUE_APP_SKU_CLASS_75, text: '$75' },
        { value: process.env.VUE_APP_SKU_CLASS_100, text: '$100' },
        { value: process.env.VUE_APP_SKU_CLASS_125, text: '$125' },
        { value: '', text: 'Free' },
      ],
      price_member_options: [
        { value: process.env.VUE_APP_SKU_MEMBER_CLASS_55, text: '$55' },
        { value: process.env.VUE_APP_SKU_MEMBER_CLASS_80, text: '$80' },

        { value: process.env.VUE_APP_SKU_MEMBER_CLASS_105, text: '$105' },
        { value: '', text: '--------' },
        { value: process.env.VUE_APP_SKU_CLASS_75, text: '$75' },
        { value: process.env.VUE_APP_SKU_CLASS_100, text: '$100' },
        { value: process.env.VUE_APP_SKU_CLASS_125, text: '$125' },
        { value: '', text: '--------' },
        { value: '', text: 'Free' },
      ],
      createdEventOk: false,
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
    async doNewEvent() {
      // eslint-disable-next-line
      const { data: { create_calendar_event: ret } } = await this.$apollo.mutate({
        mutation: misc.mutation.create_calendar_event,
        variables: { event_data: this.event },
      });

      if (ret === 'OK') this.createdEventOk = true;
      else this.createdEventOk = false;

      this.$refs.newEventModalRef.show();
    },
    onEventPriceChanged() {
    },
  },
};
</script>

<style lang="scss">
.loading { height: 100vh; }
#new_event_form {
    .row { margin-bottom: 10px; }
}
</style>
