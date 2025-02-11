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

      <template #links>
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap gap-x-6 gap-y-3 justify-center">
            <UButton
              :label="page.hero.links[1].label"
              :to="page.hero.links[1].to"
              :size="page.hero.links[1].size"
              color="gray"
              :target="page.hero.links[1].target"
            >
              <template #trailing>
                <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 190.5 190.5" class="size-6">
                  <path
                    fill="#fff"
                    d="M95.252 142.873c26.304 0 47.627-21.324 47.627-47.628s-21.323-47.628-47.627-47.628-47.627 21.324-47.627 47.628 21.323 47.628 47.627 47.628z"
                  />
                  <path
                    fill="#229342"
                    d="m54.005 119.07-41.24-71.43a95.227 95.227 0 0 0-.003 95.25 95.234 95.234 0 0 0 82.496 47.61l41.24-71.43v-.011a47.613 47.613 0 0 1-17.428 17.443 47.62 47.62 0 0 1-47.632.007 47.62 47.62 0 0 1-17.433-17.437z"
                  />
                  <path
                    fill="#fbc116"
                    d="m136.495 119.067-41.239 71.43a95.229 95.229 0 0 0 82.489-47.622A95.24 95.24 0 0 0 190.5 95.248a95.237 95.237 0 0 0-12.772-47.623H95.249l-.01.007a47.62 47.62 0 0 1 23.819 6.372 47.618 47.618 0 0 1 17.439 17.431 47.62 47.62 0 0 1-.001 47.633z"
                  />
                  <path
                    fill="#1a73e8"
                    d="M95.252 132.961c20.824 0 37.705-16.881 37.705-37.706S116.076 57.55 95.252 57.55 57.547 74.431 57.547 95.255s16.881 37.706 37.705 37.706z"
                  />
                  <path
                    fill="#e33b2e"
                    d="M95.252 47.628h82.479A95.237 95.237 0 0 0 142.87 12.76 95.23 95.23 0 0 0 95.245 0a95.222 95.222 0 0 0-47.623 12.767 95.23 95.23 0 0 0-34.856 34.872l41.24 71.43.011.006a47.62 47.62 0 0 1-.015-47.633 47.61 47.61 0 0 1 41.252-23.815z"
                  />
                </svg>
              </template>
            </UButton>
            <UButton
              :label="page.hero.links[0].label"
              :to="page.hero.links[0].to"
              :size="page.hero.links[0].size"
              color="black"
              :icon="page.hero.links[0].icon"
              :trailing="page.hero.links[0].trailing"
            />
          </div>

          <div class="w-96 mx-auto flex gap-4 items-center justify-center mt-2">
            <UAvatarGroup size="sm">
              <UAvatar v-for="(item, index) of page.hero.users" :src="item" :key="index" />
            </UAvatarGroup>

            <div class="flex flex-col items-center justify-center">
              <span class="flex items-center">
                <UIcon name="i-heroicons-star-solid" class="size-4" />
                <UIcon name="i-heroicons-star-solid" class="size-4" />
                <UIcon name="i-heroicons-star-solid" class="size-4" />
                <UIcon name="i-heroicons-star-solid" class="size-4" />
                <UIcon name="i-heroicons-star-solid" class="size-4" />
              </span>
              <p class="text-sm">+100 users</p>
            </div>
          </div>
        </div>
      </template>
    </ULandingHero>

    <ULandingSection id="howitworks" :title="page.howitworks.title" :ui="{ wrapper: 'py-24' }">
      <div class="p-4 ring-1 ring-neutral-700 rounded-2xl">
        <img src="/how-it-works.jpg" class="mb-4 rounded-t-xl" />

        <ol class="flex gap-4">
          <li v-for="(item, index) of page.howitworks.steps" :key="index" class="w-1/3 flex flex-col gap-4">
            <span class="px-3 py-1.5 bg-neutral-800 rounded-xl w-fit">{{ item.step }}</span>
            <p>{{ item.description }}</p>
          </li>
        </ol>
      </div>
    </ULandingSection>

    <ULandingSection id="testimonials" :title="page.testimonials.title" :ui="{ wrapper: 'py-24' }">
      <template #description>
        <a
          href="https://www.producthunt.com/posts/subwatch-3?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-subwatch&#0045;3"
          target="_blank"
          ><img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=660222&theme=light&t=1739308020693"
            alt="Subwatch - Turn&#0032;subscription&#0032;chaos&#0032;into&#0032;financial&#0032;harmony&#0046; | Product Hunt"
            style="width: 250px; height: 54px"
            width="250"
            height="54"
        /></a>
      </template>

      <UPageColumns id="testimonials" class="xl:columns-4 scroll-mt-[calc(var(--header-height)+140px+128px+96px)]">
        <div v-for="(testimonial, index) in page.testimonials.items" :key="index" class="break-inside-avoid">
          <ULandingTestimonial v-bind="testimonial" />
        </div>
      </UPageColumns>
    </ULandingSection>

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
        :button="{ label: 'Buy now', to: page.checkout, target: '_blank' }"
        orientation="horizontal"
        align="bottom"
        :features="page.pricing.features"
      />
    </ULandingSection>

    <ULandingSection class="bg-primary-50 dark:bg-primary-400 dark:bg-opacity-10" :ui="{ wrapper: 'py-24' }">
      <ULandingCTA v-bind="page.cta" :card="false" align="left">
        <div class="relative h-full w-full flex justify-center items-center">
          <img src="/cta.jpg" class="rounded-xl" />
        </div>

        <template #links>
          <div class="flex flex-col gap-4">
            <div class="flex flex-wrap gap-x-6 gap-y-3 justify-center">
              <UButton
                :label="page.hero.links[1].label"
                :to="page.hero.links[1].to"
                :size="page.hero.links[1].size"
                color="gray"
                :target="page.hero.links[1].target"
              >
                <template #trailing>
                  <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 190.5 190.5" class="size-6">
                    <path
                      fill="#fff"
                      d="M95.252 142.873c26.304 0 47.627-21.324 47.627-47.628s-21.323-47.628-47.627-47.628-47.627 21.324-47.627 47.628 21.323 47.628 47.627 47.628z"
                    />
                    <path
                      fill="#229342"
                      d="m54.005 119.07-41.24-71.43a95.227 95.227 0 0 0-.003 95.25 95.234 95.234 0 0 0 82.496 47.61l41.24-71.43v-.011a47.613 47.613 0 0 1-17.428 17.443 47.62 47.62 0 0 1-47.632.007 47.62 47.62 0 0 1-17.433-17.437z"
                    />
                    <path
                      fill="#fbc116"
                      d="m136.495 119.067-41.239 71.43a95.229 95.229 0 0 0 82.489-47.622A95.24 95.24 0 0 0 190.5 95.248a95.237 95.237 0 0 0-12.772-47.623H95.249l-.01.007a47.62 47.62 0 0 1 23.819 6.372 47.618 47.618 0 0 1 17.439 17.431 47.62 47.62 0 0 1-.001 47.633z"
                    />
                    <path
                      fill="#1a73e8"
                      d="M95.252 132.961c20.824 0 37.705-16.881 37.705-37.706S116.076 57.55 95.252 57.55 57.547 74.431 57.547 95.255s16.881 37.706 37.705 37.706z"
                    />
                    <path
                      fill="#e33b2e"
                      d="M95.252 47.628h82.479A95.237 95.237 0 0 0 142.87 12.76 95.23 95.23 0 0 0 95.245 0a95.222 95.222 0 0 0-47.623 12.767 95.23 95.23 0 0 0-34.856 34.872l41.24 71.43.011.006a47.62 47.62 0 0 1-.015-47.633 47.61 47.61 0 0 1 41.252-23.815z"
                    />
                  </svg>
                </template>
              </UButton>
              <UButton
                :label="page.hero.links[0].label"
                :to="page.hero.links[0].to"
                :size="page.hero.links[0].size"
                color="black"
                :icon="page.hero.links[0].icon"
                :trailing="page.hero.links[0].trailing"
              />
            </div>
          </div>
        </template>
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
