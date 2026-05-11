<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string | number
    label?: string
    type?: string
    inputmode?: string
    placeholder?: string
    disabled?: boolean
    error?: string
    icon?: Component
  }>(),
  {
    type: 'text',
    disabled: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement

  emit('update:modelValue', target.value)
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
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        class="h-full w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
        @input="onInput"
      />
    </div>

    <p v-if="error" class="mt-2 text-xs text-red-400">
      {{ error }}
    </p>
  </div>
</template>
