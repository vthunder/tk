import * as moment from 'moment';

export const state = () => ({
  qrData: {},
  userData: {
    name: null,
    childName: null,
    email: null,
    userType: null,
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
  setChildName(state, name) {
    state.userData.childName = name;
  },
  setEmail(state, email) {
    state.userData.email = email;
  },
  setUserType(state, type) {
    state.userData.userType = type;
  },
  setAddToMailingList(state, bool) {
    state.userData.addToMailingList = bool;
  },
  setAgreedToTerms(state, terms) {
    state.userData.agreedToTerms[terms] = moment().utc().format("YYYY-MM-DD HH:mm:ss");
  },
  clearUserData(state) {
    state.userData = {
      name: null,
      email: null,
      userType: null,
      addToMailingList: null,
      agreedToTerms: {},
    };
  },
}
