<script setup lang="ts">
import type { Component } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    modelValue?: string
    type?: string
    placeholder?: string
    disabled?: boolean
    error?: boolean
    errorMessage?: string
    autocomplete?: string
    icon?: Component
  }>(),
  {
    modelValue: '',
    type: 'text',
    placeholder: '',
    disabled: false,
    error: false,
    errorMessage: '',
    autocomplete: 'off',
    icon: undefined,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const hasIcon = computed(() => Boolean(props.icon))

const inputClasses = computed(() => [
  'w-full rounded-xl border py-4 pr-4 text-sm outline-none transition',
  'bg-[var(--secondary)]/20 text-white placeholder:text-gray-600',
  'disabled:cursor-not-allowed disabled:opacity-50',
  hasIcon.value ? 'pl-12' : 'pl-4',
  props.error
    ? 'border-[var(--logo-bg)] focus:border-[var(--logo-bg)]'
    : 'border-white/5 focus:border-[var(--logo-bg)]/50',
])

const iconClasses = computed(() => [
  'pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors',
  props.error ? 'text-[var(--logo-bg)]' : 'text-gray-500 group-focus-within:text-[var(--logo-bg)]',
])

function updateValue(event: Event) {
  const input = event.target as HTMLInputElement
  emit('update:modelValue', input.value)
}
</script>

<template>
  <div class="space-y-1">
    <div class="group relative">
      <component :is="icon" v-if="icon" :class="iconClasses" aria-hidden="true" />

      <input
        v-bind="$attrs"
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :class="inputClasses"
        @input="updateValue"
      />
    </div>

    <p v-if="errorMessage" class="text-xs text-(--logo-bg)">
      {{ errorMessage }}
    </p>
  </div>
</template>
