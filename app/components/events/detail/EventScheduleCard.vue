<script setup lang="ts">
import { formatDate } from '~/utils/date'
import { Calendar, Map } from '@lucide/vue'
import type { Event } from '~~/shared/types/event'

defineProps<{
  event: Event
}>()
</script>

<template>
  <section class="rounded-2xl border border-white/5 bg-(--secondary)/20 p-5 space-y-3">
    <p class="text-[10px] text-gray-500 uppercase tracking-widest">Когда и где</p>

    <div class="space-y-2 text-sm text-white">
      <div class="flex items-center gap-2">
        <Map class="size-4 shrink-0 text-gray-400" />
        <span>{{ event.city }} - {{ event.address }}</span>
      </div>

      <div class="flex items-center gap-2">
        <Calendar class="size-4 shrink-0 text-gray-400" />
        <span>
          {{ formatDate(event.startsAt, { dateStyle: 'long', timeStyle: 'long' }) }}
        </span>
      </div>
    </div>
  </section>
</template>
