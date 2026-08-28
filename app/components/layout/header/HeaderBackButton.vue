<script setup lang="ts">
import { ChevronLeft } from '@lucide/vue'

defineProps<{
  backTo?: string
}>()

const { impact } = useTelegramHaptics()
const router = useRouter()

const goBack = (path?: string) => {
  impact('light')

  if (path) {
    return router.push(path)
  }
  router.back()
}
</script>

<template>
  <button
    class="group flex items-center gap-1 text-red-400 transition-all active:scale-95"
    @click="goBack(backTo)"
  >
    <ChevronLeft
      :size="18"
      class="transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:text-red-300"
    />

    <span
      class="text-[10px] font-bold uppercase tracking-[0.18em] transition-colors group-hover:text-red-200"
    >
      Назад
    </span>
  </button>
</template>
