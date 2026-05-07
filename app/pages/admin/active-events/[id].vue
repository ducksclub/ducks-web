<script setup lang="ts">
import { useEventsApi } from '~/api/events.api'
import type { Event } from '~/types/events'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const route = useRoute()
const id = route.params.id as string

const { getEventParticipants, reorderParticipants, finalizeEvent, getEvent } = useEventsApi()

const event = ref<Event>()
const participants = ref<any[]>([])

const isLoading = ref(true)
const isSavingOrder = ref(false)
const isFinalizing = ref(false)
const isDirty = ref(false)

/**
 * LOAD DATA
 */
const load = async () => {
  isLoading.value = true

  try {
    const [eventRes, participantsRes] = await Promise.all([getEvent(id), getEventParticipants(id)])

    event.value = eventRes
    participants.value = participantsRes.participants
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

onMounted(load)

// =========================
// MOVE LOGIC (UI ONLY)
// =========================
const move = (index: number, direction: 'up' | 'down') => {
  if (event.value?.status === 'completed') return

  const newIndex = direction === 'up' ? index - 1 : index + 1
  if (newIndex < 0 || newIndex >= participants.value.length) return

  const temp = participants.value[index]
  participants.value[index] = participants.value[newIndex]
  participants.value[newIndex] = temp

  isDirty.value = true
}

// =========================
// SAVE ORDER
// =========================
const saveOrder = async () => {
  if (!isDirty.value || isSavingOrder.value) return

  isSavingOrder.value = true

  try {
    await reorderParticipants(id, {
      participants: participants.value.map((p, index) => ({
        userId: p.userId || p.user?.id,
        position: index + 1,
      })),
    })

    isDirty.value = false

    await load()
  } catch (e) {
    console.error('Save order failed', e)
  } finally {
    isSavingOrder.value = false
  }
}

// =========================
// FINALIZE EVENT
// =========================
const onFinalize = async () => {
  if (isFinalizing.value || event.value?.status === 'completed') return

  const ok = confirm('Финализировать событие? Очки будут начислены и изменения станут невозможны.')

  if (!ok) return

  isFinalizing.value = true

  try {
    await finalizeEvent(id)
    await load()
  } catch (e) {
    console.error('Finalize failed', e)
  } finally {
    isFinalizing.value = false
  }
}

// =========================
// POINTS DISPLAY (frontend hint)
// =========================
const getPointsLabel = (index: number) => {
  const base = event.value?.pointsForParticipation ?? 10
  return `~${base - index * 2} pts (preview)`
}
</script>

<template>
  <div class="min-h-screen bg-(--bg) text-white">
    <!-- HEADER -->
    <div class="sticky top-0 z-20 border-b border-white/5 bg-(--bg)/80 backdrop-blur-xl">
      <div class="flex items-center justify-between px-4 py-4">
        <div>
          <h1 class="text-xl font-semibold">
            {{ event?.address || 'Event' }}
          </h1>

          <p class="text-sm text-gray-400">Управление участниками</p>
        </div>

        <div class="flex gap-2">
          <!-- SAVE ORDER -->
          <button
            class="rounded-xl px-3 py-2 text-sm transition"
            :class="isDirty ? 'bg-yellow-500 text-black' : 'bg-white/5 text-gray-400'"
            :disabled="!isDirty || isSavingOrder"
            @click="saveOrder"
          >
            {{ isSavingOrder ? 'Сохранение...' : 'Сохранить' }}
          </button>

          <!-- FINALIZE -->
          <button
            class="rounded-xl px-3 py-2 text-sm transition"
            :class="
              event?.status === 'completed'
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                : 'bg-red-500 text-white'
            "
            :disabled="isFinalizing || event?.status === 'completed'"
            @click="onFinalize"
          >
            {{
              event?.status === 'completed'
                ? 'Завершено'
                : isFinalizing
                  ? 'Финализация...'
                  : 'Завершить'
            }}
          </button>
        </div>
      </div>
    </div>

    <!-- LOADING -->
    <div v-if="isLoading" class="p-4 space-y-4">
      <div class="h-20 animate-pulse rounded-3xl bg-(--secondary)/20" />
      <div class="h-20 animate-pulse rounded-3xl bg-(--secondary)/20" />
      <div class="h-20 animate-pulse rounded-3xl bg-(--secondary)/20" />
    </div>

    <!-- LIST -->
    <div v-else class="space-y-3 p-4 pb-24">
      <div
        v-for="(p, index) in participants"
        :key="p.id"
        class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-4"
      >
        <div class="flex items-center justify-between">
          <!-- LEFT -->
          <div class="flex items-center gap-4">
            <div class="w-8 text-lg font-bold text-gray-300">#{{ index + 1 }}</div>

            <div>
              <p class="text-sm font-medium">
                {{ p.user?.name }}
              </p>

              <p class="text-xs text-gray-400">
                {{ p.user?.email }}
              </p>
            </div>
          </div>

          <!-- RIGHT -->
          <div class="text-right">
            <p class="text-sm font-semibold text-green-400">
              {{ getPointsLabel(index) }}
            </p>

            <p class="text-xs text-gray-500">preview points</p>
          </div>
        </div>

        <!-- ACTIONS -->
        <div class="mt-3 flex gap-2" v-if="event?.status !== 'completed'">
          <button
            class="flex-1 rounded-xl bg-white/5 px-3 py-2 text-xs hover:bg-white/10"
            @click="move(index, 'up')"
          >
            ↑ вверх
          </button>

          <button
            class="flex-1 rounded-xl bg-white/5 px-3 py-2 text-xs hover:bg-white/10"
            @click="move(index, 'down')"
          >
            ↓ вниз
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
