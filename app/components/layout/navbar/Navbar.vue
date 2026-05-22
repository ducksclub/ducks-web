<script setup lang="ts">
const route = useRoute()

provide('activeRoute', route)
</script>

<template>
  <nav class="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-115 px-3 pb-safe">
    <div
      class="mb-2 rounded-3xl border border-white/5 bg-(--bg)/85 p-1 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
    >
      <div class="flex items-center gap-1">
        <slot />
      </div>
    </div>
  </nav>
</template>
