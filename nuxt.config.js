const pkg = require('./package')
require('dotenv').config()

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Page',
    titleTemplate: '%s | Tinker Kitchen',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//use.typekit.net/uod5pmy.css' },
      { rel: 'stylesheet', href: '//use.fontawesome.com/releases/v5.1.0/css/all.css',
        integrity: 'sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt',
        crossorigin: 'anonymous' },
    ],
    script: [
      { src: '/fbpixel.js' }
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/app.scss',
    'open-iconic/font/css/open-iconic-bootstrap.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vue2-filters',
    { src: '~/plugins/stripe-checkout', ssr: false },
    { src: '~/plugins/vuex-persist.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/apollo',
    '@nuxtjs/dotenv',
    ['@nuxtjs/google-analytics', { id: 'UA-12301-2' }],
    '@nuxtjs/sentry',
  ],

  'google-analytics': {
    id: 'UA-54365170-1',
    debug: {
      sendHitTask: process.env.VUE_APP_ENV === 'production',
    },
  },

  sentry: {
    dsn: 'https://e1a5f7ca830c44aabe1a3f27401b8a99@sentry.io/1374131',
    config: {},
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (ctx.isClient) {
        config.devtool = '#source-map';
      }
    },
  },

  apollo: {
    includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
    authenticationType: 'Bearer', // optional, default: 'Bearer'
    clientConfigs: {
      default: {
        httpEndpoint: process.env.VUE_APP_GRAPHQL_HTTP,
        wsEndpoint: null,
      },
    }
  },

  router: {
    scrollBehavior (to, from, savedPosition) {
      // if the returned position is falsy or an empty object,
      // will retain current scroll position.
      let position = false

      // if no children detected
      if (to.matched.length < 2) {
        // scroll to the top of the page
        position = { x: 0, y: 0 }
      } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
        // if one of the children has scrollToTop option set to true
        position = { x: 0, y: 0 }
      }

      // savedPosition is only available for popstate navigations (back button)
      if (savedPosition) {
        position = savedPosition
      }

      return new Promise(resolve => {
        // wait for the out transition to complete (if necessary)
        // view https://github.com/nuxt/nuxt.js/issues/2738
        /*
          window.$nuxt.$once('triggerScroll', () => {
          // coords will be used if no selector is provided,
          // or if the selector didn't match any element.
          if (to.hash && document.querySelector(to.hash)) {
          // scroll to anchor by returning the selector
          position = { selector: to.hash }
          }
          resolve(position)
          })
        */
        resolve(position)
      })
    },
  },
}
