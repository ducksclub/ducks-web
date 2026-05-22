<script setup lang="ts">
const props = defineProps<{
  faq: {
    question: string
    answer: string
  }
}>()

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="bg-(--secondary)/20 rounded-2xl border border-white/5 overflow-hidden transition">
    <button
      @click="toggle"
      @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle"
      class="w-full flex justify-between items-center p-4 text-left focus:outline-none"
      :aria-expanded="isOpen"
    >
      <span class="font-semibold text-sm">
        {{ faq.question }}
      </span>

      <!-- SVG ICON -->
      <svg
        class="w-4 h-4 transition-transform duration-300"
        :class="isOpen ? 'rotate-180 text-(--logo-bg)' : 'text-gray-500'"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-40"
      leave-from-class="opacity-100 max-h-40"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-show="isOpen" class="px-4 pb-4 text-sm text-gray-400 leading-relaxed overflow-hidden">
        {{ faq.answer }}
      </div>
    </transition>
  </div>
</template>
