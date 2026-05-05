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
import NavEvents from '~/components/icons/NavEvents.vue'
import NavRating from '~/components/icons/NavRating.vue'
import NavProfile from '~/components/icons/NavProfile.vue'
import NavRules from '~/components/icons/NavRules.vue'
import NavSupport from '~/components/icons/NavSupport.vue'

const nav = [
  { label: 'Афиша', path: '/events', icon: NavEvents },
  { label: 'Рейтинг', path: '/rating', icon: NavRating },
  { label: 'Профиль', path: '/profile', icon: NavProfile },
  { label: 'Правила', path: '/rules', icon: NavRules },
  { label: 'Help', path: '/support', icon: NavSupport },
]
</script>
