<script lang="ts" setup>
import { CircleHelp, Info, ScrollText } from '@lucide/vue'

const infoItems = [
  { label: 'О клубе', icon: Info },
  { label: 'Поддержка', icon: CircleHelp },
  { label: 'Правила', icon: ScrollText },
]
</script>

<template>
  <section class="grid grid-cols-2 gap-3">
    <NuxtLink
      to="/location"
      class="relative min-h-29.5 overflow-hidden rounded-xl border border-white/5 bg-white/3 p-4 backdrop-blur-xl transition active:scale-[0.98]"
    >
      <div class="absolute inset-0 bg-linear-to-br from-sky-500/20 via-sky-500/5 to-transparent" />

      <div class="relative z-10 flex h-full items-start justify-between gap-3">
        <div>
          <p class="text-base font-bold leading-tight text-white">Как нас найти</p>
          <p class="mt-2 text-xs leading-relaxed text-gray-400">
            БП «ПАРК МИРА» <br />
            Проспект Мира 102 стр25 <br />
            Ⓜ️Алексеевская
          </p>
        </div>
        <div class="text-xl text-sky-300">🎯</div>
      </div>
    </NuxtLink>

    <NuxtLink
      to="/info"
      class="group relative min-h-[118px] overflow-hidden rounded-xl border border-red-400/10 bg-white/3 px-4 py-3 backdrop-blur-xl transition active:scale-[0.98]"
    >
      <div class="absolute inset-0 bg-linear-to-br from-red-500/25 via-red-500/7 to-transparent" />
      <div
        class="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-red-500/20 blur-2xl transition group-hover:bg-red-500/30"
      />

      <div class="relative z-10 flex h-full min-w-0 flex-col justify-between gap-3">
        <div class="flex items-center justify-between gap-3">
          <p class="min-w-0 truncate text-base font-bold leading-tight text-white">Информация</p>

          <span
            class="flex size-8 shrink-0 items-center justify-center rounded-2xl border border-red-300/15 bg-red-500/15 text-red-200 shadow-[0_10px_28px_rgba(220,38,38,0.18)]"
          >
            <Info :size="16" />
          </span>
        </div>

        <div class="grid gap-1">
          <div
            v-for="item in infoItems"
            :key="item.label"
            class="flex h-6 min-w-0 items-center gap-1.5 rounded-xl border border-white/6 bg-black/18 px-2 text-white/82"
          >
            <component :is="item.icon" :size="12" class="shrink-0 text-red-200/85" />
            <span class="min-w-0 truncate text-[10px] font-semibold leading-none">
              {{ item.label }}
            </span>
          </div>
        </div>
      </div>
    </NuxtLink>
  </section>
</template>
