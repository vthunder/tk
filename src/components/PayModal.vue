<template>
    <b-modal id="pay-modal" ref="payModal"
             title="Confirm" ok-title="Pay Now" centered
             @ok.prevent=onSubmit @hide=onReset>

        <b-alert :show=showAlert variant="danger">{{ alertMessage }}</b-alert>

        <p v-if=default_card>
            Using saved card: {{ defaultCard.brand }} ending in {{ defaultCard.last4 }}
        </p>

        <table class="table">
            <tbody>
                <tr>
                    <th scope="col">Item</th>
                    <td class="modal-body-item"></td>
                </tr>
                <tr>
                    <th scope="col">Quantity</th>
                    <td class="modal-body-quantity">
                        <select>
                            <option v-for="n in [1,2,3,4,5]"
                                    :key=n :value=n>{{ n }}</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th class="modal-body-total-header" scope="col">Total</th>
                    <td class="modal-body-total"></td>
                </tr>
            </tbody>
        </table>

        <div class="modal-footer">
            <!-- <b-button v-if=default_card data-dismiss="modal">Use Different Card</b-button> -->
            <!-- <b-button data-dismiss="modal">Pay Now</b-button> -->
        </div>
    </b-modal>
</template>

<script>
import * as misc from '../graphql/misc';

export default {
  data() {
    return {
      showAlert: false,
      saved_cards: [],
      alertMessage: 'Error!',
      data: { foo: 'boo' },
    };
  },
  computed: {
    default_card() {
      return this.saved_cards.find(() => true);
    },
  },
  mounted() {
    this.$root.$on('tk::pay-modal::open', this.open);
    this.$root.$on('tk::pay-modal::stripe', this.stripe);
  },
  destroyed() {
    this.$root.$off('tk::pay-modal::open', this.open);
  },
  apollo: {
    saved_cards: misc.query.saved_cards,
  },
  methods: {
    open(data) {
      this.data = data;
      this.$refs.payModal.show();
    },
    stripe(data) {
      if (data) this.data = data;

      this.$apollo.mutate({
        mutation: misc.mutation.pay,
        variables: {},
      }).then(() => {
        this.$refs.payModal.hide();
      }).catch((err) => {
        console.log(`Pay error: ${err}`);
        this.showAlert = true;
      });
    },
    onReset() {
      this.showAlert = false;
      this.alertMessage = 'Error!';
    },
  },
};
</script>

<style lang="scss">
</style>
