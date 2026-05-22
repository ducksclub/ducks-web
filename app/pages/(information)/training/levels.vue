<script setup lang="ts">
import { GraduationCap } from '@lucide/vue'

import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import Information from '~/components/ui/Information.vue'

import { useContentApi } from '~/api/content.api'
import { ContentType, type Content } from '~/types/api/content.types'

const { getContents } = useContentApi()
const { impact } = useTelegramHaptics()

const contents = ref<Content[]>([])
const openedKey = ref<string | null>(null)
const isLoading = ref(false)

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
  return contents.value.map((item, index) => ({
    key: item.key,
    title: item.title ?? `Уровень ${index + 1}`,
    body: item.body ?? '',
  }))
})

const goToEvents = () => {
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

    <BaseButton class="mt-6 w-full" @click="goToEvents"> Смотреть события </BaseButton>

    <Information class="mt-4">
      Информация о ближайших обучениях публикуется в афише клуба.
    </Information>
  </div>
</template>
