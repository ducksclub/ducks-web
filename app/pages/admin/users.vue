<script setup lang="ts">
import { Check, Loader2, RefreshCw, RotateCcw, Search, UserRound } from '@lucide/vue'
import { useUsersApi } from '~/api/users.api'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderMenu from '~/components/layout/header/HeaderMenu.vue'
import HeaderMenuItem from '~/components/layout/header/HeaderMenuItem.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import { EventGameType } from '~/types/event'
import type { AdminUser, AdminUserGameStats, GetUsersResponse } from '~/types/user'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

useHead({
  title: "Duck's Admin | Пользователи",
})

type StatField = 'points' | 'bounty'
type StatsDraft = Record<StatField, string>

const gameTypes: EventGameType[] = [
  EventGameType.POKER,
  EventGameType.DARTS,
  EventGameType.POOL,
  EventGameType.QUIZ,
  EventGameType.MAFIA,
]
const gameOptions = gameTypes.map((value) => ({
  label: getGameLabel(value),
  value,
}))

const notify = useNotify()
const haptics = useTelegramHaptics()
const { getUsers, updateUserGameStats } = useUsersApi()

const users = ref<AdminUser[]>([])
const isLoading = ref(true)
const errorMessage = ref('')
const search = ref('')
const selectedGame = ref<EventGameType>(EventGameType.POKER)
const statsDrafts = ref<Record<string, StatsDraft>>({})
const savingStats = ref<Set<string>>(new Set())

const normalizeUsersResponse = (response: GetUsersResponse) => {
  const responseUsers = Array.isArray(response) ? response : response.data

  return responseUsers.map((user) => ({
    ...user,
    ratings: gameTypes.map((gameType) => {
      const stats = user.ratings?.find((rating) => rating.gameType === gameType)

      return {
        gameType,
        points: stats?.points ?? 0,
        bounty: stats?.bounty ?? 0,
      }
    }),
  }))
}

const filteredUsers = computed(() => {
  const query = search.value.trim().toLowerCase()

  if (!query) return users.value

  return users.value.filter((user) => {
    return [user.nickname, user.email, user.phone, user.telegramId, user.role]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(query))
  })
})

const registeredUsersCount = computed(() => users.value.length)

const telegramUsersCount = computed(() => users.value.filter((user) => user.telegramId).length)

const adminUsersCount = computed(() => users.value.filter((user) => user.role === 'admin').length)

const getStatsKey = (userId: string, gameType = selectedGame.value) => {
  return `${userId}:${gameType}`
}

const getUserGameStats = (user: AdminUser, gameType = selectedGame.value) => {
  return user.ratings.find((rating) => rating.gameType === gameType) as AdminUserGameStats
}

const getStatsDraft = (user: AdminUser, gameType = selectedGame.value): StatsDraft => {
  const key = getStatsKey(user.id, gameType)
  const stats = getUserGameStats(user, gameType)

  return (
    statsDrafts.value[key] ?? {
      points: String(stats.points),
      bounty: String(stats.bounty),
    }
  )
}

const updateStatsDraft = (user: AdminUser, field: StatField, event: Event) => {
  const key = getStatsKey(user.id)
  const target = event.target as HTMLInputElement

  statsDrafts.value[key] = {
    ...getStatsDraft(user),
    [field]: target.value,
  }
}

const hasStatsChanges = (user: AdminUser, gameType = selectedGame.value) => {
  const stats = getUserGameStats(user, gameType)
  const draft = getStatsDraft(user, gameType)

  return draft.points !== String(stats.points) || draft.bounty !== String(stats.bounty)
}

const resetStatsDraft = (user: AdminUser, gameType = selectedGame.value) => {
  const key = getStatsKey(user.id, gameType)
  const nextDrafts = { ...statsDrafts.value }

  delete nextDrafts[key]
  statsDrafts.value = nextDrafts
}

const isSavingStats = (userId: string, gameType = selectedGame.value) => {
  return savingStats.value.has(getStatsKey(userId, gameType))
}

const setSavingStats = (key: string, isSaving: boolean) => {
  const nextSavingStats = new Set(savingStats.value)

  if (isSaving) {
    nextSavingStats.add(key)
  } else {
    nextSavingStats.delete(key)
  }

  savingStats.value = nextSavingStats
}

const parseStatsValue = (value: string) => {
  if (!/^\d+$/.test(value.trim())) return null

  const parsed = Number(value)

  return Number.isSafeInteger(parsed) && parsed >= 0 && parsed <= 1_000_000 ? parsed : null
}

