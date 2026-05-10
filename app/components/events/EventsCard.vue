<script lang="ts" setup>
import { Calendar } from '@lucide/vue'
import type { Event } from '~/types/events'

const props = defineProps<{
  event: Event
}>()

const statusConfig = computed(() => {
  const status = props.event.status

  return statusMap[status] ?? statusMap.draft
})

const gameTypeColors: Record<string, string> = {
  quiz: 'bg-violet-500/15 text-violet-300 border border-violet-500/20',
  mafia: 'bg-zinc-400/15 text-zinc-300 border border-zinc-400/20',
  poker: 'bg-red-500/15 text-red-300 border border-red-500/20',
  darts: 'bg-blue-500/15 text-blue-300 border border-blue-500/20',
  billiards: 'bg-emerald-700/20 text-emerald-300 border border-emerald-600/20',
}
</script>

<template>
  <div
    class="relative flex gap-4 rounded-2xl border border-white/5 bg-(--secondary)/20 p-4 transition-all duration-300 hover:bg-white/5 hover:border-white/10 active:scale-[0.99] cursor-pointer"
    @click="navigateTo(`/events/${event.id}`)"
  >
    <div
      class="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-black/20"
    >
      <NuxtImg
        v-if="event.imageUrl"
        :src="renderPicture(event.imageUrl)"
        class="h-full w-full object-cover"
      />

      <div v-else class="text-[10px] text-gray-600">NO IMAGE</div>
    </div>

    <div class="min-w-0 flex-1">
      <div class="flex items-start justify-between gap-3">
        <h4 class="truncate text-sm font-bold text-white">
          {{ event.address }}
        </h4>

        <span
          class="shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-widest"
          :class="statusConfig?.class"
        >
          {{ statusConfig?.label }}
        </span>
      </div>

      <div class="mt-2 flex items-center gap-3 text-[11px] text-gray-500">
        <span class="flex items-center gap-1">
          <Calendar :size="12" />
          {{
            formatDate(event.startsAt, {
              dateStyle: 'medium',
              timeStyle: 'short',
            })
          }}
        </span>

        <span class="text-gray-700">•</span>

        <span
          class="rounded-full px-2.5 py-1 text-[10px] font-medium tracking-widest backdrop-blur-sm"
          :class="gameTypeColors[event.gameType]"
        >
          {{ getGameLabel(event.gameType) }}
        </span>
      </div>
    </div>
  </div>
</template>
