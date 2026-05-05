<template>
  <div class="relative group">
    <!-- Icon -->
    <span
      v-if="$slots.icon"
      class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-(--logo-bg)"
    >
      <slot name="icon" />
    </span>

    <!-- Input -->
    <input
      :value="modelValue"
      @input="onInput"
      v-bind="$attrs"
      :disabled="disabled"
      :class="classes"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    error?: boolean
    disabled?: boolean
  }>(),
  {
    modelValue: '',
    error: false,
    disabled: false,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const classes = computed(() => [
  'w-full rounded-xl py-4 pr-4 outline-none text-sm transition',
  'bg-[var(--secondary)]/20 border',

  // padding если есть иконка
  'pl-12',

  // states
  props.error
    ? 'border-[var(--logo-bg)] focus:border-[var(--logo-bg)]'
    : 'border-white/5 focus:border-[var(--logo-bg)]/50',

  props.disabled && 'opacity-50 cursor-not-allowed',
])
</script>
