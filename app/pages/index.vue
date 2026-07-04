<script setup lang="ts">
import Information from '~/components/ui/Information.vue'
import { useEventsApi } from '~/api/events.api'
import { EventGameStatus } from '~/types/event'
import type { Event } from '~/types/event'

definePageMeta({
  layout: 'default',
  middleware: 'auth',
})

useHead({
  title: "Duck's | Главная",
})

const api = useEventsApi()

const topEvents = ref<Event[]>([])
const loadTopEvents = async () => {
  const events = await api.getEvents({ status: EventGameStatus.PUBLISHED })

  if (!events?.length) {
    topEvents.value = []
    return
  }

  const now = Date.now()

  const nearestEvents = events
    .filter((event) => {
      const startsAt = new Date(event.startsAt).getTime()
      const endsAt = event.endsAt ? new Date(event.endsAt).getTime() : null

      // Если есть endsAt — показываем событие, которое еще не закончилось
      if (endsAt) {
        return endsAt >= now
      }

      // Если endsAt нет — показываем только будущие события
      return startsAt >= now
    })
    .sort((a, b) => {
      return new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
    })
    .slice(0, 1)

  topEvents.value = nearestEvents
}

onMounted(() => {
  loadTopEvents()
})
</script>

<template>
  <main class="space-y-5 px-4 pb-6 pt-4">
    <HomeHero />

    <template v-if="topEvents.length">
      <HomeEventCard v-for="e in topEvents" :key="e.id" :event="e" />
    </template>

    <HomeNavigation />

    <Information class="mt-2">
      Все игры клуба DUCK'S не предполагают материального вознаграждения. Только рейтинг.
    </Information>
  </main>
</template>
