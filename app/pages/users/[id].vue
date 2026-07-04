<script setup lang="ts">
import { CalendarDays, Star, Trophy, UserRound } from '@lucide/vue'
import { useUsersApi } from '~/api/users.api'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import { EventGameType } from '~/types/event'
import type { PublicUserProfile, UserRating } from '~/types/user'

definePageMeta({
  middleware: 'auth',
  layout: 'empty',
})

const route = useRoute()
const usersApi = useUsersApi()

const user = ref<PublicUserProfile | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

const userId = computed(() => {
  const id = route.params.id
  return Array.isArray(id) ? id[0] : id
})

const defaultRatings: UserRating[] = [
  { gameType: EventGameType.POKER, points: 0 },
  { gameType: EventGameType.DARTS, points: 0 },
  { gameType: EventGameType.POOL, points: 0 },
]

const normalizedRatings = computed<UserRating[]>(() => {
  const ratings = defaultRatings.map((defaultRating) => {
    const existingRating = user.value?.ratings?.find(
      (rating) => rating.gameType === defaultRating.gameType,
    )

    return {
      ...defaultRating,
      points: existingRating?.points ?? 0,
    }
  })

  const defaultGameTypes = new Set(defaultRatings.map((rating) => rating.gameType))
  const extraRatings =
    user.value?.ratings?.filter((rating) => !defaultGameTypes.has(rating.gameType)) ?? []

  return [...ratings, ...extraRatings]
})

const totalPoints = computed(() => {
  return normalizedRatings.value.reduce((sum, rating) => sum + rating.points, 0)
})

const bestRating = computed(() => {
  if (!totalPoints.value) return null

  return normalizedRatings.value.reduce<UserRating | null>((best, rating) => {
    if (!best || rating.points > best.points) return rating
    return best
  }, null)
})

const memberSince = computed(() => {
  if (!user.value?.createdAt) return '—'

  return new Intl.DateTimeFormat('ru-RU', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(user.value.createdAt))
})

const title = computed(() => user.value?.nickname || 'Игрок')

useHead(() => ({
  title: `Duck's | ${title.value}`,
}))

async function fetchUser() {
  if (!userId.value) {
    error.value = 'Пользователь не найден'
    return
  }

  try {
    isLoading.value = true
    error.value = null
    user.value = await usersApi.getUser(userId.value)
  } catch {
    user.value = null
    error.value = 'Не удалось загрузить профиль игрока'
  } finally {
    isLoading.value = false
  }
}

watch(userId, fetchUser, { immediate: true })
</script>

<template>
  <BaseHeader>
    <template #left>
      <HeaderBackButton />
    </template>

    <template #default>
      <HeaderTitle :title="title" />
    </template>
  </BaseHeader>

  <main class="p-4">
    <div v-if="isLoading" class="space-y-4">
      <div class="h-64 animate-pulse rounded-2xl bg-(--secondary)/20" />
      <div class="grid grid-cols-3 gap-3">
        <div v-for="i in 3" :key="i" class="h-25 animate-pulse rounded-2xl bg-(--secondary)/20" />
      </div>
    </div>

    <div v-else-if="error" class="pt-20 text-center">
      <div
        class="mx-auto flex size-14 items-center justify-center rounded-full border border-white/10 bg-(--secondary)/20 text-(--warning)"
      >
        <UserRound :size="24" />
      </div>
      <p class="mt-4 text-sm font-semibold text-(--warning)">{{ error }}</p>
      <BaseButton type="button" class="mt-6" @click="fetchUser">Повторить</BaseButton>
    </div>

    <div v-else-if="user" class="space-y-6">
      <section class="rounded-2xl border border-white/5 bg-(--secondary)/20 p-6 text-center">
        <NuxtImg
          v-if="user.avatarUrl"
          class="mx-auto flex size-28 items-center justify-center rounded-full border border-(--logo-bg)/30 bg-black object-cover select-none"
          :src="renderPicture(user.avatarUrl)"
          :alt="user.nickname"
        />

        <div
          v-else
          class="mx-auto flex size-28 items-center justify-center rounded-full border border-(--logo-bg)/30 bg-black text-4xl font-black"
        >
          {{ getInitial(user.nickname) }}
        </div>

        <h1 class="mt-4 truncate text-2xl font-black tracking-wide text-white">
          {{ user.nickname }}
        </h1>

        <div class="mt-5 grid grid-cols-2 gap-3 text-left">
          <div class="rounded-2xl border border-white/5 bg-black/20 p-4">
            <div class="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500">
              <Trophy :size="14" />
              Очки
            </div>
            <p class="mt-2 text-2xl font-black text-white tabular-nums">{{ totalPoints }}</p>
          </div>

          <div class="rounded-2xl border border-white/5 bg-black/20 p-4">
            <div class="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500">
              <Star :size="14" />
              Лучшая игра
            </div>
            <p class="mt-2 truncate text-sm font-black text-white">
              {{ bestRating ? getGameLabel(bestRating.gameType) : '—' }}
            </p>
          </div>
        </div>
      </section>

      <section class="space-y-3">
        <p class="px-1 text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">Рейтинг</p>

        <div class="grid grid-cols-3 gap-3">
          <article
            v-for="rating in normalizedRatings"
            :key="rating.gameType"
            class="rounded-2xl border border-white/5 bg-(--secondary)/20 p-4 text-center"
          >
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

      <section class="space-y-3">
        <p class="px-1 text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">
          Информация
        </p>

        <div class="rounded-2xl border border-white/5 bg-(--secondary)/20 p-4">
          <div class="flex items-center gap-3">
            <div
              class="flex size-10 shrink-0 items-center justify-center rounded-full bg-black/25 text-(--logo-bg)"
            >
              <CalendarDays :size="18" />
            </div>
            <div class="min-w-0">
              <p class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                В клубе с
              </p>
              <p class="mt-1 truncate text-sm font-semibold text-white">{{ memberSince }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
