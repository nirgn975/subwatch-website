<script setup lang="ts">
import AppExtension from "@/components/demo/AppExtension.vue";
const { data: page } = await useAsyncData("index", () => queryContent("/").findOne());

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
});
</script>

<template>
  <div>
    <ULandingHero :title="page.hero.title" :description="page.hero.description" :links="page.hero.links" id="features" :ui="{ wrapper: 'py-24 relative' }">
      <template #default>
        <div class="hidden sm:block w-[36rem] mx-auto ring-1 ring-neutral-700 rounded-2xl px-4">
          <AppExtension />
        </div>
        <div class="block sm:hidden">
          <img src="/extension.png" />
        </div>

        <ULandingGrid>
          <ULandingCard
            v-for="(item, index) of page.features"
            :key="index"
            :class="item.class"
            :icon="item.icon"
            :title="item.title"
            :description="item.description"
          >
          </ULandingCard>
        </ULandingGrid>
      </template>
    </ULandingHero>

    <ULandingSection
      :title="page.pricing.title"
      id="pricing"
      :ui="{
        wrapper: 'py-24',
        container: 'gap-16 sm:gap-y-24 flex flex-col max-w-5xl',
      }"
    >
      <UPricingCard
        :title="page.pricing.plan"
        :price="page.pricing.price"
        :discount="page.pricing.discount"
        :highlight="false"
        :button="{ label: 'Buy now', to: page.lemonsqueezyCheckout, target: '_blank' }"
        orientation="horizontal"
        align="bottom"
        :features="page.pricing.features"
      />
    </ULandingSection>

    <ULandingSection :title="page.testimonials.title" :ui="{ wrapper: 'py-24' }">
      <UPageColumns id="testimonials" class="xl:columns-4 scroll-mt-[calc(var(--header-height)+140px+128px+96px)]">
        <div v-for="(testimonial, index) in page.testimonials.items" :key="index" class="break-inside-avoid">
          <ULandingTestimonial v-bind="testimonial" />
        </div>
      </UPageColumns>
    </ULandingSection>

    <ULandingSection class="bg-primary-50 dark:bg-primary-400 dark:bg-opacity-10" :ui="{ wrapper: 'py-24' }">
      <ULandingCTA v-bind="page.cta" :card="false" align="left">
        <div class="relative h-full w-full">
          <img src="/social-2.png" class="absolute -top-20 -right-36 h-[24rem] w-[24rem]" />
          <img src="/social-1.png" class="absolute -top-2 -left-6 h-[24rem] w-[24rem]" />
          <img src="/chrome-notification.png" class="absolute -top-14 left-32 h-[5rem] w-[18rem]" />
        </div>
      </ULandingCTA>
    </ULandingSection>

    <ULandingSection id="faq" :title="page.faq.title" :description="page.faq.description" class="scroll-mt-[var(--header-height)]" :ui="{ wrapper: 'py-24' }">
      <ULandingFAQ
        multiple
        :items="page.faq.items"
        :ui="{
          button: {
            label: 'font-semibold',
            trailingIcon: {
              base: 'w-6 h-6',
            },
          },
        }"
        class="max-w-4xl mx-auto"
      />
    </ULandingSection>
  </div>
</template>
