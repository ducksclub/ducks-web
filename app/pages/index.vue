<script setup lang="ts">
import NearestEvents from '~/components/home/NearestEvents.vue'
import Information from '~/components/ui/Information.vue'
import { useEventService } from '~/composables/services/useEventService'
import type { Event } from '~/types/event.types'

definePageMeta({
  layout: 'default',
  middleware: 'auth',
})

useHead({
  title: "Duck's | Главная",
})

const { getNearestEvents } = useEventService()

const pending = ref<boolean>(false)
const nearestEvents = ref<Event[]>([])

const loadNearestEvents = async () => {
  pending.value = true

  try {
    nearestEvents.value = await getNearestEvents()
  } catch (e) {
    useNotify().error(getApiErrorMessage(e, 'Не удалось загрузить ближайшие события'))
  } finally {
    pending.value = false
  }
}

onMounted(() => {
  loadNearestEvents()
})
</script>

<template>
  <main class="space-y-5 px-4 pb-6 pt-4">
    <HomeHero />
    <NearestEvents :events="nearestEvents" />
    <HomeNavigation />
    <Information class="mt-2">
      Все игры клуба DUCK'S не предполагают материального вознаграждения. Только рейтинг.
    </Information>
  </main>
</template>
