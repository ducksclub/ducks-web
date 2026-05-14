<script setup lang="ts">
const props = defineProps<{
  path: string
}>()

const route = inject<any>('activeRoute')
const { impact } = useTelegramHaptics()

const isActive = computed(() => route?.path === props.path)

const handleClick = () => {
  impact('light')
}
</script>

<template>
  <NuxtLink
    @click="handleClick"
    :to="props.path"
    class="relative flex flex-1 flex-col items-center justify-center py-1 transition active:scale-95"
  >
    <!-- ICON -->
    <div
      class="relative z-10 transition-all duration-200"
      :class="isActive ? 'text-(--logo-bg)' : 'text-gray-500'"
    >
      <slot name="icon" />
    </div>

    <!-- LABEL -->
    <span
      class="relative z-10 mt-1 text-[10px] font-semibold uppercase tracking-wider transition-colors"
      :class="isActive ? 'text-white' : 'text-gray-500'"
    >
      <slot />
    </span>
  </NuxtLink>
</template>
