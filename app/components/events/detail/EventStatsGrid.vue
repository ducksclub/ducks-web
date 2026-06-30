<script setup lang="ts">
defineProps<{
  registrationsCount: number
  participantLimit: number
  hasSeatingInfo: boolean
  seatingTableCount: number | null
  seatsPerTable?: number
  seatingTotalSeats: number | null
}>()
</script>

<template>
  <div class="grid grid-cols-1 gap-3">
    <div class="rounded-2xl border border-white/5 bg-(--secondary)/20 p-4">
      <p class="text-[10px] text-gray-500 uppercase tracking-widest">Участники</p>
      <p class="mt-1 text-sm font-bold">
        {{ registrationsCount }} / {{ participantLimit }}
      </p>
    </div>

    <div v-if="hasSeatingInfo" class="rounded-2xl border border-white/5 bg-(--secondary)/20 p-4">
      <p class="text-[10px] text-gray-500 uppercase tracking-widest">Посадка</p>
      <p class="mt-1 text-sm font-bold text-white">
        {{ seatingTableCount }} столов · по {{ seatsPerTable }} мест
      </p>
      <p v-if="seatingTotalSeats" class="mt-1 text-xs text-gray-400">
        Всего мест: {{ seatingTotalSeats }}
      </p>
    </div>
  </div>
</template>
