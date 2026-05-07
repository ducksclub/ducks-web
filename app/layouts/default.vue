<template>
  <div class="bg-(--bg) text-white font-sans">
    <slot />

    <nav
      class="fixed bottom-0 left-0 right-0 bg-(--bg)/40 backdrop-blur-xl border-t border-white/5 px-4 py-3 flex justify-between items-center z-50"
    >
      <NuxtLink
        v-for="item in nav"
        :key="item.path"
        :to="item.path"
        class="flex flex-col items-center gap-1 flex-1 group"
      >
        <div
          :class="[
            $route.path === item.path ? 'text-(--logo-bg)' : 'text-gray-600',
            'transition group-active:scale-90',
          ]"
        >
          <component :is="item.icon" />
        </div>

        <span
          :class="[
            'text-[9px] font-black uppercase tracking-tighter',
            $route.path === item.path ? 'text-(--logo-bg)' : 'text-gray-600',
          ]"
        >
          {{ item.label }}
        </span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import CalendarIcon from '~/components/icons/CalendarIcon.vue'
import StarIcon from '~/components/icons/StarIcon.vue'
import UserIcon from '~/components/icons/UserIcon.vue'
import ListIcon from '~/components/icons/ListIcon.vue'
import InfoIcon from '~/components/icons/InfoIcon.vue'

const nav = [
  { label: 'Афиша', path: '/events', icon: CalendarIcon },
  { label: 'Рейтинг', path: '/rating', icon: StarIcon },
  { label: 'Профиль', path: '/profile', icon: UserIcon },
  { label: 'Правила', path: '/rules', icon: ListIcon },
  { label: 'Help', path: '/support', icon: InfoIcon },
]
</script>
