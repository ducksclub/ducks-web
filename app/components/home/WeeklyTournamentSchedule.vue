<script setup lang="ts">
import { CalendarDays, ChevronRight } from '@lucide/vue'

type ScheduleDay = {
  weekday: string
  date: string
  time: string
  active?: boolean
}

withDefaults(
  defineProps<{
    title?: string
    days?: ScheduleDay[]
  }>(),
  {
    title: 'РАСПИСАНИЕ ТУРНИРОВ НА НЕДЕЛЮ',
    days: () => [
      {
        weekday: 'ПН',
        date: '30 июня',
        time: '20:00',
      },
      {
        weekday: 'ВТ',
        date: '1 июля',
        time: '18:30',
        active: true,
      },
      {
        weekday: 'СР',
        date: '2 июля',
        time: '21:00',
      },
      {
        weekday: 'ЧТ',
        date: '3 июля',
        time: '19:00',
      },
      {
        weekday: 'ПТ',
        date: '4 июля',
        time: '20:30',
      },
      {
        weekday: 'СБ',
        date: '5 июля',
        time: '18:00',
      },
      {
        weekday: 'ВС',
        date: '6 июля',
        time: '20:00',
      },
    ],
  },
)

const emit = defineEmits<{
  open: []
}>()
</script>

<template>
  <section
    class="group relative overflow-hidden rounded-2xl border border-white/5 bg-(--secondary)/20 p-3 backdrop-blur-xl transition hover:border-(--logo-bg)/20 hover:bg-white/4"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-linear-to-br from-(--logo-bg)/14 via-(--logo-bg)/4 to-transparent"
    />
    <div
      class="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-(--logo-bg)/12 blur-3xl transition group-hover:bg-(--logo-bg)/18"
    />
    <div
      class="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
    />

    <div class="relative z-10">
      <div class="flex items-center gap-2.5">
        <div
          class="flex size-9 shrink-0 items-center justify-center rounded-xl border border-(--logo-bg)/20 bg-(--logo-bg)/10 text-(--logo-bg)"
          aria-hidden="true"
        >
          <CalendarDays :size="17" :stroke-width="2.5" />
        </div>

        <div class="min-w-0 flex-1">
          <h2 class="mt-0.5 text-xs leading-4 font-black tracking-wide text-white uppercase">
            {{ title }}
          </h2>
        </div>

        <button
          class="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/5 bg-white/5 text-(--logo-bg) transition hover:border-(--logo-bg)/25 hover:bg-(--logo-bg)/10 active:scale-95"
          type="button"
          aria-label="Открыть расписание турниров"
          @click="emit('open')"
        >
          <ChevronRight :size="16" :stroke-width="2.5" />
        </button>
      </div>

      <div class="mt-3 grid grid-cols-7 gap-1.5">
        <div
          v-for="day in days"
          :key="`${day.weekday}-${day.date}-${day.time}`"
          class="min-w-0 rounded-xl border px-1 py-2 text-center transition"
          :class="
            day.active
              ? 'border-(--logo-bg)/30 bg-(--logo-bg)/10 shadow-[0_10px_28px_rgba(220,38,38,0.12)]'
              : 'border-white/5 bg-black/18'
          "
        >
          <div
            class="text-[10px] leading-none font-black tracking-wide"
            :class="day.active ? 'text-(--logo-bg)' : 'text-gray-500'"
          >
            {{ day.weekday }}
          </div>

          <div
            class="mt-1.5 min-h-7 text-[9px] leading-3 font-semibold text-gray-400"
            :class="{ 'text-red-100/80': day.active }"
          >
            {{ day.date }}
          </div>

          <div
            class="text-[13px] leading-none font-black text-white tabular-nums"
            :class="{ 'text-white': day.active }"
          >
            {{ day.time }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
