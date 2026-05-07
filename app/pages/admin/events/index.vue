<script setup lang="ts">
// import { Plus } from 'lucide-vue-next'

import { useEventsApi } from '~/api/events.api'
import EventsButtonGroup from '~/components/events/EventsButtonGroup.vue'
import { categories } from '~/constants/categories'
import type { Event } from '~/types/events'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const router = useRouter()

const { getEvents } = useEventsApi()

const selectedCategory = ref('')

const events = ref<Event[]>([])
const isLoading = ref(true)
const errorMessage = ref('')

const fetchEvents = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await getEvents({
      gameType: selectedCategory.value,
    })

    events.value = response.data
  } catch (error: any) {
    errorMessage.value = error?.error || 'Ошибка загрузки'
  } finally {
    isLoading.value = false
  }
}

const goToCreate = () => {
  router.push('/admin/events/create')
}

watch(selectedCategory, fetchEvents, {
  immediate: true,
})
</script>

<template>
  <div class="relative min-h-screen">
    <LayoutHeader>
      <div class="flex items-center justify-between w-full">
        <span>Афиша</span>

        <button
          class="flex items-center gap-2 rounded-lg bg-(--primary) px-4 py-2 text-xs font-medium text-white transition hover:opacity-90 active:scale-95"
          @click="goToCreate"
        >
          Создать
        </button>
      </div>
    </LayoutHeader>

    <div class="sticky top-0 z-10 bg-(--background)/80 backdrop-blur-md">
      <EventsButtonGroup v-model="selectedCategory" class="p-6 pt-4" :list="categories" />
    </div>

    <div class="p-6 pb-32">
      <div v-if="isLoading" class="space-y-3">
        <div v-for="i in 4" :key="i" class="h-28 animate-pulse rounded-2xl bg-(--secondary)/20" />
      </div>

      <div
        v-else-if="errorMessage"
        class="rounded-2xl border border-(--warning)/20 bg-(--warning)/5 p-6 text-center"
      >
        <p class="text-(--warning)">
          {{ errorMessage }}
        </p>

        <button class="mx-auto mt-3 text-sm underline" @click="fetchEvents">Повторить</button>
      </div>

      <div
        v-else-if="!events.length"
        class="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 py-20 text-center"
      >
        <p class="text-lg font-medium text-white">Пока нет событий</p>

        <p class="mt-2 text-sm text-gray-400">Создайте первое мероприятие клуба</p>

        <button
          class="mt-5 rounded-2xl bg-(--primary) px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
          @click="goToCreate"
        >
          Создать событие
        </button>
      </div>

      <div v-else class="space-y-4">
        <AdminEventCard v-for="event in events" :key="event.id" :event="event" />
      </div>
    </div>
  </div>
</template>
