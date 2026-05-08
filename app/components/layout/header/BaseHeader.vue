<template>
  <header class="sticky top-0 z-30 border-b border-white/5 bg-(--bg)/85 backdrop-blur-2xl">
    <div class="grid h-14 grid-cols-[90px_1fr_90px] items-center px-4">
      <div class="flex items-center">
        <slot name="left" />
      </div>

      <div class="min-w-0 text-center">
        <slot />
      </div>

      <div class="flex justify-end">
        <slot name="right" />
      </div>
    </div>
  </header>
</template>
