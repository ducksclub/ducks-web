<script setup lang="ts">
import { formatDate } from '~/shared/lib/date'
import { Clock } from '@lucide/vue'
import type { Event, EventGameType } from '~/features/events/model/event'

type EventGameTypeStyle = {
  label: string
  text: string
  glow: string
  gradient: string
  ring: string
  icon: string
}

const props = defineProps<{
  event: Event
}>()

const styles = computed(() => {
  const map: Record<EventGameType, EventGameTypeStyle> = {
    quiz: {
      label: 'Квиз',
      text: 'text-violet-100',
      glow: 'bg-violet-500/18',
      gradient: 'from-violet-500/18 via-violet-500/6 to-transparent',
      ring: 'border-violet-400/18',
      icon: '🧠',
    },

    mafia: {
      label: 'Мафия',
      text: 'text-zinc-100',
      glow: 'bg-zinc-400/18',
      gradient: 'from-zinc-300/16 via-zinc-400/6 to-transparent',
      ring: 'border-zinc-300/18',
      icon: '🎭',
    },

    poker: {
      label: 'Покер',
      text: 'text-orange-50',
      glow: 'bg-(--logo-bg)/22',
      gradient: 'from-[color:var(--logo-bg)]/22 via-[color:var(--logo-bg)]/8 to-transparent',
      ring: 'border-[color:var(--logo-bg)]/24',
      icon: '♠',
    },

    darts: {
      label: 'Дартс',
      text: 'text-sky-100',
      glow: 'bg-sky-500/18',
      gradient: 'from-sky-500/18 via-sky-500/6 to-transparent',
      ring: 'border-sky-400/18',
      icon: '🎯',
    },

    pool: {
      label: 'Бильярд',
      text: 'text-emerald-100',
      glow: 'bg-emerald-500/18',
      gradient: 'from-emerald-500/18 via-emerald-500/6 to-transparent',
      ring: 'border-emerald-400/18',
      icon: '🎱',
    },
  }

  return map[props.event.gameType]
})
</script>

<template>
  <NuxtLink
    :to="`/events/${event.id}`"
    class="relative block overflow-hidden rounded-[20px] border bg-[#07080d] p-3.5 shadow-[0_10px_28px_rgba(0,0,0,0.32)] transition active:scale-[0.985]"
    :class="styles.ring"
  >
    <div
      class="absolute -right-10 -top-10 h-24 w-24 rounded-full blur-3xl opacity-75"
      :class="styles.glow"
    />

    <div class="absolute inset-0 bg-linear-to-br" :class="styles.gradient" />
    <div class="absolute inset-0 bg-linear-to-b from-white/4 to-black/20" />
    <div
      class="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/8"
    />

    <div class="relative z-10">
      <div class="flex items-center justify-between gap-2">
        <div
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/8 text-base"
        >
          {{ styles.icon }}
        </div>

        <span class="text-[9px] font-black uppercase tracking-[0.16em] text-white/30"> Live </span>
      </div>

      <p class="mt-3 text-[9px] font-black uppercase tracking-[0.16em] text-white/35">
        {{ styles.label }}
      </p>

      <h3
        class="mt-1 line-clamp-2 min-h-8.5 text-[14px] font-black leading-[1.18] tracking-tight"
        :class="styles.text"
      >
        {{ event.title }}
      </h3>

      <div class="mt-3 flex min-w-0 items-center gap-1.5 text-white/45">
        <Clock :size="12" :stroke-width="2.4" class="shrink-0 text-white/30" />

        <p class="truncate text-[10px] font-medium leading-none">
          {{
            formatDate(event.startsAt, {
              dateStyle: 'medium',
              timeStyle: 'short',
            })
          }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
