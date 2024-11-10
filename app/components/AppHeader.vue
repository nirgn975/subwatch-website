<script setup lang="ts">
const nuxtApp = useNuxtApp();
const { activeHeadings, updateHeadings } = useScrollspy();
const { data: page } = await useAsyncData("index", () => queryContent("/").findOne());

const links = computed(() => [
  {
    label: "Features",
    to: "#features",
    icon: "i-heroicons-sparkles",
    active: activeHeadings.value.includes("features") && !activeHeadings.value.includes("pricing"),
  },
  {
    label: "Pricing",
    to: "#pricing",
    icon: "i-heroicons-credit-card",
    active: activeHeadings.value.includes("pricing") && !activeHeadings.value.includes("testimonials"),
  },
  {
    label: "Testimonials",
    to: "#testimonials",
    icon: "i-heroicons-chat-bubble-left-right",
    active: activeHeadings.value.includes("testimonials"),
  },
  {
    label: "FAQ",
    to: "#faq",
    icon: "i-heroicons-question-mark-circle",
    active: activeHeadings.value.includes("faq"),
  },
]);

nuxtApp.hooks.hookOnce("page:finish", () => {
  updateHeadings([
    document.querySelector("#features"),
    document.querySelector("#pricing"),
    document.querySelector("#testimonials"),
    document.querySelector("#faq"),
  ]);
});
</script>

<template>
  <UHeader :links="links" class="dark:bg-gray-950 dark:border-gray-800">
    <template #logo>
      <span class="flex items-center gap-1">
        <UIcon name="i-heroicons-arrow-path-rounded-square" class="h-6 w-6" />
        SubWatch
      </span>
    </template>

    <template #right>
      <UButton label="Manage account" :to="page.lemonsqueezyPortal" target="_blank" color="white" variant="ghost" class="hidden lg:flex" />
    </template>

    <template #panel>
      <UAsideLinks :links="links" />

      <UDivider class="my-6" />

      <UButton label="Manage account" color="white" block :to="page.lemonsqueezyPortal" target="_blank" class="mb-3" />
    </template>
  </UHeader>
</template>
