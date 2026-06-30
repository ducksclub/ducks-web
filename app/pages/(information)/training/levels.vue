<script setup lang="ts">
import { getApiErrorMessage } from '~/utils/api/api-error'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import Information from '~/components/ui/Information.vue'

definePageMeta({
  layout: 'empty',
})

import { contentApi } from '~/utils/api/content'
import { ContentType, type Content } from '~~/shared/types/content'

const { getContents } = contentApi
const { impact } = useTelegramHaptics()

const contents = ref<Content[]>([])
const openedKey = ref<string | null>(null)
const isLoading = ref(false)
const errorMessage = ref('')

const toggleStep = (key: string) => {
  openedKey.value = openedKey.value === key ? null : key
  impact('light')
}

const fetchContent = async () => {
  if (isLoading.value) return

  try {
    isLoading.value = true
    errorMessage.value = ''

    contents.value = await getContents({
      key: ContentType.POKER_LEVELS,
    })
  } catch (error) {
    errorMessage.value = getApiErrorMessage(error, 'Не удалось загрузить обучение')
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
      :steps="errorMessage ? [] : steps"
      :opened-key="openedKey"
      :is-loading="isLoading"
      @toggle="toggleStep"
    />

    <div
      v-if="errorMessage"
      class="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300"
    >
      {{ errorMessage }}
    </div>

    <BaseButton class="mt-6 w-full" @click="goToEvents"> Смотреть события </BaseButton>

    <Information class="mt-4">
      Информация о ближайших обучениях публикуется в афише клуба.
    </Information>
  </div>
</template>
