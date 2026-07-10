<script setup lang="ts">
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import Information from '~/components/ui/Information.vue'

definePageMeta({
  layout: 'empty',
})

import { useContentApi } from '~/api/content.api'
import { ContentType, type Content } from '~/types/api/content.types'
import { ClientUiTypes } from '~/types/client-ui'

const { getContents } = useContentApi()
const { impact } = useTelegramHaptics()

const contents = ref<Content[]>([])
const openedKey = ref<string | null>(null)
const isLoading = ref(false)

const trainingSections = [
  {
    key: 'poker',
    title: ClientUiTypes.POKER,
    body: 'Базовое и продвинутое обучение игре: правила, комбинации, позиции, банкролл и игровая дисциплина.',
  },
  {
    key: 'dealer',
    title: ClientUiTypes.DEALER,
    body: 'Обучение работе дилера: раздача, контроль банка, коммуникация за столом и стандарты клуба.',
  },
  {
    key: 'floor',
    title: ClientUiTypes.FLOOR,
    body: 'Подготовка флора: организация игры, решение спорных ситуаций и контроль качества сервиса.',
  },
  {
    key: 'administrator',
    title: ClientUiTypes.ADMINISTRATOR,
    body: 'Обучение администраторов: прием гостей, запись на события, работа с расписанием и поддержка игроков.',
  },
  {
    key: 'manager',
    title: ClientUiTypes.MANAGER,
    body: 'Подготовка управляющих: операционные процессы клуба, команда, сервис и контроль смены.',
  },
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

const goToTrainingSignup = () => {
  impact('light')
  navigateTo('/events')
}

onMounted(fetchContent)
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
      @click="goToTrainingSignup"
    >
      Записаться на обучение
    </BaseButton>

    <Information class="mt-4">
      Информация о ближайших обучениях публикуется в афише клуба.
    </Information>
  </div>
</template>
