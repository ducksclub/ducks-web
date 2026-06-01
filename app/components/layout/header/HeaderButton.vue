<script lang="ts" setup>
const props = defineProps<{
  path?: string
}>()

const emit = defineEmits<{
  click: []
}>()

const { impact } = useTelegramHaptics()

const handleClick = () => {
  impact('light')
  emit('click')
  if (props.path) {
    navigateTo(props.path)
  }
}
</script>

<template>
  <button
    type="button"
    @click="handleClick"
    class="flex size-8 items-center justify-center rounded-xl bg-(--logo-bg)/80 text-white transition-all active:scale-95"
  >
    <slot />
  </button>
</template>