const saveUserStats = async (user: AdminUser) => {
  const gameType = selectedGame.value
  const key = getStatsKey(user.id, gameType)

  if (!hasStatsChanges(user, gameType) || savingStats.value.has(key)) return

  const draft = getStatsDraft(user, gameType)
  const points = parseStatsValue(draft.points)
  const bounty = parseStatsValue(draft.bounty)

  if (points === null || bounty === null) {
    notify.error('Очки и баунти должны быть целыми числами от 0 до 1 000 000')
    haptics.error()
    return
  }

  setSavingStats(key, true)

  try {
    const updatedStats = await updateUserGameStats(user.id, gameType, {
      points,
      bounty,
    })
    const stats = getUserGameStats(user, gameType)

    stats.points = updatedStats.points
    stats.bounty = updatedStats.bounty
    resetStatsDraft(user, gameType)
    notify.success(`${user.nickname || 'Пользователь'}: ${getGameLabel(gameType)} обновлён`)
    haptics.success()
  } catch (error: any) {
    notify.error(
      error?.response?.data?.message ||
        error?.data?.message ||
        error?.message ||
        'Не удалось обновить статистику',
    )
    haptics.error()
  } finally {
    setSavingStats(key, false)
  }
}

const loadUsers = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await getUsers()
    users.value = normalizeUsersResponse(response)
    statsDrafts.value = {}
  } catch (error: any) {
    errorMessage.value =
      error?.response?.data?.message || error?.data?.message || error?.error || 'Ошибка загрузки'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadUsers)
</script>

