// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["@nuxt/ui-pro"],
  modules: ["@nuxt/content", "@nuxt/fonts", "@nuxt/image", "@nuxt/ui"],
  routeRules: {
    // Temporary workaround for prerender regression. see https://github.com/nuxt/nuxt/issues/27490
    "/": { prerender: true },
  },
  runtimeConfig: {
    public: {
      posthogPublicKey: "phc_1cVzxNjdcbmVuhce9vWnOo47H4jwaPkAgIZbouxzMtr",
      posthogHost: "https://us.i.posthog.com",
    },
  },
  devtools: {
    enabled: true,
  },
  colorMode: {
    preference: "dark",
  },
  typescript: {
    strict: false,
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-07-11",
});