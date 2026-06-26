<script setup lang="ts">
import { useEventsApi } from '~/api/events.api'
import { useEventRegistrationApi } from '~/api/event-registration.api'
import { EventGameType, type Event } from '~/types/event'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import EventSeatModal from '~/components/events/EventSeatModal.vue'
import { gameTypeColors } from '~/constants/categories'
import { Calendar, ChevronDown, Map, ShareIcon, Users } from '@lucide/vue'
import HeaderButton from '~/components/layout/header/HeaderButton.vue'
import { useShare } from '~/composables/helpers/useShare'

definePageMeta({
  layout: 'empty',
})

useHead({
  title: "Duck's | Событие",
})

const route = useRoute()
const eventId = computed(() => route.params.id as string)
const eventsApi = useEventsApi()
const auth = useAuthStore()
const { isAuthenticated, user } = storeToRefs(auth)

const event = ref<Event>()
const isLoadingEvent = ref(false)
const error = ref<string | null>(null)
const registeredPlayersOpen = ref(false)
const registeredPlayerNicknames = ref<string[]>([])
const isLoadingRegisteredPlayers = ref(false)
const registeredPlayersError = ref<string | null>(null)

const { isRegistered, register, unregister, fetchStatus, isLoading } =
  useEventRegistrationApi(eventId)

const { seatInfo, isSeatLoading, seatError, isSeatModalOpen, openSeatModal, closeSeatModal } =
  useEventSeat(eventId)

const isPokerEvent = computed(() => event.value?.gameType === EventGameType.POKER)

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

    event.value = await eventsApi.getEvent(eventId.value)
  } catch (e) {
    error.value = 'Не удалось загрузить событие'
  } finally {
    isLoadingEvent.value = false
  }
}

const fetchRegisteredPlayers = async () => {
  try {
    isLoadingRegisteredPlayers.value = true
    registeredPlayersError.value = null

    const response = await eventsApi.getEventParticipants(eventId.value)
    registeredPlayerNicknames.value = response.participants
      .map((participant) => participant.user?.nickname)
      .filter((nickname): nickname is string => Boolean(nickname))
  } catch (e) {
    registeredPlayersError.value = 'Не удалось загрузить список игроков'
  } finally {
    isLoadingRegisteredPlayers.value = false
  }
}

const registerForEvent = async () => {
  try {
    await register()
    await Promise.all([fetchEvent(), fetchRegisteredPlayers()])
  } catch (e: any) {
    useNotify().error(e?.data?.message || e?.message || 'Не удалось записаться на событие')
  }
}

const unregisterFromEvent = async () => {
  try {
    await unregister()
    closeSeatModal()
    await Promise.all([fetchEvent(), fetchRegisteredPlayers()])
  } catch (e: any) {
    useNotify().error(e?.data?.message || e?.message || 'Не удалось отменить запись')
  }
}

const onShare = () => {
  useShare().share({
    title: event.value?.title || 'Событие в Duck’S GameClub',
    text: `Встречаемся в Duck’S! 🦆\nЯ уже зарегистрирован на "${event.value?.title || 'Duck’S GameClub'}" ${formatDate(event.value!.startsAt, { dateStyle: 'long', timeStyle: 'full' })} ${event.value?.city}, ${event.value?.address}  💪✨ \n\nРегистрация тут 👇👇👇`,
    url: window.location.href,
  })
}

