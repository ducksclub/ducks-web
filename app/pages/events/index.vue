<script setup lang="ts">
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import { useEventsCatalog } from '~/features/events/composables/useEventsCatalog'

definePageMeta({
  middleware: 'auth',
})

const { events, pending, getEvents } = useEventsCatalog()

onMounted(() => {
  getEvents()
})
</script>

<template>
  <div class="text-white pb-32">
    <BaseHeader>
      <template #default>
        <HeaderTitle title="Афиша" />
      </template>
    </BaseHeader>

    <div class="p-4 space-y-6">
      <section>
        <h3 class="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 ml-2">
          Все события
        </h3>

        <div v-if="pending" class="space-y-3">
          <div v-for="i in 3" :key="i" class="h-24 rounded-xl bg-(--secondary)/20 animate-pulse" />
        </div>

        <div v-else-if="events && !events.length" class="mt-4 text-sm text-gray-500 text-center">
          Нет данных
        </div>

        <div v-else class="space-y-3">
          <EventsCard v-for="event in events" :key="event.id" :event="event" />
        </div>
      </section>
    </div>
  </div>
</template>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
