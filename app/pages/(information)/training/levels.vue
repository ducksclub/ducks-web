<script setup lang="ts">
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import Information from '~/components/ui/Information.vue'

definePageMeta({
  layout: 'empty',
})

import { useContentApi } from '~/api/content.api'
import { useClientUiApi } from '~/api/clientUi.api'
import { ContentType, type Content } from '~/types/api/content.types'
import { ClientUiTypes } from '~/types/client-ui'
import type { ClientUiRegistration } from '~/types/client-ui'

const { getContents } = useContentApi()
const clientUiApi = useClientUiApi()
const { impact } = useTelegramHaptics()
const notify = useNotify()
const auth = useAuthStore()
const { user } = storeToRefs(auth)

const contents = ref<Content[]>([])
const registrations = ref<ClientUiRegistration[]>([])
const myRegistration = ref<ClientUiRegistration | null>(null)
const openedKey = ref<string | null>(null)
const isLoading = ref(false)
const isRegistrationSubmitting = ref(false)
const isRegistrationsLoading = ref(false)
const registrationsError = ref<string | null>(null)
const isAdmin = computed(() => user.value?.role === 'admin')
const isRegistered = computed(() => Boolean(myRegistration.value))

const trainingSections = [
  {
    key: 'poker',
    title: ClientUiTypes.POKER,
    body: 'Базовое и продвинутое обучение игре: правила, комбинации, позиции, банкролл и игровая дисциплина.',
  },
  // {
  //   key: 'dealer',
  //   title: ClientUiTypes.DEALER,
  //   body: 'Обучение работе дилера: раздача, контроль банка, коммуникация за столом и стандарты клуба.',
  // },
  // {
  //   key: 'floor',
  //   title: ClientUiTypes.FLOOR,
  //   body: 'Подготовка флора: организация игры, решение спорных ситуаций и контроль качества сервиса.',
  // },
  // {
  //   key: 'administrator',
  //   title: ClientUiTypes.ADMINISTRATOR,
  //   body: 'Обучение администраторов: прием гостей, запись на события, работа с расписанием и поддержка игроков.',
  // },
  // {
  //   key: 'manager',
  //   title: ClientUiTypes.MANAGER,
  //   body: 'Подготовка управляющих: операционные процессы клуба, команда, сервис и контроль смены.',
  // },
] as const

const normalizeTitle = (title: string) => title.trim().toUpperCase()

const toggleStep = (key: string) => {
  openedKey.value = openedKey.value === key ? null : key
  impact('light')
}

const fetchContent = async () => {
  if (isLoading.value) return

  try {
    isLoading.value = true

    contents.value = await getContents({
      key: ContentType.POKER_LEVELS,
    })
  } catch (error) {
    console.error('Ошибка загрузки обучения:', error)
  } finally {
    isLoading.value = false
  }
}

const fetchRegistrations = async () => {
  if (!isAdmin.value || isRegistrationsLoading.value) return

  isRegistrationsLoading.value = true
  registrationsError.value = null

  try {
    const response = await clientUiApi.getClientUiRegistrations(ClientUiTypes.POKER)

    registrations.value = response.registrations
  } catch (error) {
    console.error('Ошибка загрузки записавшихся на обучение:', error)
    registrations.value = []
    registrationsError.value = 'Не удалось загрузить список записавшихся'
  } finally {
    isRegistrationsLoading.value = false
  }
}

const fetchMyRegistration = async () => {
  try {
    const response = await clientUiApi.getMyClientUiRegistration(ClientUiTypes.POKER)

    myRegistration.value = response.registration
  } catch (error) {
    console.error('Ошибка загрузки статуса записи на обучение:', error)
    myRegistration.value = null
  }
}

const steps = computed(() => {
  const contentByTitle = new Map(
    contents.value.map((item) => [normalizeTitle(item.title ?? ''), item.body ?? '']),
  )

  return trainingSections.map((section) => ({
    key: section.key,
    title: section.title,
    body: contentByTitle.get(normalizeTitle(section.title)) || section.body,
  }))
})

const goToTrainingSignup = async () => {
  if (isRegistrationSubmitting.value) return

  impact('light')
  isRegistrationSubmitting.value = true

  try {
    if (isRegistered.value) {
      const response = await clientUiApi.unregisterFromClientUi(ClientUiTypes.POKER)

      myRegistration.value = null
      registrations.value = response.registrations
      notify.success('Вы отписались от обучения')
      return
    }

    const response = await clientUiApi.registerForClientUi(ClientUiTypes.POKER)

    myRegistration.value = response.registration
    registrations.value = response.registrations
    notify.success('Вы записаны на обучение')
  } catch (error: any) {
    notify.error(error?.data?.message || error?.message || 'Не удалось изменить запись')
  } finally {
    isRegistrationSubmitting.value = false
  }
}

onMounted(() => {
  fetchContent()
  fetchMyRegistration()
  fetchRegistrations()
})
</script>

<template>
  <BaseHeader>
    <template #left>
      <HeaderBackButton />
    </template>

    <template #default>
      <HeaderTitle title="Обучение" />
    </template>
  </BaseHeader>

  <div class="p-6">
    <PokerLevelsHero class="mb-6" />

    <PokerLevelsSteps
      :steps="steps"
      :opened-key="openedKey"
      :is-loading="isLoading"
      @toggle="toggleStep"
    />

    <BaseButton
      class="mt-7 w-full border! border-red-300/40! bg-red-500! text-white! shadow-[0_0_18px_rgba(239,68,68,0.55),0_0_42px_rgba(239,68,68,0.3)] hover:bg-red-400! hover:shadow-[0_0_24px_rgba(248,113,113,0.72),0_0_58px_rgba(239,68,68,0.42)]"
      :loading="isRegistrationSubmitting"
      @click="goToTrainingSignup"
    >
      {{ isRegistered ? 'Отписаться от обучения' : 'Записаться на обучение' }}
    </BaseButton>

    <section
      v-if="isAdmin"
      class="mt-5 overflow-hidden rounded-2xl border border-white/5 bg-black/10"
    >
      <div class="flex items-center justify-between gap-3 border-b border-white/5 px-4 py-3">
        <h2 class="text-sm font-black text-white">Записавшиеся</h2>
        <span class="text-xs font-bold text-gray-400">{{ registrations.length }}</span>
      </div>

      <div v-if="isRegistrationsLoading" class="px-4 py-5 text-sm font-medium text-gray-400">
        Загрузка списка...
      </div>

      <div v-else-if="registrationsError" class="px-4 py-5 text-sm text-red-300">
        {{ registrationsError }}
      </div>

      <div v-else-if="registrations.length" class="divide-y divide-white/5">
        <div
          v-for="registration in registrations"
          :key="registration.id"
          class="flex items-center gap-3 px-4 py-3"
        >
          <NuxtImg
            v-if="registration.user.avatarUrl"
            :src="registration.user.avatarUrl"
            :alt="registration.user.nickname"
            class="size-9 rounded-full object-cover"
          />
          <div
            v-else
            class="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-black text-white"
          >
            {{ registration.user.nickname.slice(0, 1).toUpperCase() }}
          </div>

          <p class="min-w-0 flex-1 truncate text-sm font-bold text-white">
            {{ registration.user.nickname }}
          </p>
        </div>
      </div>

      <div v-else class="px-4 py-5 text-sm font-medium text-gray-400">Пока никто не записался</div>
    </section>

    <Information class="mt-4">
      Информация о ближайших обучениях публикуется в афише клуба.
    </Information>
  </div>
</template>
