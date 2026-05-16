<script setup lang="ts">
import type { MySeatResponse } from '~/types/event-seat'
import { X } from '@lucide/vue'

const seatModalText = {
  hiddenTitle: 'Место пока скрыто',
  hiddenDescription: 'Тут появится место за 15 минут до начала игры.',
  assignedTitle: 'Ваше место',
  tableLabel: 'Стол',
  seatLabel: 'Место',
  waitingTitle: 'Вы в списке ожидания',
  waitingPosition: 'Ваша позиция в очереди',
  waitingDescription: 'Когда освободится место, вы автоматически попадете в список участников.',
  close: 'Понятно',
}

const props = defineProps<{
  open: boolean
  seatInfo: MySeatResponse | null
  error?: string | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const title = computed(() => {
  if (props.error) return 'Не удалось узнать место'
  if (props.seatInfo?.status === 'SEAT_ASSIGNED') return seatModalText.assignedTitle
  if (props.seatInfo?.status === 'WAITING') return seatModalText.waitingTitle
  return seatModalText.hiddenTitle
})

const formattedAvailableAt = computed(() => {
  if (props.seatInfo?.status !== 'HIDDEN_UNTIL_15_MIN' || !props.seatInfo.availableAt) return ''

  return formatDate(props.seatInfo.availableAt, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
})

const close = () => emit('close')

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.open) close()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="seat-modal">
      <div v-if="open" class="fixed inset-0 z-100 flex items-end justify-center p-4 sm:items-center">
        <button
          class="absolute inset-0 bg-black/70 backdrop-blur-sm"
          type="button"
          aria-label="Закрыть окно"
          @click="close"
        />

        <div
          class="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#14151c] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">
                Покер
              </p>
              <h2 class="mt-2 text-xl font-black text-white">{{ title }}</h2>
            </div>

            <button
              class="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-gray-300 transition hover:bg-white/10 active:scale-95"
              type="button"
              aria-label="Закрыть"
              @click="close"
            >
              <X class="size-5" />
            </button>
          </div>

          <div v-if="error" class="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
            <p class="text-sm leading-6 text-red-300">{{ error }}</p>
          </div>

          <div v-else-if="seatInfo?.status === 'SEAT_ASSIGNED'" class="mt-5 space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div class="rounded-2xl border border-white/5 bg-white/5 p-4">
                <p class="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  {{ seatModalText.tableLabel }}
                </p>
                <p class="mt-2 text-3xl font-black text-white">№{{ seatInfo.tableNumber }}</p>
              </div>

              <div class="rounded-2xl border border-(--logo-bg)/20 bg-(--logo-bg)/10 p-4">
                <p class="text-[10px] font-bold uppercase tracking-widest text-red-200/70">
                  {{ seatModalText.seatLabel }}
                </p>
                <p class="mt-2 text-3xl font-black text-white">№{{ seatInfo.seatNumber }}</p>
              </div>
            </div>

            <p class="text-sm leading-6 text-gray-400">
              Подойдите к своему столу за несколько минут до начала игры.
            </p>
          </div>

          <div v-else-if="seatInfo?.status === 'WAITING'" class="mt-5 space-y-4">
            <div class="rounded-2xl border border-white/5 bg-white/5 p-4">
              <p class="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                {{ seatModalText.waitingPosition }}
              </p>
              <p class="mt-1 text-3xl font-black text-white">№{{ seatInfo.waitingPosition }}</p>
            </div>

            <p class="text-sm leading-6 text-gray-400">
              {{ seatModalText.waitingDescription }}
            </p>
          </div>

          <div v-else class="mt-5 space-y-4">
            <div class="rounded-2xl border border-white/5 bg-white/5 p-4">
              <p class="text-sm leading-6 text-gray-200">
                {{ seatModalText.hiddenDescription }}
              </p>

              <p v-if="formattedAvailableAt" class="mt-3 text-xs font-semibold text-gray-400">
                Доступно с: {{ formattedAvailableAt }}
              </p>
            </div>
          </div>

          <BaseButton class="mt-5" variant="secondary" @click="close">
            {{ seatModalText.close }}
          </BaseButton>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.seat-modal-enter-active,
.seat-modal-leave-active {
  transition: opacity 0.2s ease;
}

.seat-modal-enter-from,
.seat-modal-leave-to {
  opacity: 0;
}
</style>
