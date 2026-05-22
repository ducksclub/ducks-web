<script setup lang="ts">
import type { Rating } from '~/types/rating'

type RatingItem = Pick<Rating, 'gameType' | 'points'>

const props = withDefaults(
  defineProps<{
    ratings?: RatingItem[]
  }>(),
  {
    ratings: () => [],
  },
)

const defaultRatings: RatingItem[] = [
  {
    gameType: 'Бильярд',
    points: 0,
  },
  {
    gameType: 'Покер',
    points: 0,
  },
  {
    gameType: 'Дартс',
    points: 0,
  },
]

const normalizedRatings = computed<RatingItem[]>(() => {
  return defaultRatings.map((defaultRating) => {
    const existingRating = props.ratings.find(
      (rating) => rating.gameType === defaultRating.gameType,
    )

    return {
      ...defaultRating,
      points: existingRating?.points ?? 0,
    }
  })
})
</script>

<template>
  <section class="space-y-3">
    <p class="px-1 text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">Рейтинг</p>

    <div class="grid grid-cols-3 gap-3">
      <article
        v-for="rating in normalizedRatings"
        :key="rating.gameType"
        class="relative overflow-hidden rounded-3xl border border-white/5 bg-(--secondary)/20 p-4 text-center transition-all duration-200 hover:border-(--logo-bg)/20 hover:bg-white/4 active:scale-[0.98]"
      >
        <div
          class="pointer-events-none absolute inset-x-4 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"
        />

        <p class="truncate text-[10px] font-black uppercase tracking-[0.18em] text-gray-500">
          {{ getGameLabel(rating.gameType) }}
        </p>

        <p class="mt-2 text-2xl font-black leading-none text-white tabular-nums">
          {{ rating.points }}
        </p>

        <p class="mt-1 text-[10px] font-semibold uppercase tracking-widest text-(--logo-bg)/70">
          очков
        </p>
      </article>
    </div>
  </section>
</template>
