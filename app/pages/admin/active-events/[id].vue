<script setup lang="ts">
import { useEventsApi } from '~/api/events.api'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderMenu from '~/components/layout/header/HeaderMenu.vue'
import HeaderMenuItem from '~/components/layout/header/HeaderMenuItem.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import EventParticipantsList from '~/components/admin/event/EventParticipantsList.vue'
import type { Event, Participant } from '~/types/event'

definePageMeta({
  layout: 'empty',
  middleware: 'admin',
})

const route = useRoute()
const id = route.params.id as string

const api = useEventsApi()

const event = ref<Event>()
const participants = ref<Participant[]>([])

const isLoading = ref(true)
const isFinalizing = ref(false)

const load = async () => {
  isLoading.value = true

  try {
    const [e, p] = await Promise.all([api.getEvent(id), api.getEventParticipants(id)])

    event.value = e
    participants.value = p.participants
  } finally {
    isLoading.value = false
  }
}

onMounted(load)

const finalize = async () => {
  if (event.value?.status === 'completed') return

  if (!confirm('Финализировать событие?')) return

  isFinalizing.value = true

  try {
    await api.finalizeEvent(id)
    await load()
  } finally {
    isFinalizing.value = false
  }
}
</script>

<template>
  <BaseHeader>
    <template #left>
      <HeaderBackButton />
    </template>

    <template #default>
      <HeaderTitle title="Участники" />
    </template>

    <template #right>
      <HeaderMenu>
        <HeaderMenuItem danger @click="finalize"> Завершить </HeaderMenuItem>
      </HeaderMenu>
    </template>
  </BaseHeader>

  <EventParticipantsList
    :loading="isLoading"
    :participants="participants"
    :event="event"
  />
</template>
