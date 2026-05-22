<script setup lang="ts">
const props = defineProps<{
  path: string
}>()

const route = inject<any>('activeRoute')
const { impact } = useTelegramHaptics()

const isActive = computed(() => {
  return route?.path === props.path || route?.path.startsWith(`${props.path}/`)
})

const handleClick = () => {
  impact('light')
}
</script>

<template>
  <NuxtLink
    :to="props.path"
    class="group relative flex flex-1 flex-col items-center justify-center rounded-2xl px-2 py-3 transition-all duration-200 active:scale-95"
    :class="isActive ? 'bg-white/8' : 'hover:bg-white/4'"
    @click="handleClick"
  >
    <div
      class="flex h-6 w-6 items-center justify-center transition-colors duration-200"
      :class="isActive ? 'text-(--logo-bg)' : 'text-gray-500 group-hover:text-gray-400'"
    >
      <slot name="icon" />
    </div>

    <span
      class="mt-0.5 text-[10px] font-bold leading-none tracking-wide transition-colors duration-200"
      :class="isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-400'"
    >
      <slot />
    </span>
  </NuxtLink>
</template>
