<template>
  <div class="relative group">
    <span
      class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-(--logo-bg)"
    >
      <slot name="icon" />
    </span>

    <input
      v-bind="$attrs"
      class="w-full bg-(--secondary)/20 border border-white/5 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-(--logo-bg)/50 transition placeholder:text-gray-600 text-sm"
    />
  </div>
</template>
