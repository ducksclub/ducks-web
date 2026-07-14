<script setup lang="ts">
import type { Event } from '~/types/event'
import ActiveEventBadge from './ActiveEventBadge.vue'

const props = defineProps<{
  event: Event
}>()

const emit = defineEmits<{
  (e: 'open', id: string): void
}>()

const open = () => emit('open', props.event.id)

const formattedDate = computed(() =>
  formatDate(props.event.startsAt, {
    dateStyle: 'long',
    timeStyle: 'short',
  }),
)
</script>

<template>
  <button
    type="button"
    class="group relative block w-full overflow-hidden rounded-3xl border border-white/5 bg-(--secondary)/20 text-left shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:border-(--logo-bg)/20 hover:bg-white/5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.22)] active:translate-y-0 active:scale-[0.99]"
    :aria-label="`Открыть событие ${event.title}`"
    @click="open"
  >
    <div
      class="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-(--logo-bg)/10 blur-3xl transition group-hover:bg-(--logo-bg)/15"
    />

    <div class="relative flex gap-4 p-3.5">
      <div class="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-black/30 shadow-lg">
        <NuxtImg
          v-if="event.imageUrl"
          :src="renderPicture(event.imageUrl)"
          :alt="event.title"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div
          v-else
          class="flex h-full w-full items-center justify-center bg-white/3 px-2 text-center text-[10px] font-bold uppercase tracking-wider text-gray-600"
        >
          Нет изображения
        </div>

        <div class="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />

        <ActiveEventBadge type="active" class="absolute bottom-2 left-2 shadow-lg">
          ● активное
        </ActiveEventBadge>
      </div>

      <div class="flex min-w-0 flex-1 flex-col py-0.5">
        <div class="flex items-start gap-2">
          <h2 class="line-clamp-2 flex-1 text-[15px] font-bold leading-snug text-white">
          {{ event.title }}
          </h2>

          <span
            aria-hidden="true"
            class="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/5 bg-white/5 text-base text-gray-500 transition-all group-hover:border-(--logo-bg)/20 group-hover:bg-(--logo-bg)/10 group-hover:text-white"
          >
            ›
          </span>
        </div>

        <p
          class="mt-2 w-fit rounded-lg border border-white/5 bg-black/20 px-2 py-1 text-[11px] font-semibold text-gray-300"
        >
          {{ formattedDate }}
        </p>

        <p class="mt-2 truncate text-[11px] text-gray-500">
          {{ event.address }}
        </p>

        <div class="mt-auto flex flex-wrap items-center gap-2 pt-2">
          <ActiveEventBadge type="game">
            {{ getGameLabel(event.gameType) }}
          </ActiveEventBadge>

          <span class="text-[10px] font-medium text-gray-500">
            {{ event._count?.registrations ?? 0 }} участников
          </span>
        </div>
      </div>
    </div>
  </button>
</template>
