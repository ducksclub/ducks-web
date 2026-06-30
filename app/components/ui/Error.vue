<script lang="ts" setup>
defineProps<{
  message: string | null
}>()
</script>

<template>
  <div class="text-center text-sm text-(--warning)">
    {{ message }}
  </div>
</template>
