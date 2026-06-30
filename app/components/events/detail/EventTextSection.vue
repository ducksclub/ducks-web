<script setup lang="ts">
defineProps<{
  title: string
  text: string
}>()
</script>

<template>
  <section class="rounded-2xl border border-white/5 bg-(--secondary)/20 p-5 space-y-3">
    <p class="text-[10px] text-gray-500 uppercase tracking-widest">{{ title }}</p>
    <p class="text-sm text-gray-200 whitespace-pre-wrap">{{ text }}</p>
  </section>
</template>
