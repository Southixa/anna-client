// https://nuxt.com/docs/api/configuration/nuxt-config
//import tailwindConfig from "./tailwind.config"
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  // app: {
  //   head: {
  //     charset: 'utf-8',
  //     viewport: 'width=device-width, initial-scale=1',
  //     title: 'Moschino | Minimalist Free HTML Portfolio by WowThemes.net',
  //     link: [
  //       { rel: 'stylesheet', href: '/css/woocommerce-layout.css', type: 'text/css', media: 'all' },
  //       { rel: 'stylesheet', href: '/css/woocommerce-smallscreen.css', type: 'text/css', media: 'only screen and (max-width: 768px)' },
  //       { rel: 'stylesheet', href: '/css/woocommerce.css', type: 'text/css', media: 'all' },
  //       { rel: 'stylesheet', href: '/css/font-awesome.min.css', type: 'text/css', media: 'all' },
  //       { rel: 'stylesheet', href: '/css/style.css', type: 'text/css', media: 'all' },
  //       { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Oswald:400,500,700%7CRoboto:400,500,700%7CHerr+Von+Muellerhoff:400,500,700%7CQuattrocento+Sans:400,500,700', type: 'text/css', media: 'all' },
  //       { rel: 'stylesheet', href: '/css/easy-responsive-shortcodes.css', type: 'text/css', media: 'all' },
  //     ],
  //     script: [
  //       { src: '/js/jquery.js' },
  //       { src: '/js/plugins.js' },
  //       { src: '/js/scripts.js' },
  //       { src: '/js/masonry.pkgd.min.js' }
  //     ]
  //   }
  // },
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@bg-dev/nuxt-naiveui',
    '@nuxtjs/apollo',
    'nuxt-icon',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  googleFonts: {
    families: {
      'Noto Sans Lao': {
        wght: [100, 300, 400, 500, 700, 900],
      },
      'Grey Qo': {
        wght: [100, 300, 400, 500, 700, 900],
      },
      'Dancing Script': {
        wght: [400, 500, 600, 700, 800, 900],
      },
      'Josefin+Sans': true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100]
      },
    },
    display: 'swap'
  },
  css: ['@/assets/main.css'],
  tailwindcss: {
    exposeConfig: true,
    // config: {
    //     theme: {
    //       extend: {
    //         colors: {
    //           'primary': '#002749',
    //         }
    //       }
    //     }
    // },
  },
  runtimeConfig: {
    public: { // For client-side access
      NHOST_SUBDOMAIN: process.env.NHOST_SUBDOMAIN + "",
      NHOST_REGION: process.env.NHOST_REGION + "",
      motion: {
        directives: {
          'pop-bottom': {
            initial: {
              scale: 0,
              opacity: 0,
              y: 100,
            },
            visible: {
              scale: 1,
              opacity: 1,
              y: 0,
            }
          }
        }
      }
    },
  },
  ssr: false
})
