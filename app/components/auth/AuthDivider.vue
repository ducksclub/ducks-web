<template>
  <div class="flex items-center gap-4 my-6">
    <div class="h-px grow bg-white/5"></div>
    <span class="text-[10px] text-gray-600 uppercase font-bold tracking-[0.2em]">
      {{ text }}
    </span>
    <div class="h-px grow bg-white/5"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ text: string }>()
</script>
