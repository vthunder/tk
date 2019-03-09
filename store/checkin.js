import * as moment from 'moment';

export const state = () => ({
  qrData: {},
  userData: {
    name: null,
    email: null,
    addToMailingList: null,
    agreedToTerms: {},
  },
})

export const mutations = {
  setQrData(state, qrData) {
    state.qrData = qrData;
  },
  clearQrData(state) {
    state.qrData = {};
  },
  setName(state, name) {
    state.userData.name = name;
  },
  setEmail(state, email) {
    state.userData.email = email;
  },
  setAddToMailingList(state, bool) {
    state.userData.addToMailingList = bool;
  },
  setAgreedToTerms(state, terms) {
    state.userData.agreedToTerms[terms] = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
  },
  clearUserData(state) {
    state.userData = {
      name: null,
      email: null,
      addToMailingList: null,
      agreedToTerms: {},
    };
  },
}
