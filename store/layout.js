export const state = () => ({
  kiosk: false,
  show: {
    signIn: true,
    footer: true,
  },
  load: {
    drift: true,
  },
})
export const mutations = {
  setKiosk(state, newValue) {
    state.kiosk = newValue;
  },
  setShow(state, prop) {
    state.show[prop] = true;
  },
  setHide(state, prop) {
    state.show[prop] = false;
  },
  setLoad(state, prop) {
    state.load[prop] = true;
  },
  setNoload(state, prop) {
    state.load[prop] = false;
  },
}
