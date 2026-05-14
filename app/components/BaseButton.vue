<template>
  <button :type="type" :disabled="disabled || loading" :class="classes" @click="onClick">
    <span v-if="loading" class="flex items-center justify-center gap-2">
      <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>

      <span>Загрузка...</span>
    </span>

    <span v-else>
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit'
    variant?: 'primary' | 'secondary' | 'ghost'
    loading?: boolean
    disabled?: boolean
  }>(),
  {
    type: 'button',
    variant: 'primary',
    loading: false,
    disabled: false,
  },
)

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const { impact } = useTelegramHaptics()

const base =
  'w-full mt-5 py-4 rounded-xl font-bold uppercase text-xs tracking-widest transition active:scale-[0.97] flex items-center justify-center'

const variants = {
  primary: 'bg-[var(--logo-bg)] text-white hover:bg-(--logo-bg)/80',
  secondary: 'bg-[var(--secondary)] text-white hover:bg-(--secondary)/80',
  ghost: 'bg-transparent border border-white/10 text-white',
}

const classes = computed(() => [
  base,
  variants[props.variant],
  (props.disabled || props.loading) && 'opacity-50 cursor-not-allowed active:scale-100',
])

const onClick = (e: MouseEvent) => {
  impact('light')
  if (props.disabled || props.loading) return
  emit('click', e)
}
</script>
