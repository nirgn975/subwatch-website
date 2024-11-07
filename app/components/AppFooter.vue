<template>
  <UFooter>
    <template #left>
      <p class="text-neutral-400 text-sm">Copyright © {{ new Date().getFullYear() }}. All rights reserved.</p>
    </template>

    <template #right>
      <UButton to="https://x.com/nirgn975" target="_blank" icon="i-simple-icons-x" aria-label="X" color="gray" variant="ghost" />
      <UButton to="https://github.com/nirgn975" target="_blank" icon="i-simple-icons-github" aria-label="GitHub" color="gray" variant="ghost" />
    </template>
  </UFooter>
</template>
