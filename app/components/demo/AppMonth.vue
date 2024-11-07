<script setup lang="ts">
import EnTooltip from "./AppTooltip.vue";

const week = [
  { number: 0, label: "sun" },
  { number: 1, label: "mon" },
  { number: 2, label: "tue" },
  { number: 3, label: "wed" },
  { number: 4, label: "thu" },
  { number: 5, label: "fri" },
  { number: 6, label: "sat" },
];

const itemRefs = useTemplateRef("items");
const parentRef = useTemplateRef("parent");
const currentDay = ref(new Date().getDay());
const currentDate = ref(new Date().getDate());
defineProps({
  currentMonth: { type: Number, required: true },
  currentYear: { type: Number, required: true },
  monthData: { type: Array<any>, required: true },
});
</script>

<template>
  <div class="grid grid-cols-7 gap-1 h-96 overflow-hidden" ref="parent">
    <div v-for="day of week" :key="day.number" class="bg-neutral-700 rounded-xl flex justify-center items-center z-10">
      <p :class="[currentDay == day.number && currentMonth == new Date().getMonth() ? 'text-neutral-200' : 'text-neutral-400', 'uppercase text-center']">
        {{ day.label }}
      </p>
    </div>

    <div id="date-grid" class="grid grid-cols-7 gap-1 col-span-7">
      <div
        ref="items"
        v-for="item of monthData"
        :key="item.day"
        :style="item.day == 1 ? `grid-column-start: ${new Date(currentYear, currentMonth, 1).getDay() + 1};` : ''"
        class="rounded-xl p-1 w-full h-16 bg-neutral-900 flex flex-col relative group"
      >
        <div class="flex-1 flex items-center justify-center gap-1">
          <span
            v-for="(subscription, index) of item.subscriptions.slice(0, 2)"
            :key="index"
            :class="[item.subscriptions.length > 2 && index == 1 ? '-mr-3 -ml-3' : '']"
          >
            <img :src="`https://img.logo.dev/${subscription.domain}?token=pk_JrIah0kcTFeKu4Xk9or1xw`" class="h-5 w-5 rounded-full" />
          </span>
          <span v-if="item.subscriptions.length > 2" class="h-6 w-6 bg-neutral-700 rounded-full text-neutral-300 flex justify-center items-center"
            >+{{ item.subscriptions.length - 2 }}</span
          >
        </div>
        <p :class="[currentDate == item.day && currentMonth == new Date().getMonth() ? 'text-neutral-300' : 'text-neutral-500', 'text-center']">
          {{ item.day }}
        </p>

        <EnTooltip :item="item" :element="(itemRefs as any)?.[item.day - 1]" :parent="parentRef" />
      </div>
    </div>
  </div>
</template>
