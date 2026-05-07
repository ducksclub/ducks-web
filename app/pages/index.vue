<script lang="ts" setup>
definePageMeta({
  layout: false,
})

onMounted(() => {
  navigateTo('/login')
})
</script>

<template>
  <h1 class="text-lg text-taupe-600">Hello, World!</h1>
</template>
