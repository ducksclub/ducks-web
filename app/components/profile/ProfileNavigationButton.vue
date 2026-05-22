<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    variant?: 'default' | 'admin'
  }>(),
  {
    variant: 'default',
  },
)

const emit = defineEmits<{
  click: []
}>()

const isAdminVariant = computed(() => props.variant === 'admin')

const rootClass = computed(() => {
  if (isAdminVariant.value) {
    return [
      'border-red-500/15',
      'bg-red-500/10',
      'shadow-[0_0_24px_rgba(239,68,68,0.06)]',
      'hover:border-red-500/30',
      'hover:bg-red-500/15',
    ]
  }

  return [
    'border-white/5',
    'bg-(--secondary)/20',
    'hover:border-(--logo-bg)/25',
    'hover:bg-white/6',
  ]
})

const arrowClass = computed(() => {
  if (isAdminVariant.value) {
    return ['border-red-500/20', 'bg-red-500/10', 'text-red-200', 'group-hover:bg-red-500/20']
  }

  return [
    'border-white/10',
    'bg-white/4',
    'text-(--logo-bg)',
    'group-hover:border-(--logo-bg)/25',
    'group-hover:bg-(--logo-bg)/10',
  ]
})

const subtitleClass = computed(() => {
  return isAdminVariant.value ? 'text-red-200/70' : 'text-gray-500'
})
</script>

<template>
  <button
    type="button"
    class="group relative flex w-full items-center justify-between overflow-hidden rounded-3xl border px-5 py-4 text-left transition-all duration-200 active:scale-[0.98]"
    :class="rootClass"
    @click="emit('click')"
  >
    <span
      class="pointer-events-none absolute inset-0 bg-linear-to-r from-white/6 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
    />

    <div class="relative min-w-0">
      <span class="block truncate text-xs font-black uppercase tracking-wider text-white">
        {{ title }}
      </span>

      <span
        v-if="subtitle"
        class="mt-1 block truncate text-[11px] font-medium"
        :class="subtitleClass"
      >
        {{ subtitle }}
      </span>
    </div>

    <span
      class="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl border transition-all duration-200 group-hover:translate-x-0.5"
      :class="arrowClass"
    >
      →
    </span>
  </button>
</template>
