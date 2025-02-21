<script setup lang="ts">
const { data } = await useAsyncData("changelog", () => queryContent("/changelog").findOne());
</script>

<template>
  <section id="changelog" class="flex flex-col justify-center max-w-5xl mx-auto px-4 md:px-6 py-24">
    <h2 class="text-center text-3xl text-neutral-50">Changelog</h2>
    <div class="flex flex-col justify-center divide-y divide-neutral-200 [&>*]:py-16">
      <div
        class="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[8.75rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-200 before:to-transparent"
      >
        <div class="relative" v-for="(item, index) of data?.items.reverse()" :key="index">
          <div v-if="item.published">
            <div class="flex items-center">
              <div class="flex items-center md:space-x-reverse">
                <div class="flex items-center justify-center w-3 h-3 md:order-1 ml-[14px] md:ml-[23px]">
                  <svg class="fill-neutral-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                  </svg>
                </div>

                <time class="text-sm font-medium text-neutral-100 ml-[22px] md:ml-0 md:w-28">{{ item.date }}</time>
              </div>
              <UBadge :label="item.version" variant="soft" class="ml-7" />
            </div>
            <div class="py-2 px-4 ml-8 md:ml-40">
              <h3 class="text-xl pb-1">{{ item.title }}</h3>
              <img v-if="item.picture" :src="item.picture" class="rounded-lg" />
              <p v-if="!item.html" class="text-neutral-400">{{ item.description }}</p>
              <div v-else class="text-neutral-400" v-html="item.description"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
#changelog ul {
  @apply list-disc ml-6;
}
</style>
