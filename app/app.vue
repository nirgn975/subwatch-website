<script setup lang="ts">
useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en",
  },
});
</script>

<template>
  <AppHeader />

  <div>
    <NuxtPage />
  </div>

  <AppFooter />
</template>

<style>
@import "tailwindcss";
@import "@nuxt/ui";

@theme {
  --font-family-sans: "Helvetica Neue", sans-serif;
}

html {
  @apply h-full bg-gray-950 text-gray-50;
}
</style>
