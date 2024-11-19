<script setup lang="ts">
useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en",
  },
});

useSeoMeta({
  title: "Subwatch",
  ogTitle: "Subwatch",
  description: "Turn subscription chaos into financial harmony.",
  ogDescription: "Turn subscription chaos into financial harmony.",
  ogImage: "/social-card.jpg",
  twitterImage: "/social-card.jpg",
  twitterCard: "summary_large_image",
  ogImageType: "image/jpeg",
  ogUrl: "https://subwatch.co",
  twitterCreator: "nirgn975",
});
</script>

<template>
  <AppHeader />

  <UMain>
    <NuxtPage />
  </UMain>

  <AppFooter />

  <UNotifications />
</template>
