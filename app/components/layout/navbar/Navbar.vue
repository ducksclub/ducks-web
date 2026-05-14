<script setup lang="ts">
const route = useRoute()

provide('activeRoute', route)
</script>

<template>
  <nav
    class="fixed left-0 right-0 z-50 border-t border-white/5 bg-(--bg)/60 backdrop-blur-2xl"
    style="bottom: var(--safe-bottom)"
  >
    <div class="mx-auto flex max-w-2xl items-center px-2 py-2">
      <slot />
    </div>
  </nav>
</template>