<template>
  <BaseHeader>
    <template #left>
      <HeaderBackButton />
    </template>

    <template #default>
      <HeaderTitle title="Пользователи" />
    </template>

    <template #right>
      <HeaderMenu>
        <HeaderMenuItem @click="loadUsers">Обновить</HeaderMenuItem>
      </HeaderMenu>
    </template>
  </BaseHeader>

  <main class="space-y-4 p-4 pb-24">
    <section class="grid grid-cols-3 gap-2">
      <div class="rounded-2xl border border-white/10 bg-(--secondary)/15 p-3">
        <p class="text-[10px] font-bold text-gray-500 uppercase">Всего</p>
        <p class="mt-1 text-2xl font-black text-white tabular-nums">{{ registeredUsersCount }}</p>
      </div>

      <div class="rounded-2xl border border-white/10 bg-(--secondary)/15 p-3">
        <p class="text-[10px] font-bold text-gray-500 uppercase">Telegram</p>
        <p class="mt-1 text-2xl font-black text-white tabular-nums">{{ telegramUsersCount }}</p>
      </div>

      <div class="rounded-2xl border border-white/10 bg-(--secondary)/15 p-3">
        <p class="text-[10px] font-bold text-gray-500 uppercase">Админы</p>
        <p class="mt-1 text-2xl font-black text-white tabular-nums">{{ adminUsersCount }}</p>
      </div>
    </section>

    <label
      class="flex items-center gap-3 rounded-2xl border border-white/10 bg-(--secondary)/15 px-4 py-3 text-sm text-white"
    >
      <Search :size="18" class="shrink-0 text-gray-500" />
      <input
        v-model="search"
        class="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-600"
        type="search"
        placeholder="Поиск по имени, email, телефону"
      />
    </label>

    <section>
      <div class="mb-2 flex items-center justify-between gap-3 px-1">
        <p class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
          Игра для редактирования
        </p>
        <p class="text-[10px] font-bold text-gray-600">Очки · Баунти</p>
      </div>

      <div class="flex gap-2 overflow-x-auto pb-1">
        <button
          v-for="game in gameOptions"
          :key="game.value"
          type="button"
          :aria-pressed="selectedGame === game.value"
          class="shrink-0 rounded-xl border px-3 py-2 text-[11px] font-black transition active:scale-95"
          :class="
            selectedGame === game.value
              ? 'border-(--logo-bg)/30 bg-(--logo-bg)/15 text-white'
              : 'border-white/5 bg-white/3 text-gray-500 hover:text-gray-300'
          "
          @click="selectedGame = game.value"
        >
          {{ game.label }}
        </button>
      </div>
    </section>

    <div v-if="isLoading" class="space-y-3">
      <div v-for="i in 6" :key="i" class="h-24 animate-pulse rounded-3xl bg-(--secondary)/20" />
    </div>

    <div
      v-else-if="errorMessage"
      class="rounded-3xl border border-(--warning)/20 bg-(--warning)/5 p-6 text-center"
    >
      <div
        class="mx-auto flex size-12 items-center justify-center rounded-2xl bg-(--warning)/10 text-(--warning)"
      >
        <RefreshCw :size="22" />
      </div>
      <p class="mt-4 text-sm font-semibold text-(--warning)">{{ errorMessage }}</p>
      <button
        class="mt-4 text-sm font-semibold text-white underline"
        type="button"
        @click="loadUsers"
      >
        Повторить
      </button>
    </div>

    <div
      v-else-if="!filteredUsers.length"
      class="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 px-6 py-20 text-center"
    >
      <div class="flex size-16 items-center justify-center rounded-2xl bg-(--secondary)/20">
        <UserRound :size="28" class="text-gray-500" />
      </div>
      <p class="mt-4 text-sm font-semibold text-white">
        {{ users.length ? 'Ничего не найдено' : 'Пока нет пользователей' }}
      </p>
      <p class="mt-1 text-xs text-gray-500">
        {{ users.length ? 'Попробуйте изменить поисковый запрос' : 'Регистрации появятся здесь' }}
      </p>
    </div>

    <section v-else class="space-y-3">
      <article
        v-for="user in filteredUsers"
        :key="user.id"
        class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-4 transition hover:border-(--logo-bg)/20"
      >
        <NuxtLink class="flex items-start gap-4" :to="`/users/${user.id}`">
          <NuxtImg
            v-if="user.avatarUrl"
            class="size-12 shrink-0 rounded-2xl border border-white/10 bg-black object-cover"
            :src="renderPicture(user.avatarUrl)"
            :alt="user.nickname"
          />

          <div
            v-else
            class="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-sm font-black text-(--logo-bg)"
          >
            {{ getInitial(user.nickname) }}
          </div>

          <div class="min-w-0 flex-1">
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <p class="truncate text-sm font-black text-white">
                  {{ user.nickname || 'Без имени' }}
                </p>
                <p class="mt-1 truncate text-xs text-gray-500">
                  {{ user.email || user.phone || user.telegramId || 'Контакты не указаны' }}
                </p>
              </div>

              <span
                class="shrink-0 rounded-xl px-2 py-1 text-[10px] font-black uppercase"
                :class="
                  user.role === 'admin'
                    ? 'bg-(--logo-bg)/10 text-(--logo-bg)'
                    : 'bg-white/5 text-gray-400'
                "
              >
                {{ user.role || 'user' }}
              </span>
            </div>

            <div class="mt-3 text-xs">
              <div class="min-w-0 rounded-2xl bg-black/20 px-3 py-2">
                <p class="text-[10px] font-bold text-gray-600 uppercase">Дата регистрации</p>
                <p class="mt-1 truncate text-gray-300">
                  {{ user.createdAt ? formatDate(user.createdAt, { dateStyle: 'short' }) : '—' }}
                </p>
              </div>
            </div>
          </div>
        </NuxtLink>

        <div class="mt-4 border-t border-white/5 pt-4">
          <div class="mb-3 flex items-center justify-between gap-3">
            <div>
              <p class="text-[10px] font-black uppercase tracking-[0.18em] text-(--logo-bg)">
                {{ getGameLabel(selectedGame) }}
              </p>
              <p class="mt-1 text-[10px] text-gray-600">Статистика пользователя</p>
            </div>

            <button
              v-if="hasStatsChanges(user)"
              type="button"
              class="inline-flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-[10px] font-bold text-gray-400 transition hover:bg-white/5 hover:text-white disabled:opacity-40"
              :disabled="isSavingStats(user.id)"
              @click="resetStatsDraft(user)"
            >
              <RotateCcw :size="13" />
              Сбросить
            </button>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <label class="min-w-0">
              <span class="mb-1.5 block px-1 text-[10px] font-bold text-gray-500 uppercase">
                Очки
              </span>
              <input
                :value="getStatsDraft(user).points"
                class="h-11 w-full rounded-2xl border border-white/5 bg-black/20 px-3 text-sm font-black text-white tabular-nums outline-none transition focus:border-(--logo-bg)/40 disabled:opacity-50"
                type="number"
                inputmode="numeric"
                min="0"
                max="1000000"
                step="1"
                :disabled="isSavingStats(user.id)"
                @input="updateStatsDraft(user, 'points', $event)"
              />
            </label>

            <label class="min-w-0">
              <span class="mb-1.5 block px-1 text-[10px] font-bold text-gray-500 uppercase">
                Баунти
              </span>
              <input
                :value="getStatsDraft(user).bounty"
                class="h-11 w-full rounded-2xl border border-white/5 bg-black/20 px-3 text-sm font-black text-white tabular-nums outline-none transition focus:border-(--logo-bg)/40 disabled:opacity-50"
                type="number"
                inputmode="numeric"
                min="0"
                max="1000000"
                step="1"
                :disabled="isSavingStats(user.id)"
                @input="updateStatsDraft(user, 'bounty', $event)"
              />
            </label>
          </div>

          <button
            v-if="hasStatsChanges(user)"
            type="button"
            class="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-(--logo-bg) text-xs font-black text-white transition hover:bg-(--logo-bg)/80 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
            :disabled="isSavingStats(user.id)"
            @click="saveUserStats(user)"
          >
            <Loader2 v-if="isSavingStats(user.id)" :size="16" class="animate-spin" />
            <Check v-else :size="16" />
            {{ isSavingStats(user.id) ? 'Сохраняем...' : 'Сохранить изменения' }}
          </button>
        </div>
      </article>
    </section>
  </main>
</template>
