<script setup lang="ts">
import type { Event } from '~/types/event'

const props = defineProps<{
  event: Event
}>()

const emit = defineEmits<{
  deleteEvent: [eventId: string]
}>()

const statusConfig = computed(() => {
  const status = props.event.status
  return statusMap[status] ?? statusMap.draft
})

const registrationsCount = computed(() => {
  return props.event._count?.registrations ?? 0
})

const participantLimit = computed(() => {
  return props.event.participantLimit ?? 0
})

const progressPercent = computed(() => {
  if (!participantLimit.value) return 0

  return Math.min(Math.round((registrationsCount.value / participantLimit.value) * 100), 100)
})

const formattedDate = computed(() => {
  return formatDate(props.event.startsAt, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
})
</script>

<template>
  <article
    class="group overflow-hidden rounded-3xl border border-white/5 bg-(--secondary)/20 transition-all duration-200 hover:border-white/10 hover:bg-white/4 active:scale-[0.99]"
  >
    <!-- IMAGE -->
    <div class="relative h-40 w-full overflow-hidden bg-black/30">
      <img
        v-if="event.imageUrl"
        :src="renderPicture(event.imageUrl)"
        :alt="event.address"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div
        v-else
        class="flex h-full items-center justify-center bg-white/3 text-xs font-bold uppercase tracking-widest text-gray-600"
      >
        No image
      </div>

      <!-- Image overlay -->
      <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/10" />

      <!-- Status -->
      <div class="absolute left-3 top-3">
        <span
          class="rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-widest backdrop-blur-xl"
          :class="statusConfig?.class"
        >
          {{ statusConfig?.label }}
        </span>
      </div>

      <!-- Game type -->
      <div class="absolute right-3 top-3">
        <span
          class="rounded-full border border-white/10 bg-black/35 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-(--logo-bg) backdrop-blur-xl"
        >
          {{ getGameLabel(event.gameType) }}
        </span>
      </div>

      <!-- Title on image -->
      <div class="absolute inset-x-0 bottom-0 p-4">
        <h3 class="line-clamp-2 text-base font-black leading-tight text-white">
          {{ event.title }}
        </h3>

        <p class="mt-1 text-[11px] font-semibold text-gray-400">
          {{ formattedDate }}
        </p>
      </div>
    </div>

    <!-- CONTENT -->
    <div class="space-y-4 p-4">
      <!-- PARTICIPANTS -->
      <div class="rounded-2xl border border-white/5 bg-black/15 p-3">
        <div class="mb-2 flex items-center justify-between">
          <span class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
            Участники
          </span>

          <span class="text-xs font-black text-white tabular-nums">
            {{ registrationsCount }}/{{ participantLimit }}
          </span>
        </div>

        <div class="h-1.5 overflow-hidden rounded-full bg-white/5">
          <div
            class="h-full rounded-full bg-(--logo-bg) transition-all duration-300"
            :style="{ width: `${progressPercent}%` }"
          />
        </div>
      </div>

      <!-- ACTIONS -->
      <div class="grid grid-cols-2 gap-2">
        <NuxtLink
          :to="`/admin/events/${event.id}`"
          class="rounded-2xl border border-white/5 bg-white/4 px-4 py-3 text-center text-xs font-black uppercase tracking-wide text-white transition hover:border-(--logo-bg)/25 hover:bg-white/[0.07] active:scale-[0.98]"
        >
          Редактировать
        </NuxtLink>

        <button
          type="button"
          class="rounded-2xl border border-red-500/10 bg-red-500/10 px-4 py-3 text-xs font-black uppercase tracking-wide text-red-300 transition hover:border-red-500/25 hover:bg-red-500/15 active:scale-[0.98]"
          @click="emit('deleteEvent', event.id)"
        >
          Удалить
        </button>
      </div>
    </div>
  </article>
</template>
