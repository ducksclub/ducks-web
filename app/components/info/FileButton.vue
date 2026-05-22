<script setup lang="ts">
import { FileText } from '@lucide/vue'

const props = defineProps<{
  url: string
  title: string
  subtitle?: string
}>()

const openDocument = (url: string) => {
  window.open(url, '_blank')
}
</script>

<template>
  <button
    class="group flex w-full items-center gap-3 rounded-2xl border border-white/5 bg-(--secondary)/20 p-4 transition-all duration-200 hover:border-red-500/20 hover:bg-(--secondary)/30 active:scale-[0.99]"
    @click="openDocument(props.url)"
  >
    <div
      class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-300 shadow-[0_0_14px_rgba(239,68,68,0.10)]"
    >
      <FileText :size="18" />
    </div>

    <div class="flex-1 text-left">
      <p class="text-sm font-semibold text-white transition-colors group-hover:text-red-100">
        {{ props.title }}
      </p>

      <p class="mt-0.5 text-xs text-gray-500">{{ props.subtitle }}</p>
    </div>
  </button>
</template>
