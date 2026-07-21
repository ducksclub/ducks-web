<script setup lang="ts">
import { EventGameType, type EventGameType as GameType } from '~/types/event'
import type { Rating } from '~/types/rating'

const props = defineProps<{
  rating: Rating[]
  gameType: GameType
}>()

const { user } = storeToRefs(useAuthStore())

const leaderboardRef = ref<HTMLElement | null>(null)
const isCurrentRowVisible = ref(false)
let currentRowObserver: IntersectionObserver | undefined

const showBounty = computed(() => props.gameType === EventGameType.POKER)

const isMe = (id: string) => id === user.value?.id

const currentRatingIndex = computed(() => {
  if (!user.value) return -1

  return props.rating.findIndex((item) => item.user.id === user.value?.id)
})

const currentRating = computed<Rating | null>(() => {
  if (!user.value) return null

  const rating = props.rating[currentRatingIndex.value]
  if (rating) return rating

  return {
    id: `current-user-${props.gameType}`,
    userId: user.value.id,
    gameType: props.gameType,
    points: 0,
    bounty: 0,
    createdAt: '',
    updatedAt: '',
    user: {
      id: user.value.id,
      nickname: user.value.nickname,
      avatarUrl: user.value.avatarUrl,
    },
  }
})

const currentPosition = computed(() => {
  return currentRatingIndex.value >= 0 ? String(currentRatingIndex.value + 1) : '—'
})

const getInitial = (name?: string) => {
  if (!name) return '?'
  return name.trim().charAt(0).toUpperCase()
}

const positionClass = (index: number) => {
  if (index === 0) return 'text-white'
  if (index === 1) return 'text-gray-200'
  if (index === 2) return 'text-gray-300'
  return 'text-gray-500'
}

const rowClass = (item: Rating, index: number) => {
  if (isMe(item.user.id)) return 'bg-(--logo-bg)/10 border-(--logo-bg)/30'
  if (index < 3) return 'bg-white/3 border-white/5'

  return 'bg-(--secondary)/20 border-white/5 hover:bg-white/5'
}

const avatarClass = (item: Rating) => {
  return isMe(item.user.id)
    ? 'bg-(--logo-bg)/20 border-(--logo-bg)/40 text-white'
    : 'bg-(--bg) border-white/10 text-gray-300'
}

const nameClass = (item: Rating) => {
  return isMe(item.user.id) ? 'text-white' : 'text-gray-300'
}

const pointsClass = (item: Rating) => {
  return isMe(item.user.id) ? 'text-(--logo-bg)' : 'text-white'
}

const observeCurrentRow = async () => {
  currentRowObserver?.disconnect()
  isCurrentRowVisible.value = false

  if (currentRatingIndex.value < 0) return

  await nextTick()

  const currentRow = leaderboardRef.value?.querySelector<HTMLElement>('[data-current-user-row]')
  if (!currentRow) return

  currentRowObserver = new IntersectionObserver(
    ([entry]) => {
      isCurrentRowVisible.value = entry?.isIntersecting ?? false
    },
    { threshold: 0.55 },
  )

  currentRowObserver.observe(currentRow)
}

watch([() => props.rating, () => props.gameType, () => user.value?.id], observeCurrentRow, {
  immediate: true,
  flush: 'post',
})

onBeforeUnmount(() => currentRowObserver?.disconnect())
</script>

