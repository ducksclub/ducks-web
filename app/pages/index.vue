<script setup lang="ts">
import Information from '~/components/ui/Information.vue'
import { useClientUiApi } from '~/api/clientUi.api'
import { useEventsApi } from '~/api/events.api'
import { ClientUiTypes } from '~/types/client-ui'
import type { ClientUiType } from '~/types/client-ui'
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
const clientUiApi = useClientUiApi()

const events = ref<Event[]>([])
const clientUiType = ref<ClientUiType>(ClientUiTypes.POKER)

type ClientUiBanner = {
  image: string
  link: string
  label: string
}

const clientUiBanners: Record<ClientUiType, ClientUiBanner> = {
  [ClientUiTypes.POKER]: {
    image: '/assets/images/poker-training.png',
    link: '/training/levels',
    label: 'Обучение покеру',
  },
  [ClientUiTypes.DEALER]: {
    image: '/assets/images/rating-coming-soon.jpg',
    link: '/profile/franchise',
    label: 'Заявка на участие',
  },
  [ClientUiTypes.FLOOR]: {
    image: '/assets/images/way.jpg',
    link: '/rules',
    label: 'Правила клуба',
  },
  [ClientUiTypes.ADMINISTRATOR]: {
    image: '/assets/images/logo.jpg',
    link: '/support',
    label: 'Поддержка',
  },
  [ClientUiTypes.MANAGER]: {
    image: '/assets/images/duck.jpg',
    link: '/about',
    label: 'О клубе',
  },
}

const clientUiBanner = computed(() => clientUiBanners[clientUiType.value])

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

const loadClientUi = async () => {
  try {
    const setting = await clientUiApi.getClientUi()

    clientUiType.value = setting.type
  } catch (error) {
    console.error('Ошибка загрузки настройки клиентского UI:', error)
  }
}

const openEvents = () => {
  navigateTo('/events')
}

onMounted(() => {
  loadEvents()
  loadClientUi()
})
</script>

<template>
  <main class="space-y-5 px-4 pb-6 pt-4">
    <HomeHero />

    <template v-if="topEvents.length">
      <HomeEventCard v-for="e in topEvents" :key="e.id" :event="e" />
    </template>

    <HomeWeeklyTournamentSchedule :events="events" @open="openEvents" />

    <NuxtLink
      :to="clientUiBanner.link"
      class="block aspect-10/5 w-full overflow-hidden rounded-2xl border border-white/5 bg-(--secondary)/20 transition active:scale-[0.99]"
      :aria-label="clientUiBanner.label"
    >
      <NuxtImg
        :src="clientUiBanner.image"
        :alt="clientUiBanner.label"
        class="h-full w-full object-cover"
      />
    </NuxtLink>

    <HomeNavigation />

    <Information class="mt-2">
      Все игры клуба DUCK'S не предполагают материального вознаграждения. Только рейтинг.
    </Information>
  </main>
</template>
