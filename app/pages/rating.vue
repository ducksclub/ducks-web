<script setup lang="ts">
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import Skeleton from '~/components/rating/Skeleton.vue'
import { useRatingLeaderboard } from '~/composables/useRatingLeaderboard'
import { EventGameType } from '~~/shared/types/event'

definePageMeta({
  middleware: 'auth',
})

useHead({
  title: "Duck's | Рейтинг игроков",
})

const activeTab = ref(EventGameType.POKER)

const tabs = [
  { label: 'Покер', value: EventGameType.POKER },
  { label: 'Дартс', value: EventGameType.DARTS },
  { label: 'Бильярд', value: EventGameType.POOL },
]

const { pending, rating, error, getRating } = useRatingLeaderboard()

watch(
  activeTab,
  () => {
    getRating(activeTab.value)
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <BaseHeader>
    <template #default>
      <HeaderTitle title="Рейтинг игроков" />
    </template>
  </BaseHeader>

  <div class="p-4">
    <RatingTabsSegmented v-model="activeTab" :items="tabs" />

    <div class="mt-4">
      <Skeleton v-if="pending" />
      <UiEmptyList v-else-if="!rating.length" />
      <UiError v-else-if="error" :message="error" />

      <RatingLeaderboard v-else :rating="rating" />
    </div>
  </div>
</template>
