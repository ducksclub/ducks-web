<template>
  <label class="flex items-start gap-3 text-[11px] text-gray-500 cursor-pointer group">
    <!-- Checkbox -->
    <div class="relative flex items-center">
      <input
        :checked="modelValue"
        @change="toggle"
        type="checkbox"
        class="peer appearance-none w-5 h-5 bg-(--secondary)/20 border border-white/10 rounded-md checked:bg-(--logo-bg) checked:border-transparent transition-all"
      />

      <!-- Check icon -->
      <svg
        class="absolute w-3 h-3 left-1 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7" />
      </svg>
    </div>

    <!-- Text -->
    <span class="leading-tight group-hover:text-gray-400 transition-colors">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const toggle = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>
