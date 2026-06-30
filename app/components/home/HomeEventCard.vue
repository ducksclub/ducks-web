<script setup lang="ts">
import type { Event, EventGameType } from '~/types/event'

type EventGameTypeStyle = {
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
      text: 'text-violet-200',
      glow: 'bg-violet-500/20',
      gradient: 'from-violet-500/25 via-violet-500/10 to-transparent',
      ring: 'border-violet-500/20',
      icon: '🧠',
    },

    mafia: {
      text: 'text-zinc-200',
      glow: 'bg-zinc-500/20',
      gradient: 'from-zinc-400/25 via-zinc-400/10 to-transparent',
      ring: 'border-zinc-400/20',
      icon: '🎭',
    },

    poker: {
      text: 'text-red-200',
      glow: 'bg-red-500/25',
      gradient: 'from-[color:var(--logo-bg)]/30 via-[color:var(--logo-bg)]/10 to-transparent',
      ring: 'border-[color:var(--logo-bg)]/25',
      icon: '♠',
    },

    darts: {
      text: 'text-sky-200',
      glow: 'bg-sky-500/20',
      gradient: 'from-sky-500/25 via-sky-500/10 to-transparent',
      ring: 'border-sky-500/20',
      icon: '🎯',
    },

    pool: {
      text: 'text-emerald-200',
      glow: 'bg-emerald-500/20',
      gradient: 'from-emerald-500/25 via-emerald-500/10 to-transparent',
      ring: 'border-emerald-500/20',
      icon: '🎱',
    },
  }

  return map[props.event.gameType]
})
</script>

<template>
  <NuxtLink
    :to="`/events/${props.event.id}`"
    class="relative overflow-hidden rounded-2xl border bg-white/3 backdrop-blur-xl transition active:scale-[0.98]"
    :class="styles?.ring"
  >
    <div
      class="absolute -top-10 -right-10 h-32 w-32 rounded-full blur-3xl opacity-70"
      :class="styles?.glow"
    />

    <div class="absolute inset-0 bg-linear-to-br" :class="styles?.gradient" />

    <div class="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />

    <div class="relative z-10 flex items-center gap-3 p-3">
      <div class="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-black/30">
        <NuxtImg
          v-if="event.imageUrl"
          :src="renderPicture(event.imageUrl)"
          class="absolute inset-0 h-full w-full object-cover"
        />

        <div v-else class="flex h-full items-center justify-center text-2xl">
          {{ styles?.icon }}
        </div>

        <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
      </div>

      <div class="min-w-0 flex-1">
        <div class="mb-2 flex items-center justify-between gap-3">
          <span class="text-lg">
            {{ styles?.icon }}
          </span>

          <span class="text-[10px] tracking-wider text-white/30"> LIVE </span>
        </div>

        <p class="line-clamp-2 text-sm font-semibold tracking-[-0.01em]" :class="styles?.text">
          {{ event.title }}
        </p>

        <p class="text-[11px] text-gray-400">
          {{
            formatDate(event.startsAt, {
              dateStyle: 'long',
              timeStyle: 'long',
            })
          }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
