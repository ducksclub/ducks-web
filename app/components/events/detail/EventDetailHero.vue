<script setup lang="ts">
import { renderPicture } from '~/shared/lib/media'
import type { Event } from '~/features/events/model/event'
import { statusMap } from '~/features/events/model/event.helpers'

const props = defineProps<{
  event: Event
}>()

const statusConfig = computed(() => {
  return statusMap[props.event.status] ?? statusMap.draft
})
</script>

<template>
  <div class="relative overflow-hidden rounded-2xl border border-white/5 bg-(--secondary)/20">
    <NuxtImg
      v-if="event.imageUrl"
      :src="renderPicture(event.imageUrl)"
      class="h-52 w-full object-cover"
    />

    <div v-else class="h-52 flex items-center justify-center text-gray-600">Нет изображения</div>

    <div
      class="absolute top-3 right-3 rounded-full border px-3 py-1 text-[10px] font-bold tracking-widest"
      :class="statusConfig.class"
    >
      {{ statusConfig.label }}
    </div>
  </div>
</template>
