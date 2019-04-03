var VuexPersistence = require('vuex-persist/dist/umd/index.js').VuexPersistence;

export default ({store}) => {
  window.onNuxtReady(() => {
    return new VuexPersistence({
      /* your options */
    }).plugin(store);
  });
}
