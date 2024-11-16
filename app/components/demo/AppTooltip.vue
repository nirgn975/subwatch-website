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
    <div v-for="(subscription, index) of item.subscriptions" :key="index" :class="[index != 0 ? 'pt-0.5' : '', 'flex flex-col gap-0.5']">
      <div class="flex justify-between items-center">
        <span class="flex gap-2 items-center">
          <img :src="`https://img.logo.dev/${subscription.domain}?token=pk_JrIah0kcTFeKu4Xk9or1xw`" class="h-5 w-5 rounded-full" />
          <p class="text-lg capitalize">{{ subscription.name }}</p>
        </span>

        <span class="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4 cursor-pointer text-neutral-300 hover:text-neutral-50"
            @click="$emit('edit', subscription)"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4 cursor-pointer text-neutral-300 hover:text-neutral-50"
            @click="false"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </span>
      </div>

      <p class="text-neutral-500 text-xs -mt-0.5" v-if="!subscription.subscription.end_date && true && subscription.subscription.interval == 'monthly'">
        Every month on the
        {{ getOrdinalNum(new Date(subscription.subscription.start_date).getDate()) }}
      </p>
      <p class="text-neutral-500 text-xs -mt-1" v-else-if="!subscription.subscription.end_date && true && subscription.subscription.interval == 'yearly'">
        Every year on the
        {{ getOrdinalNum(new Date(subscription.subscription.start_date).getDate()) }}
      </p>
      <p class="text-neutral-500 text-xs -mt-1" v-else-if="subscription.subscription.end_date && true">
        Canceled on {{ new Date(subscription.subscription.end_date).toLocaleDateString("en-US", { year: "2-digit", month: "numeric" }) }}
      </p>

      <div v-if="true" class="text-right flex gap-2 justify-between items-center">
        <p class="text-neutral-500 text-sm">Next payment</p>
        <p class="text-base">${{ subscription.subscription.price }}</p>
      </div>

      <div v-if="true" class="flex gap-2 justify-between items-center">
        <p class="text-neutral-500 text-sm">
          Total since {{ new Date(subscription.subscription.start_date).toLocaleDateString("en-US", { year: "2-digit", month: "numeric" }) }}
        </p>

        <p class="text-base" v-if="subscription.subscription.interval == 'monthly'">
          ${{
            ((subscription.subscription.end_date ? new Date(subscription.subscription.end_date).getMonth() : new Date().getMonth()) -
              new Date(subscription.subscription.start_date).getMonth() +
              12 *
                ((subscription.subscription.end_date ? new Date(subscription.subscription.end_date).getFullYear() : new Date().getFullYear()) -
                  new Date(subscription.subscription.start_date).getFullYear()) +
              1) *
            Number(subscription.subscription.price)
          }}
        </p>
        <p class="text-base" v-if="subscription.subscription.interval == 'yearly'">
          ${{ (new Date().getFullYear() - new Date(subscription.subscription.start_date).getFullYear() + 1) * Number(subscription.subscription.price) }}
        </p>
      </div>

      <div v-if="false" class="flex gap-2 justify-center py-2.5">
        <button
          class="inline-flex gap-1 items-center shadow-md my-2 px-2 py-2 bg-neutral-950 text-neutral-300 rounded-lg font-semibold text-xs uppercase tracking-widest hover:bg-neutral-900 hover:text-neutral-100 transition ease-in-out duration-200"
        >
          Cancel
        </button>

        <button
          class="inline-flex gap-1 items-center shadow-md my-2 px-2 py-2 bg-red-500 text-neutral-50 rounded-lg font-semibold text-xs uppercase tracking-widest hover:bg-red-600 hover:text-neutral-100 transition ease-in-out duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
