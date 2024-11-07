<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  element: {
    type: Object,
  },
  parent: {
    type: Object,
  },
});

const computePosition = () => {
  const classes = [];
  if (Number(props.element?.offsetLeft) > 1200 && Number(props.element?.offsetLeft) - Number(props.parent?.offsetLeft) > 450) {
    classes.push("-left-[9.5rem]");
  } else if (Number(props.element?.offsetLeft) > 1200 && Number(props.element?.offsetLeft) - Number(props.parent?.offsetLeft) > 150) {
    classes.push("-left-[2.5rem]");
  } else if (Number(props.element?.offsetLeft) < 1200 && Number(props.element?.offsetLeft) - Number(props.parent?.offsetLeft) > -1300) {
    classes.push("-left-[9.5rem]");
  }

  if (Number(props.element?.offsetTop) > 500 && Number(props.element?.offsetTop) - Number(props.parent?.offsetTop) < 200) {
    classes.push("-bottom-[6rem]");
  } else if (Number(props.element?.offsetTop) > 500) {
    classes.push("-top-[6rem]");
  } else if (Number(props.element?.offsetTop) < 500 && Number(props.element?.offsetTop) - Number(props.parent?.offsetTop) < -350) {
    classes.push("-bottom-[6rem]");
  } else if (Number(props.element?.offsetTop) < 500 && Number(props.element?.offsetTop) - Number(props.parent?.offsetTop) > -350) {
    classes.push("-top-[6rem]");
  }

  return classes.join(" ");
};

const getOrdinalNum = (n: number) => {
  return n + (n > 0 ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : "");
};
</script>

<template>
  <div
    :class="[
      computePosition(),
      'w-56 max-h-28 overflow-y-scroll rounded-lg text-neutral-50 bg-neutral-800 p-2 absolute z-10 opacity-0 invisible group-hover:visible group-hover:opacity-100 ease-in duration-200 space-y-1 divide-y divide-neutral-700',
    ]"
    v-if="item.subscriptions.length"
  >
    <div v-for="(subscription, index) of item.subscriptions" :key="index" :class="[index != 0 ? 'pt-1' : '', 'grid grid-cols-8 gap-2']">
      <div class="col-span-5">
        <span class="flex gap-2">
          <img :src="`https://img.logo.dev/${subscription.domain}?token=pk_JrIah0kcTFeKu4Xk9or1xw`" class="h-6 w-6 rounded-full" />
          <p class="text-lg">{{ subscription.name }}</p>
        </span>
        <p class="text-neutral-500 text-[0.65rem]">
          Every month on the
          {{ getOrdinalNum(new Date(subscription.subscription.start_date).getDate()) }}
        </p>
      </div>

      <div class="text-right col-span-3">
        <p class="text-xl">${{ subscription.subscription.price }}</p>
        <p class="text-neutral-500 text-[0.65rem]">Next payment</p>
      </div>

      <div class="col-span-5 flex items-center">
        <p class="text-neutral-500 text-xs">
          Total since
          {{ new Date(subscription.subscription.start_date).toLocaleDateString("en-US", { year: "2-digit", month: "numeric" }) }}
        </p>
      </div>

      <div class="text-right col-span-3">
        <p class="text-base">
          ${{
            (new Date().getMonth() -
              new Date(subscription.subscription.start_date).getMonth() +
              12 * (new Date().getFullYear() - new Date(subscription.subscription.start_date).getFullYear()) +
              1) *
            Number(subscription.subscription.price)
          }}
        </p>
      </div>
    </div>
  </div>
</template>
