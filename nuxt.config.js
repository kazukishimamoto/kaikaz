export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'kaikaz',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.6.1/css/all.css' }
    ]
  },

  ssr: false,
  telemetry: false,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // 'balm-ui/dist/balm-ui.css'
    'bulma'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // '@/plugins/balm-ui'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyCB1awxg6Js-iUOOLPHYlgpKmrs7omTKrY',
          authDomain: 'kaikaz.firebaseapp.com',
          projectId: 'kaikaz',
          storageBucket: 'kaikaz.appspot.com',
          messagingSenderId: '731673850787',
          appId: '1:731673850787:web:e825e5d7d678593a786016',
          measurementId: 'G-85SGTQB332'
        },
        services: {
          auth: true,
          storage: true
        }
      }
    ]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