<template>
  <div ref="leaderboardRef">
    <div
      class="mt-4 mb-2 grid grid-cols-12 px-4 text-[10px] font-black tracking-[0.2em] text-gray-600 uppercase"
    >
      <div class="col-span-2">#</div>
      <div :class="showBounty ? 'col-span-5' : 'col-span-7'">Игрок</div>
      <div v-if="showBounty" class="col-span-2 text-right">Баунти</div>
      <div class="col-span-3 text-right">Очки</div>
    </div>

    <div
      v-if="!rating.length"
      class="rounded-2xl border border-white/5 bg-white/3 px-4 py-8 text-center"
    >
      <p class="text-sm font-semibold text-gray-400">Рейтинг пока пуст</p>
      <p class="mt-1 text-xs text-gray-600">Ваши результаты появятся после первой игры</p>
    </div>

    <div v-else class="space-y-2">
      <NuxtLink
        v-for="(item, index) in rating"
        :key="item.id"
        class="grid grid-cols-12 items-center rounded-2xl border px-4 py-4 transition-all duration-200"
        :class="rowClass(item, index)"
        :to="`/users/${item.user.id}`"
        :aria-label="`Открыть профиль игрока ${item.user.nickname}`"
        :data-current-user-row="isMe(item.user.id) ? '' : undefined"
      >
        <div class="col-span-2 flex items-center gap-2">
          <span class="text-sm font-black" :class="positionClass(index)">
            {{ index + 1 }}
          </span>
        </div>

        <div
          class="flex min-w-0 items-center gap-3"
          :class="showBounty ? 'col-span-5' : 'col-span-7'"
        >
          <NuxtImg
            v-if="item.user.avatarUrl"
            class="flex size-9 items-center justify-center rounded-full border text-xs font-black tracking-wide"
            :class="avatarClass(item)"
            :src="renderPicture(item.user.avatarUrl)"
            :alt="item.user.nickname"
          />

          <div
            v-else
            class="flex size-9 shrink-0 items-center justify-center rounded-full border text-xs font-black tracking-wide"
            :class="avatarClass(item)"
          >
            {{ getInitial(item.user.nickname) }}
          </div>

          <div class="min-w-0">
            <div class="truncate text-sm font-semibold" :class="nameClass(item)">
              {{ item.user.nickname || 'Без никнейма' }}
            </div>

            <div
              v-if="isMe(item.user.id)"
              class="text-[10px] font-bold tracking-widest text-(--logo-bg) uppercase"
            >
              Вы
            </div>
          </div>
        </div>

        <div
          v-if="showBounty"
          class="col-span-2 text-right text-sm font-bold tabular-nums text-gray-400"
        >
          {{ item.bounty ?? 0 }}
        </div>

        <div
          class="col-span-3 text-right text-sm font-black tabular-nums"
          :class="pointsClass(item)"
        >
          {{ item.points ?? 0 }}
        </div>
      </NuxtLink>
    </div>
  </div>

  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="translate-y-3 opacity-0"
    leave-active-class="transition duration-150 ease-in"
    leave-to-class="translate-y-3 opacity-0"
  >
    <div
      v-if="currentRating && !isCurrentRowVisible"
      class="fixed inset-x-0 bottom-[calc(5.75rem+env(safe-area-inset-bottom))] z-40 mx-auto max-w-115 px-4"
    >
      <NuxtLink
        :to="`/users/${currentRating.user.id}`"
        class="grid grid-cols-12 items-center rounded-2xl border border-(--logo-bg)/40 bg-(--bg)/92 px-4 py-3 shadow-[0_14px_45px_rgba(0,0,0,0.55)] backdrop-blur-xl"
        :aria-label="`Открыть свой профиль, ${currentRating.user.nickname}`"
      >
        <div class="col-span-2 flex items-center">
          <span class="text-sm font-black tabular-nums text-(--logo-bg)">
            {{ currentPosition }}
          </span>
        </div>

        <div
          class="flex min-w-0 items-center gap-3"
          :class="showBounty ? 'col-span-5' : 'col-span-7'"
        >
          <NuxtImg
            v-if="currentRating.user.avatarUrl"
            class="size-9 rounded-full border border-(--logo-bg)/40 bg-(--logo-bg)/20 object-cover"
            :src="renderPicture(currentRating.user.avatarUrl)"
            :alt="currentRating.user.nickname"
          />

          <div
            v-else
            class="flex size-9 shrink-0 items-center justify-center rounded-full border border-(--logo-bg)/40 bg-(--logo-bg)/20 text-xs font-black text-white"
          >
            {{ getInitial(currentRating.user.nickname) }}
          </div>

          <div class="min-w-0">
            <div class="truncate text-sm font-semibold text-white">
              {{ currentRating.user.nickname || 'Без никнейма' }}
            </div>
            <div class="text-[10px] font-bold tracking-widest text-(--logo-bg) uppercase">
              Вы
            </div>
          </div>
        </div>

        <div
          v-if="showBounty"
          class="col-span-2 text-right text-sm font-bold tabular-nums text-gray-300"
        >
          {{ currentRating.bounty ?? 0 }}
        </div>

        <div class="col-span-3 text-right text-sm font-black tabular-nums text-(--logo-bg)">
          {{ currentRating.points ?? 0 }}
        </div>
      </NuxtLink>
    </div>
  </Transition>
</template>
