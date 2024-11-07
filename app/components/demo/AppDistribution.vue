<script setup lang="ts">
defineEmits(["back"]);
const props = defineProps({
  monthData: { type: Array<any>, required: true },
  total: { type: Number, required: true },
});

const subscriptionData = computed(() => {
  const all: Array<Record<string, any>> = [];
  for (const day of props.monthData) {
    if (day.subscriptions.length) {
      for (const subscription of day.subscriptions) {
        const percentage = Math.round((100 * subscription.subscription.price) / props.total);
        all.push({
          name: subscription.name,
          domain: subscription.domain,
          price: subscription.subscription.price,
          percentage: percentage,
        });
      }
    }
  }

  const colors = ["#737373", "#ef4444", "#f59e0b", "#84cc16", "#10b981", "#06b6d4", "#3b82f6", "#8b5cf6", "#d946ef", "#f43f5e"].sort(() => 0.5 - Math.random());
  let total = 0;
  const sortedAll = all.sort((a, b) => b.percentage - a.percentage);
  const conicGradient = sortedAll.map((item, index) => {
    const colorString = `${colors[index]} 0 ${item.percentage + total}%, #000000 0 ${item.percentage + total}%`;
    total += item.percentage;
    item.color = colors[index];
    return colorString;
  });
  return { data: sortedAll, conicGradient: conicGradient.join(", ") };
});
</script>

<template>
  <div class="space-y-2 text-neutral-50 p-4">
    <figure class="flex justify-center items-center relative">
      <div @click="$emit('back')" class="absolute cursor-pointer z-10">
        <p class="tracking-normal text-base text-neutral-500">Monthly spend</p>
        <p class="text-5xl tracking-tighter text-center">${{ total }}</p>
      </div>

      <div
        class="w-60 h-60 rounded-full aspect-auto max-w-60 flex-1"
        :style="`background: radial-gradient(#0a0a0a 50%, transparent 0 100%, #0a0a0a 0), conic-gradient(${subscriptionData.conicGradient});`"
      ></div>

      <!-- <span
        v-for="(item, index) of subscriptionData.data"
        :key="index"
        class="absolute"
        :style="`${item.yField}: ${item.yValue}%; ${item.xField}: ${item.xValue}%;`"
      >
        <img :src="`https://img.logo.dev/${item.domain}?token=pk_JrIah0kcTFeKu4Xk9or1xw`" class="h-5 w-5 rounded-full" />
      </span> -->
    </figure>

    <figcaption class="flex flex-wrap gap-4 justify-center">
      <span v-for="(item, index) of subscriptionData.data" :key="index" class="flex items-center gap-1">
        <div class="rounded-full h-4 w-4" :style="`background: ${item.color}`"></div>
        <img :src="`https://img.logo.dev/${item.domain}?token=pk_JrIah0kcTFeKu4Xk9or1xw`" class="h-4 w-4 rounded-full ring-1 ring-neutral-500" />
        <p class="capitalize text-base">{{ item.name }}</p>
      </span>
    </figcaption>
  </div>
</template>
