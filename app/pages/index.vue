<script setup lang="ts">
import { getApiErrorMessage } from '~/shared/api/api-error'
import NearestEvents from '~/components/home/NearestEvents.vue'
import Information from '~/components/ui/Information.vue'
import { useEventsCatalog } from '~/features/events/composables/useEventsCatalog'
import type { Event } from '~/features/events/model/event'

definePageMeta({
  layout: 'default',
  middleware: 'auth',
})

useHead({
  title: "Duck's | Главная",
})

const { getNearestEvents } = useEventsCatalog()

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
