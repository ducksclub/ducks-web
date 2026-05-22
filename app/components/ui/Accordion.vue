<script setup lang="ts">
import { ChevronDown } from '@lucide/vue'

type Props = {
  index: number
  title: string
  description: string
  isOpen: boolean
  disabled?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  toggle: []
}>()
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    class="group w-full overflow-hidden rounded-2xl border border-white/5 bg-(--secondary)/20 text-left transition-all duration-200 hover:border-red-500/20 hover:bg-(--secondary)/30 disabled:pointer-events-none disabled:opacity-60"
    :aria-expanded="isOpen"
    @click="emit('toggle')"
  >
    <div class="flex items-center gap-4 p-4">
      <div
        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-sm font-black text-red-300"
      >
        {{ index + 1 }}
      </div>

      <div class="min-w-0 flex-1">
        <h3
          class="truncate text-sm font-semibold text-white transition-colors group-hover:text-red-100"
        >
          {{ title }}
        </h3>
      </div>

      <ChevronDown
        :size="18"
        class="shrink-0 text-gray-500 transition-transform duration-300"
        :class="{
          'rotate-180 text-red-300': isOpen,
        }"
      />
    </div>

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-[300px]"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 max-h-[300px]"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-if="isOpen" class="border-t border-white/5 px-4 pb-4 pt-3">
        <p class="text-sm leading-relaxed text-gray-300">
          {{ description }}
        </p>
      </div>
    </Transition>
  </button>
</template>
