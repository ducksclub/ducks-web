<script setup lang="ts">
import type { Event } from '~/types/event'
import { gameTypeColors } from '~/constants/categories'
import { getGameLabel } from '~/utils/labels'

defineProps<{
  event: Event
}>()
</script>

<template>
  <section class="rounded-2xl border border-white/5 bg-(--secondary)/20 p-5 space-y-3">
    <h1 class="text-lg font-black uppercase tracking-tight">{{ event.title }}</h1>

    <p class="text-white font-semibold">
      {{ event.address }}
    </p>

    <span
      class="inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium tracking-widest backdrop-blur-sm"
      :class="gameTypeColors[event.gameType]"
    >
      {{ getGameLabel(event.gameType) }}
    </span>
  </section>
</template>
