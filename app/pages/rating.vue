<script setup lang="ts">
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import { EventGameType } from '~/types/event'

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

// const { rating, isLoading, error } = useRatingQuery(activeTab)
</script>

<template>
  <BaseHeader>
    <template #default>
      <HeaderTitle title="Рейтинг игроков" />
    </template>
  </BaseHeader>

  <main class="px-4 pb-6 pt-4">
    <RatingTabsSegmented v-model="activeTab" :items="tabs" />

    <section class="mt-4 overflow-hidden rounded-3xl border border-white/10 bg-white/3">
      <div class="relative aspect-square overflow-hidden bg-black">
        <NuxtImg
          src="/assets/images/rating-coming-soon.jpg"
          alt="Duck's готовит рейтинг клуба"
          class="h-full w-full object-cover"
          sizes="sm:100vw md:420px"
          preload
        />
      </div>
    </section>

    <!-- <div class="mt-4">
      <div v-if="isLoading" class="space-y-2">
        <div v-for="i in 5" :key="i" class="h-16 animate-pulse rounded-2xl bg-(--secondary)/20" />
      </div>

      <div v-else-if="error" class="text-center text-sm text-(--warning)">
        {{ error }}
      </div>

      <div v-else-if="!rating.length" class="text-center text-sm text-gray-500">Нет данных</div>

      <RatingLeaderboard v-else :rating="rating" />
    </div> -->
  </main>
</template>