onMounted(async () => {
  const requests = [fetchEvent(), fetchRegisteredPlayers()]

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
      <HeaderButton @click="onShare">
        <ShareIcon class="size-4" />
      </HeaderButton>
    </template>
  </BaseHeader>

  <div class="p-4 pb-24 space-y-5">
    <!-- LOADING -->
    <div v-if="isLoadingEvent" class="space-y-3 animate-pulse">
      <div class="h-44 rounded-2xl bg-white/5" />
      <div class="h-4 w-2/3 rounded bg-white/5" />
      <div class="h-4 w-1/2 rounded bg-white/5" />
    </div>

    <div
      v-else-if="error"
      class="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
    >
      {{ error }}
    </div>

    <div v-else-if="event" class="space-y-5">
      <!-- IMAGE -->
      <div class="relative overflow-hidden rounded-2xl border border-white/5 bg-(--secondary)/20">
        <NuxtImg
          v-if="event.imageUrl"
          :src="renderPicture(event.imageUrl)"
          class="h-52 w-full object-cover"
        />

        <div v-else class="h-52 flex items-center justify-center text-gray-600">
          Нет изображения
        </div>

        <div
          class="absolute top-3 right-3 rounded-full border px-3 py-1 text-[10px] font-bold tracking-widest"
          :class="statusMap[event.status].class ?? statusMap.draft.class"
        >
          {{ getStatusLabel(event.status) }}
        </div>
      </div>

      <!-- TITLE -->
      <div class="rounded-2xl border border-white/5 bg-(--secondary)/20 p-5 space-y-3">
        <h1 class="text-lg font-black uppercase tracking-tight">{{ event.title }}</h1>

        <p class="text-white font-semibold">
          {{ event.address }}
        </p>

        <span
          class="inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium tracking-widest backdrop-blur-sm"
          :class="gameTypeColors[event.gameType]"
        >
          {{ getGameLabel(event.gameType) }}
        </span>
      </div>

      <!-- WHEN + WHERE -->
      <div class="rounded-2xl border border-white/5 bg-(--secondary)/20 p-5 space-y-3">
        <p class="text-[10px] text-gray-500 uppercase tracking-widest">Когда и где</p>

        <div class="space-y-2 text-sm text-white">
          <div class="flex items-center gap-2">
            <Map class="size-4 text-gray-400" />
            <span>{{ event.city }} — {{ event.address }}</span>
          </div>

          <div class="flex items-center gap-2">
            <Calendar class="size-4 text-gray-400" />
            <span>
              {{ formatDate(event.startsAt, { dateStyle: 'long', timeStyle: 'long' }) }}
            </span>
          </div>
        </div>
      </div>

      <!-- RULES -->
      <div class="rounded-2xl border border-white/5 bg-(--secondary)/20 p-5 space-y-3">
        <p class="text-[10px] text-gray-500 uppercase tracking-widest">Общие правила</p>
        <p class="text-sm text-gray-200 whitespace-pre-wrap">{{ event.gameRules }}</p>
      </div>

      <!-- FEATURES -->
      <div class="rounded-2xl border border-white/5 bg-(--secondary)/20 p-5 space-y-3">
        <p class="text-[10px] text-gray-500 uppercase tracking-widest">Особенности</p>
        <p class="text-sm text-gray-200 whitespace-pre-wrap">{{ event.features }}</p>
      </div>

      <!-- INFO GRID -->
      <div class="grid grid-cols-1 gap-3">
        <div class="rounded-2xl border border-white/5 bg-(--secondary)/20 p-4">
          <p class="text-[10px] text-gray-500 uppercase tracking-widest">Участники</p>
          <p class="mt-1 text-sm font-bold">
            {{ event._count?.registrations }} / {{ event.participantLimit }}
          </p>
        </div>

        <div
          v-if="hasSeatingInfo"
          class="rounded-2xl border border-white/5 bg-(--secondary)/20 p-4"
        >
          <p class="text-[10px] text-gray-500 uppercase tracking-widest">Посадка</p>
          <p class="mt-1 text-sm font-bold text-white">
            {{ seatingTableCount }} столов · по {{ event.seatsPerTable }} мест
          </p>
          <p v-if="seatingTotalSeats" class="mt-1 text-xs text-gray-400">
            Всего мест: {{ seatingTotalSeats }}
          </p>
        </div>
      </div>

      <div class="rounded-2xl border border-white/5 bg-(--secondary)/20">
        <button
          type="button"
          class="flex w-full items-center gap-3 p-4 text-left transition hover:bg-white/5"
          :aria-expanded="registeredPlayersOpen"
          @click="registeredPlayersOpen = !registeredPlayersOpen"
        >
          <span
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-300"
          >
            <Users class="size-4" />
          </span>

          <span class="min-w-0 flex-1">
            <span class="block text-[10px] font-medium uppercase tracking-widest text-gray-500">
              Уже зарегистрированы
            </span>
            <span class="mt-1 block text-sm font-bold text-white">
              {{ registeredPlayersCount }} игроков
            </span>
          </span>

          <ChevronDown
            class="size-4 shrink-0 text-gray-500 transition-transform duration-200"
            :class="{ 'rotate-180 text-red-300': registeredPlayersOpen }"
          />
        </button>

        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="max-h-0 opacity-0"
          enter-to-class="max-h-80 opacity-100"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="max-h-80 opacity-100"
          leave-to-class="max-h-0 opacity-0"
        >
          <div v-if="registeredPlayersOpen" class="overflow-hidden border-t border-white/5">
            <div v-if="isLoadingRegisteredPlayers" class="space-y-2 p-4">
              <div class="h-4 rounded bg-white/5" />
              <div class="h-4 w-2/3 rounded bg-white/5" />
            </div>

            <div v-else-if="registeredPlayersError" class="p-4 text-sm text-red-300">
              {{ registeredPlayersError }}
            </div>

            <div v-else-if="registeredPlayerNicknames.length" class="max-h-72 overflow-y-auto p-2">
              <div
                v-for="(nickname, index) in registeredPlayerNicknames"
                :key="nickname"
                class="rounded-xl px-3 py-2 text-sm font-semibold"
                :class="user?.nickname === nickname ? 'text-(--logo-bg)' : 'text-gray-200'"
              >
                <b>{{ index + 1 }} - </b>
                <span>{{ nickname }} {{ user?.nickname === nickname ? '(Вы)' : '' }}</span>
              </div>
            </div>

            <div v-else class="p-4 text-sm text-gray-400">Пока никто не зарегистрирован</div>
          </div>
        </Transition>
      </div>

      <template v-if="isAuthenticated">
        <!-- CTA -->
        <div v-if="event.status === 'published'" class="pt-2">
          <BaseButton
            v-if="!isRegistered"
            :loading="isLoading"
            :disabled="isLoading"
            class="w-full"
            @click="registerForEvent"
          >
            Участвовать
          </BaseButton>

          <div v-else-if="isPokerEvent" class="space-y-3">
            <BaseButton
              :loading="isSeatLoading"
              :disabled="isSeatLoading || isLoading"
              class="w-full mt-0"
              @click="openSeatModal"
            >
              Узнать место
            </BaseButton>

            <BaseButton
              variant="secondary"
              :loading="isLoading"
              :disabled="isLoading || isSeatLoading"
              class="w-full mt-0"
              @click="unregisterFromEvent"
            >
              Отменить запись
            </BaseButton>
          </div>

          <BaseButton
            v-else
            variant="secondary"
            :loading="isLoading"
            :disabled="isLoading"
            class="w-full"
            @click="unregisterFromEvent"
          >
            Отменить запись
          </BaseButton>
        </div>

        <!-- FINISHED STATE -->
        <div
          v-else
          class="rounded-2xl border border-white/5 bg-white/5 p-4 text-center text-sm text-gray-400"
        >
          Событие недоступно
        </div>

        <EventSeatModal
          :open="isSeatModalOpen"
          :seat-info="seatInfo"
          :error="seatError"
          @close="closeSeatModal"
        />
      </template>

      <template v-else>
        <BaseButton class="w-full" @click="navigateTo(`/signin`)"> Зарегистрироваться </BaseButton>
      </template>
    </div>
  </div>
</template>
