<script setup lang="ts">
import { getApiErrorMessage } from '~/utils/api/api-error'
import { eventsApi } from '~/utils/api/events'
import ActiveEventsList from '~/components/admin/events/ActiveEventsList.vue'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import type { Event } from '~~/shared/types/event'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const router = useRouter()
const { getActiveEventsNow } = eventsApi

const events = ref<Event[]>([])
const isLoading = ref(true)
const errorMessage = ref('')

const load = async () => {
  isLoading.value = true

  try {
    errorMessage.value = ''
    const res = await getActiveEventsNow()
    events.value = res.data
  } catch (error) {
    errorMessage.value = getApiErrorMessage(error, 'Не удалось загрузить активные события')
  } finally {
    isLoading.value = false
  }
}

onMounted(load)

const openEvent = (id: string) => {
  router.push(`/admin/active-events/${id}`)
}
</script>

<template>
  <BaseHeader>
    <template #left>
      <HeaderBackButton />
    </template>

    <template #default>
      <HeaderTitle title="Активные события" />
    </template>
  </BaseHeader>

  <div
    v-if="errorMessage"
    class="mx-4 mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300"
  >
    {{ errorMessage }}
  </div>

  <ActiveEventsList v-else :events="events" :loading="isLoading" @open="openEvent" />
</template>
