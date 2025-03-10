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

  nitro: {
    preset: "vercel", // Ottimizza per Vercel
  },

  modules: [
    'nuxt-primevue',
    '@vueuse/nuxt',
  ],

  primevue: {
    options: { ripple: true },
  },

  css: [
    "primeicons/primeicons.css",
    "primeflex/primeflex.css",
    "primevue/resources/themes/mdc-dark-deeppurple/theme.css",
    "primevue/resources/primevue.min.css",
    "@/styles/global.css",
  ],

  ssr: true,

  build: {
    transpile: ['nuxt', 'primevue'],
  },

  sourcemap: {
    client: false,
  },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})
