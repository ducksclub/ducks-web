<script lang="ts" setup>
defineProps<{
  path: string
}>()

const { impact } = useTelegramHaptics()

const go = (path: string) => {
  impact('light')
  navigateTo(path)
}
</script>

<template>
  <button
    type="button"
    @click="go(path)"
    class="flex size-8 items-center justify-center rounded-xl bg-(--logo-bg)/80 text-white transition-all active:scale-95"
  >
    <slot />
  </button>
</template>
