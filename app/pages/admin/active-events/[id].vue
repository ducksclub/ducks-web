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
const isFinalizeConfirmOpen = ref(false)
let reorderTimer: ReturnType<typeof setTimeout> | undefined
let reorderVersion = 0

const updatePoints = (participantId: string, points: number) => {
  if (event.value?.status === 'completed') return

  const participant = participants.value.find((item) => item.id === participantId)
  if (!participant) return

  participant.points = points
  reorderVersion += 1
  const requestVersion = reorderVersion

  clearTimeout(reorderTimer)
  reorderTimer = setTimeout(async () => {
    try {
      const updatedParticipants = await api.reorderParticipants(id, {
        participants: participants.value.map((item) => ({
          userId: item.userId,
          points: item.points ?? 0,
        })),
      })

      if (requestVersion === reorderVersion) {
        participants.value = updatedParticipants
      }
    } catch (error: any) {
      useNotify().error(error?.data?.message || 'Не удалось сохранить баллы')
    }
  }, 500)
}

onBeforeUnmount(() => clearTimeout(reorderTimer))

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

  isFinalizing.value = true

  try {
    await api.finalizeEvent(id)
    isFinalizeConfirmOpen.value = false
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
        <HeaderMenuItem danger @click="isFinalizeConfirmOpen = true"> Завершить </HeaderMenuItem>
      </HeaderMenu>
    </template>
  </BaseHeader>

  <EventParticipantsList
    :loading="isLoading"
    :participants="participants"
    :event="event"
    @update-points="updatePoints"
  />

  <UiConfirmDialog
    :open="isFinalizeConfirmOpen"
    title="Завершить событие?"
    description="Результаты будут зафиксированы, баллы начислены участникам, а дальнейшее редактирование станет недоступно."
    confirm-label="Завершить"
    danger
    :loading="isFinalizing"
    @close="isFinalizeConfirmOpen = false"
    @confirm="finalize"
  />
</template>
