<script setup lang="ts">
import type { Component } from 'vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const MOSCOW_TIMEZONE = 'Europe/Moscow'

const props = withDefaults(
  defineProps<{
    modelValue?: string | null
    label?: string
    placeholder?: string
    disabled?: boolean
    error?: string
    hint?: string
    icon?: Component
  }>(),
  {
    modelValue: '',
    disabled: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

/**
 * Приводит любое значение к формату для input[type="datetime-local"]
 *
 * Input должен получить:
 * 2026-06-11T15:30
 */
const inputValue = computed(() => {
  if (!props.modelValue) return ''

  return dayjs(props.modelValue).tz(MOSCOW_TIMEZONE).format('YYYY-MM-DDTHH:mm')
})

/**
 * Берет значение из datetime-local:
 * 2026-06-11T15:30
 *
 * И превращает в московское время:
 * 2026-06-11T15:30:00+03:00
 */
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement

  if (!target.value) {
    emit('update:modelValue', '')
    return
  }

  const moscowDate = dayjs.tz(target.value, MOSCOW_TIMEZONE).format('YYYY-MM-DDTHH:mm:ssZ')

  emit('update:modelValue', moscowDate)
}
</script>

<template>
  <div>
    <label v-if="label" class="mb-2 block text-sm text-gray-400">
      {{ label }}
    </label>

    <div
      class="flex h-11.5 items-center gap-3 rounded-2xl border bg-(--secondary)/20 px-4 transition"
      :class="[
        error
          ? 'border-red-500/40 focus-within:border-red-500'
          : 'border-white/5 focus-within:border-(--primary)/40',

        disabled && 'pointer-events-none opacity-50',
      ]"
    >
      <component
        :is="icon"
        v-if="icon"
        :size="20"
        class="shrink-0"
        :class="error ? 'text-red-500' : 'text-gray-500'"
      />

      <input
        :value="inputValue"
        type="datetime-local"
        :placeholder="placeholder"
        :disabled="disabled"
        class="h-full w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
        @input="onInput"
      />
    </div>

    <p v-if="error" class="mt-2 text-xs text-red-400">
      {{ error }}
    </p>

    <p v-else-if="hint" class="mt-2 text-xs leading-relaxed text-gray-500">
      {{ hint }}
    </p>
  </div>
</template>
