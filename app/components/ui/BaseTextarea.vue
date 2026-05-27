<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string
    label?: string
    placeholder?: string
    disabled?: boolean
    error?: string
    hint?: string
    icon?: Component
    rows?: number
    maxlength?: number
    resize?: boolean
  }>(),
  {
    disabled: false,
    rows: 4,
    resize: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div>
    <label v-if="label" class="mb-2 block text-sm text-gray-400">
      {{ label }}
    </label>

    <div
      class="flex min-h-28 gap-3 rounded-2xl border bg-(--secondary)/20 px-4 py-3 transition"
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
        class="mt-0.5 shrink-0"
        :class="error ? 'text-red-500' : 'text-gray-500'"
      />

      <textarea
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :rows="rows"
        :maxlength="maxlength"
        class="min-h-full w-full bg-transparent text-sm leading-relaxed outline-none placeholder:text-gray-500"
        :class="resize ? 'resize-y' : 'resize-none'"
        @input="onInput"
      />
    </div>

    <div v-if="error || hint || maxlength" class="mt-2 flex items-start justify-between gap-3">
      <p v-if="error" class="text-xs text-red-400">
        {{ error }}
      </p>

      <p v-else-if="hint" class="text-xs leading-relaxed text-gray-500">
        {{ hint }}
      </p>

      <span
        v-if="maxlength"
        class="ml-auto shrink-0 text-xs text-gray-500"
        :class="modelValue.length >= maxlength ? 'text-red-400' : 'text-gray-500'"
      >
        {{ modelValue.length }}/{{ maxlength }}
      </span>
    </div>
  </div>
</template>
