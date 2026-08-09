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

const eventStartDate = formatDate(props.event.startsAt, {
  dateStyle: 'medium',
  timeStyle: 'short',
})

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
    class="relative block border overflow-hidden rounded-2xl bg-white/3 backdrop-blur-xl transition active:scale-[0.98]"
    :class="styles?.ring"
  >
    <div
      class="absolute -top-10 -right-10 h-32 w-32 rounded-full blur-3xl opacity-70"
      :class="styles?.glow"
    />

    <div class="absolute inset-0 bg-linear-to-br" :class="styles?.gradient" />
    <div class="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />

    <div class="relative z-10 aspect-16/10 w-full overflow-hidden bg-black/30">
      <NuxtImg
        v-if="event.imageUrl"
        :src="renderPicture(event.imageUrl)"
        class="block h-full w-full object-cover"
      />

      <div v-else class="flex h-full w-full items-center justify-center text-5xl">
        {{ styles?.icon }}
      </div>

      <div class="absolute right-0 bottom-0 p-2.5">
        <div class="inline-flex min-w-0 flex-col items-end gap-2">
          <p
            class="rounded-xl border border-white/10 bg-black/60 px-2.5 py-2 text-[10px] font-medium leading-tight text-white/85 shadow-[0_8px_24px_rgba(0,0,0,0.4)] backdrop-blur-md drop-shadow-[0_1px_5px_rgba(0,0,0,0.9)] w-fit"
          >
            {{ eventStartDate }}
          </p>

          <span
            class="rounded-lg bg-(--logo-bg) px-3 py-1.5 text-center text-[10px] font-bold leading-none text-white shadow-[0_6px_18px_rgba(220,38,38,0.35)]"
          >
            Зарегистрироваться
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
