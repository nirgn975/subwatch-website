<script setup lang="ts">
useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en",
  },
  script: [{ src: "https://lmsqueezy.com/affiliate.js", defer: true }],
});

useSeoMeta({
  ogSiteName: "Subwatch",
  title: "Subwatch",
  ogTitle: "Subwatch",
  twitterTitle: "Subwatch",
  description: "Turn subscription chaos into financial harmony.",
  ogDescription: "Turn subscription chaos into financial harmony.",
  twitterDescription: "Turn subscription chaos into financial harmony.",
  ogImage: "https://subwatch.co/social-card.png",
  twitterImage: "https://subwatch.co/social-card.png",
  twitterCard: "summary_large_image",
  ogImageType: "image/png",
  ogUrl: "https://subwatch.co",
  twitterCreator: "@nirgn975",
  twitterSite: "@nirgn975",
});

onMounted(() => {
  (window as any).lemonSqueezyAffiliateConfig = { store: "subwatch" };
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
