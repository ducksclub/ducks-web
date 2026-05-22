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
  const { data: events } = await api.getEvents({ status: EventGameStatus.PUBLISHED })

  if (events && !events?.length) {
    topEvents.value = []
    return
  }

  const nearestEvents = [...events]
    .sort((a, b) => {
      return new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
    })
    .slice(0, 2)

  topEvents.value = nearestEvents
}

onMounted(() => {
  loadTopEvents()
})
</script>

<template>
  <main class="space-y-5 px-4 pb-6 pt-4">
    <HomeHero />

    <section v-if="topEvents.length" class="space-y-4">
      <div class="flex items-center justify-between px-1">
        <h3 class="text-[11px] font-bold uppercase tracking-[0.22em] text-gray-500">
          Ближайшие события
        </h3>

        <NuxtLink to="/events" class="text-[11px] font-medium text-(--accent)"> Все </NuxtLink>
      </div>

      <div class="grid gap-3" :style="{ gridTemplateColumns: `repeat(${topEvents.length}, 1fr)` }">
        <HomeEventCard v-for="e in topEvents" :key="e.id" :event="e" />
      </div>
    </section>

    <HomeNavigation />

    <Information class="mt-2">
      Все игры клуба DUCK'S не предполагают материального вознаграждения. Только рейтинг.
    </Information>
  </main>
</template>
