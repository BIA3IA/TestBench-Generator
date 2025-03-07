// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: "/testbench-generator",
    head: {
      bodyAttrs: {
        class: "neutral-2-bg-a1",
      },
      title: "Testbench Generator",
    },
  },

  modules: [
    'nuxt-primevue',
  ],

  css: [
    "primeicons/primeicons.css",
    "primeflex/primeflex.css",
    "primevue/resources/themes/mdc-dark-deeppurple/theme.css",
    "primevue/resources/primevue.min.css",
  ],

  ssr: false,

  build: {
    transpile: ['nuxt', 'primevue'],
  },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})
