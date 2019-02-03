import * as _ from 'lodash';

export const state = () => ({
  qrData: {},
})

export const mutations = {
  setQrData(state, qrData) {
    state.qrData = qrData;
  },
  clearQrData(state) {
    state.qrData = {};
  },
}
