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

const events = ref<Event[]>([])

const upcomingEvents = computed(() => {
  const now = Date.now()

  return events.value
    .filter((event) => {
      const startsAt = new Date(event.startsAt).getTime()
      const endsAt = event.endsAt ? new Date(event.endsAt).getTime() : null

      if (endsAt) {
        return endsAt >= now
      }

      return startsAt >= now
    })
    .sort((a, b) => {
      return new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
    })
})

const topEvents = computed(() => upcomingEvents.value.slice(0, 1))

const loadEvents = async () => {
  const fetchedEvents = await api.getEvents({ status: EventGameStatus.PUBLISHED })

  if (!fetchedEvents?.length) {
    events.value = []
    return
  }

  events.value = fetchedEvents
}

const openEvents = () => {
  navigateTo('/events')
}

onMounted(() => {
  loadEvents()
})
</script>

<template>
  <main class="space-y-5 px-4 pb-6 pt-4">
    <HomeHero />

    <template v-if="topEvents.length">
      <HomeEventCard v-for="e in topEvents" :key="e.id" :event="e" />
    </template>

    <HomeWeeklyTournamentSchedule :events="events" @open="openEvents" />

    <HomeNavigation />

    <Information class="mt-2">
      Все игры клуба DUCK'S не предполагают материального вознаграждения. Только рейтинг.
    </Information>
  </main>
</template>
