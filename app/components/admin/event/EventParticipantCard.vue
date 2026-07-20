<script setup lang="ts">
import type { Event as GameEvent, Participant } from '~/types/event'

const props = defineProps<{
  participant: Participant
  index: number
  event?: GameEvent
}>()

const emit = defineEmits<{
  (e: 'update-points', points: number): void
  (e: 'update-bounty', bounty: number): void
}>()

const isCompleted = computed(() => props.event?.status === 'completed')

const participantNumber = computed(() => props.participant.position ?? props.index + 1)

const participantName = computed(() => props.participant.user?.nickname?.trim() || 'Без никнейма')

const participantInitial = computed(() => participantName.value.charAt(0).toLocaleUpperCase())

const participantContact = computed(() => {
  const user = props.participant.user

  if (user?.email?.trim()) return user.email
  if (user?.phone?.trim()) return user.phone
  if (user?.telegramId) return `Telegram ID: ${user.telegramId}`

  return 'Контакты не указаны'
})

const normalizeResult = (event: globalThis.Event) => {
  const value = Number((event.target as HTMLInputElement).value)

  return Number.isFinite(value) ? Math.max(0, Math.trunc(value)) : 0
}

const updatePoints = (event: globalThis.Event) => {
  emit('update-points', normalizeResult(event))
}

const updateBounty = (event: globalThis.Event) => {
  emit('update-bounty', normalizeResult(event))
}
</script>

<template>
  <article
    class="group relative overflow-hidden rounded-3xl border border-white/8 bg-(--secondary)/20 p-4 shadow-[0_12px_32px_rgba(0,0,0,0.14)] transition duration-200 hover:border-white/15 hover:bg-white/5 focus-within:border-(--logo-bg)/40 focus-within:shadow-[0_16px_40px_rgba(221,24,20,0.1)]"
    :class="{ 'opacity-75': isCompleted }"
  >
    <div
      class="pointer-events-none absolute -top-16 -right-12 size-32 rounded-full bg-(--logo-bg)/8 blur-3xl"
    />

    <div class="relative flex min-w-0 items-center gap-3">
      <div class="relative shrink-0">
        <div
          class="size-13 overflow-hidden rounded-2xl border border-white/10 bg-(--bg) shadow-md sm:size-14"
        >
          <NuxtImg
            v-if="participant.user?.avatarUrl"
            :src="renderPicture(participant.user.avatarUrl)"
            :alt="participantName"
            class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />

          <div
            v-else
            class="flex h-full w-full items-center justify-center bg-linear-to-br from-white/12 to-white/3 text-lg font-black text-white"
            aria-hidden="true"
          >
            {{ participantInitial }}
          </div>
        </div>

        <span
          class="absolute -right-1.5 -bottom-1.5 flex min-w-6 items-center justify-center rounded-lg border-2 border-(--bg) bg-(--logo-bg) px-1.5 py-0.5 text-[10px] font-black tabular-nums text-white shadow-md"
          :aria-label="`Номер участника ${participantNumber}`"
        >
          {{ participantNumber }}
        </span>
      </div>

      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-2">
          <h3 class="truncate text-sm font-black text-white">
            {{ participantName }}
          </h3>

          <span
            v-if="isCompleted"
            class="shrink-0 rounded-lg bg-white/6 px-2 py-1 text-[9px] font-bold tracking-wide text-gray-400 uppercase"
          >
            Завершено
          </span>
        </div>

        <p
          class="mt-1 truncate text-[11px]"
          :class="
            participantContact === 'Контакты не указаны'
              ? 'text-gray-600 italic'
              : 'text-gray-400'
          "
          :title="participantContact"
        >
          {{ participantContact }}
        </p>
      </div>
    </div>

    <div class="relative mt-4 grid grid-cols-2 gap-2.5 sm:mt-0 sm:ml-17 sm:max-w-64">
      <label
        :for="`participant-points-${participant.id}`"
        class="rounded-2xl border border-white/6 bg-black/20 p-2.5 transition focus-within:border-(--logo-bg)/35 focus-within:bg-black/30"
      >
        <span
          class="mb-1.5 flex items-center justify-between text-[9px] font-bold tracking-[0.12em] text-gray-500 uppercase"
        >
          Баллы
          <span class="text-[8px] tracking-normal text-gray-600 normal-case">pts</span>
        </span>

        <input
          :id="`participant-points-${participant.id}`"
          :value="participant.points ?? 0"
          type="number"
          min="0"
          step="1"
          inputmode="numeric"
          :disabled="isCompleted"
          class="h-10 w-full appearance-none rounded-xl border border-white/8 bg-(--bg) px-3 text-center text-base font-black tabular-nums text-white outline-none transition focus:border-(--logo-bg)/50 focus:ring-2 focus:ring-(--logo-bg)/10 disabled:cursor-not-allowed disabled:text-gray-500"
          aria-label="Баллы участника"
          @input="updatePoints"
        />
      </label>

      <label
        :for="`participant-bounty-${participant.id}`"
        class="rounded-2xl border border-white/6 bg-black/20 p-2.5 transition focus-within:border-(--logo-bg)/35 focus-within:bg-black/30"
      >
        <span
          class="mb-1.5 flex items-center justify-between text-[9px] font-bold tracking-[0.12em] text-gray-500 uppercase"
        >
          Баунти
          <span class="text-[8px] tracking-normal text-gray-600 normal-case">шт.</span>
        </span>

        <input
          :id="`participant-bounty-${participant.id}`"
          :value="participant.bounty ?? 0"
          type="number"
          min="0"
          step="1"
          inputmode="numeric"
          :disabled="isCompleted"
          class="h-10 w-full appearance-none rounded-xl border border-white/8 bg-(--bg) px-3 text-center text-base font-black tabular-nums text-white outline-none transition focus:border-(--logo-bg)/50 focus:ring-2 focus:ring-(--logo-bg)/10 disabled:cursor-not-allowed disabled:text-gray-500"
          aria-label="Баунти участника"
          @input="updateBounty"
        />
      </label>
    </div>
  </article>
</template>
