<script setup lang="ts">
useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en",
  },
});

useSeoMeta({
  ogSiteName: "Subwatch",
  title: "Subwatch",
  ogTitle: "Subwatch",
  twitterTitle: "Subwatch",
  description: "Turn subscription chaos into financial harmony.",
  ogDescription: "Turn subscription chaos into financial harmony.",
  twitterDescription: "Turn subscription chaos into financial harmony.",
  ogImage: "/social-card.jpeg",
  twitterImage: "/social-card.jpeg",
  twitterCard: "summary_large_image",
  ogImageType: "image/jpeg",
  ogUrl: "https://subwatch.co",
  twitterCreator: "@nirgn975",
  twitterSite: "@nirgn975",
});

defineOgImageComponent("NuxtSeo");
</script>

<template>
  <AppHeader />

  <UMain>
    <NuxtPage />
  </UMain>

  <AppFooter />

  <UNotifications />
</template>
