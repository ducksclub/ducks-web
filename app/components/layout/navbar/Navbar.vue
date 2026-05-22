<script setup lang="ts">
const route = useRoute()

provide('activeRoute', route)
</script>

<template>
  <nav
    class="fixed bottom-0 left-0 right-0 z-50 border-t border-x border-white/5 bg-(--bg)/60 backdrop-blur-2xl max-w-100 mx-auto pb-safe"
  >
    <div class="mx-auto flex items-center px-2 py-2">
      <slot />
    </div>
  </nav>
</template>
