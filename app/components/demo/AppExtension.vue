<script lang="ts" setup>
import { animate } from "motion";
import { ref, computed } from "vue";
import EnTotal from "./AppDistribution.vue";
import EnMonth from "./AppMonth.vue";

const total = ref(0);
const currnetPage: Ref<"calendar" | "total" | "settings"> = ref("calendar");
const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());
const current = computed(() => new Date(currentYear.value, currentMonth.value + 1, 0));
const subscriptionsData: Ref<Array<any>> = ref([
  { billing: [{ end_date: null, price: "2", start_date: "2024-11-05" }], domain: "netflix.com", name: "netflix" },
  { billing: [{ end_date: null, price: "5", start_date: "2024-10-03" }], domain: "google.com", name: "google" },
  { billing: [{ end_date: null, price: "20", start_date: "2024-10-14" }], domain: "openai.com", name: "openai" },
  { billing: [{ end_date: null, price: "8", start_date: "2024-09-23" }], domain: "spotify.com", name: "spotify" },
  { billing: [{ end_date: null, price: "8", start_date: "2024-09-27" }], domain: "apple.com", name: "apple" },
  { billing: [{ end_date: null, price: "8", start_date: "2024-09-27" }], domain: "figma.com", name: "figma" },
]);

const monthData = computed(() => {
  const data: Array<Record<string, any>> = [];
  for (let i = 1; i <= current.value.getDate(); i++) {
    data.push({ day: i, subscriptions: [] });
  }

  let monthTotal = 0;
  for (const item of subscriptionsData.value) {
    for (const bill of item.billing) {
      const startDate = new Date(bill.start_date);
      const endDate = bill.end_date ? new Date(bill.end_date) : new Date();
      if (
        startDate.getFullYear() > currentYear.value ||
        (startDate.getFullYear() >= currentYear.value && startDate.getMonth() + 1 > currentMonth.value + 1) ||
        (endDate.getFullYear() < currentYear.value && endDate.getMonth() + 1 > currentMonth.value + 1) ||
        (endDate.getFullYear() <= currentYear.value && endDate.getMonth() + 1 < currentMonth.value + 1)
      ) {
        continue;
      }

      if (startDate.getDate() - 1) {
        monthTotal += Number(bill.price);
        data[startDate.getDate() - 1].subscriptions.push({ name: item.name, domain: item.domain, subscription: bill, total: item.total });
      }
    }
  }

  total.value = monthTotal;
  return data;
});

const changeTime = (value: number) => {
  animate("#date-grid", { y: [0, value > 0 ? -1000 : 1000] }, { duration: 1 });
  animate("#date", { y: [0, value > 0 ? -1000 : 1000] }, { duration: 1 });

  setTimeout(() => {
    if (value > 0 && currentMonth.value == 11) {
      currentMonth.value = 0;
      currentYear.value += value;
    } else if (value > 0 && currentMonth.value < 11) {
      currentMonth.value += value;
    } else if (value < 0 && currentMonth.value == 0) {
      currentMonth.value = 12;
      currentYear.value += value;
    } else if (value < 0 && currentMonth.value > 0) {
      currentMonth.value += value;
    }

    animate("#date-grid", { y: [value > 0 ? 1000 : -1000, 0] }, { duration: 1 });
    animate("#date", { y: [value > 0 ? 1000 : -1000, 0] }, { duration: 1 });

    const element = document.querySelector("#totalMonthlySpend");
    animate((progress) => (element.innerHTML = String(`$${Math.round(progress * total.value)}`)), { duration: 1, easing: "ease-out" });
  }, 100);
};
</script>

<template>
  <div class="w-full p-2">
    <div class="text-neutral-50 flex justify-between items-center mb-2">
      <div v-if="currnetPage == 'settings' || currnetPage == 'total'" @click="currnetPage = 'calendar'" class="text-neutral-50 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </div>
      <div v-else></div>
    </div>

    <div class="text-neutral-200 flex justify-between items-center" v-if="currnetPage == 'calendar'">
      <div class="flex items-end gap-2 font-semibold text-4xl">
        <div class="grid grid-rows-2 gap-1 ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-4 w-4"
            @click="changeTime(1)"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-4 w-4"
            @click="changeTime(-1)"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>

        <div class="flex gap-1 h-10 overflow-hidden">
          <p id="date">{{ current.toLocaleString("default", { month: "long" }) }}</p>
          <p id="date" class="text-neutral-500">{{ currentYear }}</p>
        </div>
      </div>

      <div class="cursor-pointer" @click="currnetPage = 'total'">
        <p class="tracking-normal text-center text-neutral-500">Monthly spend</p>
        <p id="totalMonthlySpend" class="text-3xl tracking-tighter text-end">${{ total }}</p>
      </div>
    </div>

    <EnMonth
      v-if="currnetPage == 'calendar'"
      :currentMonth="currentMonth"
      :currentYear="currentYear"
      :monthData="monthData"
      @total="(value) => (total = value)"
    />

    <EnTotal v-if="currnetPage == 'total'" :monthData="monthData" :total="total" @back="currnetPage = 'calendar'" />

    <div class="text-center">
      <a href="https://logo.dev" alt="Logo API" class="text-xs text-neutral-500">Logos provided by Logo.dev</a>
    </div>
  </div>
</template>
