<script setup lang="ts">
defineEmits(["back"]);
const donutChart: any = useTemplateRef("donutChart");
const props = defineProps({
  monthData: { type: Array<any>, required: true },
  total: { type: Number, required: true },
});

onMounted(() => drawChart());
watch(props, () => drawChart());
const drawChart = () => {
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

  const ctx = donutChart.value?.getContext("2d");
  const size = 340; // Size of the donut chart
  const radius = size / 2.4;
  const centerX = size / 2.15;
  const centerY = size / 2.15;

  // Clear the canvas
  ctx.clearRect(0, 0, donutChart.value?.width, donutChart.value?.height);

  // Set up the starting point

  let startAngle = -Math.PI / 2; // Start from the top
  const gapSize = 35;
  const sortedAll = all.sort((a, b) => b.percentage - a.percentage);
  for (const item of sortedAll) {
    const sliceAngle = (item.percentage / 100.8) * Math.PI * 2 - gapSize / radius;
    const endAngle = startAngle + sliceAngle;

    ctx.beginPath();
    ctx.lineWidth = 30;
    ctx.strokeStyle = "#e5e5e5";
    ctx.lineCap = "round"; // Rounded edges

    // Draw the arc
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.stroke();

    startAngle = endAngle + gapSize / radius;
  }

  // Image dots
  let totalAngle = 0;
  for (const item of sortedAll) {
    totalAngle += item.percentage;
    const angleInRadians = (totalAngle / 100) * 2 * Math.PI;

    // Convert angle to Cartesian coordinates
    const x = centerX / 1.08 + radius * Math.sin(angleInRadians - 0.3);
    const y = centerY / 1.08 - radius * Math.cos(angleInRadians - 0.3);

    // Draw the circle
    const img = new Image();
    img.src = `https://img.logo.dev/${item.domain}?token=pk_JrIah0kcTFeKu4Xk9or1xw`;
    img.onload = function () {
      const width = 23;
      const height = 23;
      const radius = 15;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, x, y, width, height);
      ctx.restore();
    };
  }
};
</script>

<template>
  <div class="space-y-2 text-neutral-50 p-4">
    <div class="flex justify-center items-center w-full h-full relative">
      <div @click="$emit('back')" class="absolute cursor-pointer z-10">
        <p class="tracking-normal text-base text-neutral-500">Monthly spend</p>
        <p class="text-5xl tracking-tighter text-center">${{ total }}</p>
      </div>

      <canvas ref="donutChart" width="320px" height="320px"></canvas>
    </div>
  </div>
</template>
