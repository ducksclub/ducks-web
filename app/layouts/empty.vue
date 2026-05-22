<template>
  <div
    class="min-h-screen relative bg-(--bg) text-white pb-20 w-full max-w-115 mx-auto pt-safe"
    :style="{ paddingTop: 'var(--safe-top)' }"
  >
    <slot />
  </div>
</template>
