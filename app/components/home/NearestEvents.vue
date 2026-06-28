<script lang="ts" setup>
import type { Event } from '~/types/event.types'

defineProps<{
  events: Event[]
}>()
</script>

<template>
  <section v-if="events?.length" class="space-y-3">
    <div class="flex items-center justify-between px-1">
      <h3 class="text-[11px] font-black uppercase tracking-[0.22em] text-white/35">
        Ближайшие события
      </h3>

      <NuxtLink to="/events" class="text-[11px] font-bold text-(--logo-bg) active:opacity-70">
        Все
      </NuxtLink>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <HomeEventCard
        v-for="event in events"
        :key="event.id"
        :event="event"
        :class="events.length === 1 && 'col-span-2'"
      />
    </div>
  </section>
</template>
