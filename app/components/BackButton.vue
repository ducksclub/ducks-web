<template>
  <button
    @click="navigateTo(props.to)"
    class="self-start flex items-center gap-2 text-gray-500 hover:text-white transition-colors active:scale-90"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
    <span class="text-xs font-bold uppercase tracking-widest">{{ props.label ?? 'Назад' }}</span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  to: string
  label?: string
}>()
</script>
