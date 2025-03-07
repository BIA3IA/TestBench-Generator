// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "path";

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
    '@vueuse/nuxt',
    'nuxt-primevue',
    '@nuxt/devtools',
    'nuxt-security',
  ],

  devtools: { enabled: process.env.NODE_ENV == "development" },

  css: [
    "primeicons/primeicons.css",
    "primeflex/primeflex.css",
    "primevue/resources/themes/mdc-dark-deeppurple/theme.css",
    "primevue/resources/primevue.min.css",
  ],

  ssr: false,
  
  hooks: {
    "pages:extend"(pages) {
      const pagesToRemove = [];
      pages.forEach((page) => {
        if (page.path.includes("module")) pagesToRemove.push(page);
      });

      pagesToRemove.forEach((page) => {
        pages.splice(pages.indexOf(page), 1);
      });
    },
  },

  build: {
    transpile: ["primevue"],
    alias: {
      "@components": path.resolve(__dirname, "components"),
      "@utils": path.resolve(__dirname, "utils"),
    },
  },

  vite: {
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "components"),
        "@utils": path.resolve(__dirname, "utils"),
      },
    },
  },

  plugins: [
    { src: '~/plugins/primevue.js', ssr: false },
  ],

  sourcemap: {
    client: false,
  },

});