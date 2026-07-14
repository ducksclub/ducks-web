<script setup lang="ts">
import type { Event } from '~/types/event'

defineProps<{
  participant: any
  index: number
  event?: Event
}>()

const isFocused = ref(false)
</script>

<template>
  <div
    class="relative overflow-hidden rounded-3xl border border-white/5 bg-(--secondary)/20 p-4 shadow-[0_12px_36px_rgba(0,0,0,0.1)] transition-all duration-200 focus-within:border-(--logo-bg)/40 focus-within:bg-(--logo-bg)/5 focus-within:shadow-[0_16px_48px_rgba(220,38,38,0.14)]"
    :class="[
      event?.status === 'completed' ? 'opacity-60' : '',
      !isFocused
        ? 'group hover:border-(--logo-bg)/15 hover:bg-white/5 hover:shadow-[0_16px_44px_rgba(0,0,0,0.18)]'
        : '',
    ]"
    @focusin="isFocused = true"
    @focusout="isFocused = false"
  >
    <div
      class="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-(--logo-bg)/8 blur-3xl transition group-hover:bg-(--logo-bg)/12"
    />

    <div class="relative flex items-center gap-3">
      <div class="shrink-0">
        <div class="size-14 overflow-hidden rounded-2xl border border-white/10 bg-(--bg) shadow-lg">
          <NuxtImg
            v-if="participant.user?.avatarUrl"
            :src="renderPicture(participant.user.avatarUrl)"
            :alt="participant.user?.nickname || 'Участник'"
            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div
            v-else
            class="flex h-full w-full items-center justify-center bg-linear-to-br from-white/10 to-white/3 text-lg font-black uppercase text-gray-300"
          >
            {{ participant.user?.nickname?.slice(0, 1) || '?' }}
          </div>
        </div>
      </div>

      <div class="min-w-0 flex-1">
        <div class="flex min-w-0 items-center gap-2">
          <span
            class="shrink-0 text-xs font-black tabular-nums text-(--logo-bg)"
            :aria-label="`Номер участника ${index + 1}`"
          >
            №{{ String(index + 1).padStart(2, '0') }}
          </span>

          <p class="truncate text-sm font-bold text-white">
            {{ participant.user?.nickname || 'Без никнейма' }}
          </p>
        </div>

        <p class="mt-1 truncate text-[11px] text-gray-500">
          {{ participant.user?.email }}
        </p>
      </div>

      <div class="w-23 shrink-0 rounded-2xl border border-white/5 bg-black/15 p-2">
        <label
          :for="`participant-points-${participant.id}`"
          class="mb-1.5 block text-center text-[9px] font-bold uppercase tracking-[0.14em] text-gray-500"
        >
          Баллы
        </label>

        <input
          :id="`participant-points-${participant.id}`"
          v-model.number="participant.points"
          type="number"
          min="0"
          step="1"
          inputmode="numeric"
          :disabled="event?.status === 'completed'"
          class="h-9 w-full appearance-none m-0 rounded-xl border border-white/10 bg-(--bg) px-2 text-center text-sm font-black tabular-nums text-white outline-none transition-all placeholder:text-gray-600 focus:border-(--logo-bg)/50 focus:bg-black/25 focus:ring-2 focus:ring-(--logo-bg)/10 disabled:cursor-not-allowed disabled:opacity-60"
          placeholder="0"
        />
      </div>
    </div>
  </div>
</template>
