<script setup lang="ts">
import EnTooltip from "./AppTooltip.vue";

const itemRefs = useTemplateRef("items");
const parentRef = useTemplateRef("parent");
const currentDay = ref(new Date().getDay());
const currentDate = ref(new Date().getDate());
const startOnOffset = ref(1);
const week = ref([
  { number: 0, label: "sunday" },
  { number: 1, label: "monday" },
  { number: 2, label: "tuesday" },
  { number: 3, label: "wednesday" },
  { number: 4, label: "thursday" },
  { number: 5, label: "friday" },
  { number: 6, label: "saturday" },
]);
const props = defineProps({
  currentMonth: { type: Number, required: true },
  currentYear: { type: Number, required: true },
  monthData: { type: Array<any>, required: true },
  firstDay: { type: Number, required: true },
  weekDays: { type: Object, required: true },
});

onMounted(() => computeWeekOrder());
watch(props, () => computeWeekOrder());

const computeWeekOrder = async () => {
  if (!props.weekDays || !props.firstDay) {
    return;
  }

  const dayNumber = Object.entries(props.weekDays).filter((item) => (Number(item[0]) == props.firstDay ? item[1] : false))?.[0] || ["1", "monday"];
  const weekOffsets: Record<string, number> = { sunday: 1, monday: 0, saturday: 2 };
  startOnOffset.value = weekOffsets[String(dayNumber?.[1])];
  const newWeek = [];
  for (let i = 0; i < 7; i++) {
    newWeek.push({ number: i + 1, label: props.weekDays[(i + Number(dayNumber[0])) % 7 == 0 ? 7 : (i + Number(dayNumber[0])) % 7] });
  }

  week.value = newWeek;
};
</script>

<template>
  <div class="grid grid-cols-7 gap-1 overflow-hidden" ref="parent">
    <div v-for="day of week" :key="day.number" class="bg-neutral-700 rounded-xl flex justify-center items-center z-10 h-8">
      <p
        :class="[
          (currentDay + startOnOffset == 0 ? 7 : currentDay + startOnOffset) == day.number && currentMonth == new Date().getMonth()
            ? 'text-neutral-200'
            : 'text-neutral-400',
          'uppercase text-center',
        ]"
      >
        {{ day.label.slice(0, 3) }}
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
