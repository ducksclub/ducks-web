<template>
  <div class="min-h-screen bg-[#0F0F0F] text-white font-sans pb-32">
    <!-- Основной контент -->
    <slot />

    <!-- Нижний Navbar (Bottom Navigation) -->
    <nav
      class="fixed bottom-0 left-0 right-0 bg-[#141414]/90 backdrop-blur-xl border-t border-white/5 px-4 py-3 flex justify-between items-center z-50 shadow-[0_-10px_25px_rgba(0,0,0,0.5)]"
    >
      <NuxtLink
        v-for="item in nav"
        :key="item.path"
        :to="item.path"
        class="flex flex-col items-center gap-1 group flex-1"
      >
        <div
          :class="[
            $route.path === item.path ? 'text-[#E11D48]' : 'text-gray-600',
            'transition-all duration-300 group-active:scale-75',
          ]"
        >
          <span class="text-2xl">{{ item.icon }}</span>
        </div>
        <span
          :class="[
            'text-[9px] font-black uppercase tracking-tighter transition-colors',
            $route.path === item.path ? 'text-[#E11D48]' : 'text-gray-600',
          ]"
        >
          {{ item.label }}
        </span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup>
const nav = [
  { label: 'Афиша', path: '/events', icon: '🗓️' },
  { label: 'Рейтинг', path: '/rating', icon: '🏆' },
  { label: 'Моё', path: '/profile', icon: '🕶️' },
  { label: 'Правила', path: '/rules', icon: '📜' },
  { label: 'Help', path: '/support', icon: '💬' },
]
</script>
