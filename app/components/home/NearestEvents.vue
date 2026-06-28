<script lang="ts" setup>
import type { Event } from '~/types/event.types'

defineProps<{
  events: Event[]
}>()
</script>

<template>
  <section v-if="events && events.length" class="space-y-4">
    <div class="flex items-center justify-between px-1">
      <h3 class="text-[11px] font-bold uppercase tracking-[0.22em] text-gray-500">
        Ближайшие события
      </h3>

      <NuxtLink to="/events" class="text-[11px] font-medium text-(--accent)"> Все </NuxtLink>
    </div>

    <div class="grid gap-3" :style="{ gridTemplateColumns: `repeat(${events.length}, 1fr)` }">
      <HomeEventCard v-for="e in events" :key="e.id" :event="e" />
    </div>
  </section>
</template>
