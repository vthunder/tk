export const state = () => ({
  show: {
    signIn: true,
    footer: true,
  },
  load: {
    drift: true,
  },
})
export const mutations = {
  set_show(state, prop) {
    state.show[prop] = true;
  },
  set_hide(state, prop) {
    state.show[prop] = false;
  },
  set_load(state, prop) {
    state.load[prop] = true;
  },
  set_noload(state, prop) {
    state.load[prop] = false;
  },
}
