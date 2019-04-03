import VuexPersistence from 'vuex-persist'

export default ({store}) => {
  window.onNuxtReady(() => {
    return new VuexPersistence({
      /* your options */
    }).plugin(store);
  });
}
