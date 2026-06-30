<script setup lang="ts">
import { ShareIcon } from '@lucide/vue'
import { EventGameStatus, EventGameType, type Event } from '~/types/event'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderButton from '~/components/layout/header/HeaderButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import EventSeatModal from '~/components/events/EventSeatModal.vue'
import EventDetailHero from '~/components/events/detail/EventDetailHero.vue'
import EventDetailSkeleton from '~/components/events/detail/EventDetailSkeleton.vue'
import EventDetailSummary from '~/components/events/detail/EventDetailSummary.vue'
import EventParticipantsPanel from '~/components/events/detail/EventParticipantsPanel.vue'
import EventRegistrationActions from '~/components/events/detail/EventRegistrationActions.vue'
import EventScheduleCard from '~/components/events/detail/EventScheduleCard.vue'
import EventStatsGrid from '~/components/events/detail/EventStatsGrid.vue'
import EventTextSection from '~/components/events/detail/EventTextSection.vue'
import { useShare } from '~/composables/helpers/useShare'
import { useAuthService } from '~/composables/services/useAuthService'
import { useEventRegistrationService } from '~/composables/services/useEventRegistrationService'
import { useEventService } from '~/composables/services/useEventService'

definePageMeta({
  layout: 'empty',
})

useHead({
  title: "Duck's | Событие",
})

const route = useRoute()
const notify = useNotify()
const auth = useAuthService()
const eventService = useEventService()

const eventId = computed(() => route.params.id as string)
const event = ref<Event | null>(null)
const isLoadingEvent = ref(false)
const error = ref<string | null>(null)

const registeredPlayersOpen = ref(false)
const registeredPlayerNicknames = ref<string[]>([])
const isLoadingRegisteredPlayers = ref(false)
const registeredPlayersError = ref<string | null>(null)

const { isRegistered, register, unregister, fetchStatus, isLoading } =
  useEventRegistrationService(eventId)

const { seatInfo, isSeatLoading, seatError, isSeatModalOpen, openSeatModal, closeSeatModal } =
  useEventSeat(eventId)

const isAuthenticated = computed(() => Boolean(auth.accessToken.value))
const currentNickname = computed(() => auth.profile.value?.nickname ?? null)
const isPokerEvent = computed(() => event.value?.gameType === EventGameType.POKER)
const isPublished = computed(() => event.value?.status === EventGameStatus.PUBLISHED)

const seatingTotalSeats = computed(() => {
  if (!isPokerEvent.value || !event.value?.seatsPerTable) return null

  return event.value.maxParticipants ?? event.value.participantLimit ?? null
})

const seatingTableCount = computed(() => {
  if (!seatingTotalSeats.value || !event.value?.seatsPerTable) return null

  return event.value.tableCount ?? Math.ceil(seatingTotalSeats.value / event.value.seatsPerTable)
})

const hasSeatingInfo = computed(() => {
  return Boolean(isPokerEvent.value && seatingTableCount.value && event.value?.seatsPerTable)
})

const registeredPlayersCount = computed(() => {
  return event.value?._count?.registrations ?? registeredPlayerNicknames.value.length
})

const fetchEvent = async () => {
  try {
    isLoadingEvent.value = true
    error.value = null
    event.value = await eventService.getEvent(eventId.value)
  } catch (e) {
    error.value = getApiErrorMessage(e, 'Не удалось загрузить событие')
  } finally {
    isLoadingEvent.value = false
  }
}

const fetchRegisteredPlayers = async () => {
  try {
    isLoadingRegisteredPlayers.value = true
    registeredPlayersError.value = null

    const response = await eventService.getEventParticipants(eventId.value)
    registeredPlayerNicknames.value = response.participants
      .map((participant) => participant.user?.nickname)
      .filter((nickname): nickname is string => Boolean(nickname))
  } catch (e) {
    registeredPlayersError.value = getApiErrorMessage(e, 'Не удалось загрузить список игроков')
  } finally {
    isLoadingRegisteredPlayers.value = false
  }
}

const refreshEventData = async () => {
  await Promise.all([fetchEvent(), fetchRegisteredPlayers()])
}

const registerForEvent = async () => {
  try {
    await register()
    await refreshEventData()
  } catch (e) {
    notify.error(getApiErrorMessage(e, 'Не удалось записаться на событие'))
  }
}

const unregisterFromEvent = async () => {
  try {
    await unregister()
    closeSeatModal()
    await refreshEventData()
  } catch (e) {
    notify.error(getApiErrorMessage(e, 'Не удалось отменить запись'))
  }
}

const onShare = () => {
  if (!event.value || !import.meta.client) return

  useShare().share({
    title: event.value.title || 'Событие в Duck’S GameClub',
    text: `Встречаемся в Duck’S!\nЯ уже зарегистрирован на "${event.value.title || 'Duck’S GameClub'}" ${formatDate(event.value.startsAt, { dateStyle: 'long', timeStyle: 'full' })} ${event.value.city}, ${event.value.address}\n\nРегистрация тут:`,
    url: window.location.href,
  })
}

onMounted(async () => {
  const requests: Promise<void>[] = [refreshEventData()]

  if (isAuthenticated.value) {
    requests.push(fetchStatus())
  }

  await Promise.all(requests)
})
</script>

<template>
  <BaseHeader>
    <template #left>
      <HeaderBackButton />
    </template>

    <template #default>
      <HeaderTitle title="Событие" />
    </template>

    <template #right>
      <HeaderButton :disabled="!event" @click="onShare">
        <ShareIcon class="size-4" />
      </HeaderButton>
    </template>
  </BaseHeader>

  <main class="p-4 pb-24 space-y-5">
    <EventDetailSkeleton v-if="isLoadingEvent" />

    <div
      v-else-if="error"
      class="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
    >
      {{ error }}
    </div>

    <div v-else-if="event" class="space-y-5">
      <EventDetailHero :event="event" />
      <EventDetailSummary :event="event" />
      <EventScheduleCard :event="event" />
      <EventTextSection title="Общие правила" :text="event.gameRules" />
      <EventTextSection title="Особенности" :text="event.features" />

      <EventStatsGrid
        :registrations-count="event._count?.registrations ?? 0"
        :participant-limit="event.participantLimit"
        :has-seating-info="hasSeatingInfo"
        :seating-table-count="seatingTableCount"
        :seats-per-table="event.seatsPerTable"
        :seating-total-seats="seatingTotalSeats"
      />

      <EventParticipantsPanel
        v-model:open="registeredPlayersOpen"
        :count="registeredPlayersCount"
        :nicknames="registeredPlayerNicknames"
        :current-nickname="currentNickname"
        :pending="isLoadingRegisteredPlayers"
        :error="registeredPlayersError"
      />

      <EventRegistrationActions
        :is-authenticated="isAuthenticated"
        :is-published="isPublished"
        :is-registered="isRegistered"
        :is-poker-event="isPokerEvent"
        :is-registration-loading="isLoading"
        :is-seat-loading="isSeatLoading"
        @register="registerForEvent"
        @unregister="unregisterFromEvent"
        @open-seat="openSeatModal"
        @signin="navigateTo('/signin')"
      />

      <EventSeatModal
        v-if="isAuthenticated"
        :open="isSeatModalOpen"
        :seat-info="seatInfo"
        :error="seatError"
        @close="closeSeatModal"
      />
    </div>
  </main>
</template>
