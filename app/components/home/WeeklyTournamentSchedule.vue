<script setup lang="ts">
import { CalendarDays, ChevronRight } from '@lucide/vue'
import type { Event } from '~/types/event'

type CalendarDay = {
  weekday: string
  date: string
  time: string
  eventCount: number
  active: boolean
}

const props = withDefaults(
  defineProps<{
    title?: string
    events?: Event[]
  }>(),
  {
    title: 'РАСПИСАНИЕ ТУРНИРОВ НА НЕДЕЛЮ',
    events: () => [],
  },
)

const emit = defineEmits<{
  open: []
}>()

const selectedDate = ref(new Date())
let dateSyncInterval: ReturnType<typeof setInterval> | undefined

const formatWeekday = (date: Date) =>
  new Intl.DateTimeFormat('ru-RU', {
    weekday: 'short',
  })
    .format(date)
    .replace('.', '')
    .toUpperCase()

const isSameDate = (left: Date, right: Date) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate()

const syncSelectedDate = () => {
  selectedDate.value = new Date()
}

onMounted(() => {
  syncSelectedDate()
  dateSyncInterval = setInterval(syncSelectedDate, 60_000)
})

onBeforeUnmount(() => {
  if (dateSyncInterval) {
    clearInterval(dateSyncInterval)
  }
})

const calendarDays = computed<CalendarDay[]>(() => {
  const today = selectedDate.value
  const startDate = new Date(today)
  startDate.setHours(0, 0, 0, 0)

  return Array.from({ length: 7 }, (_, index) => {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + index)

    const eventsByDay = props.events
      .filter((event) => isSameDate(new Date(event.startsAt), currentDate))
      .sort((left, right) => new Date(left.startsAt).getTime() - new Date(right.startsAt).getTime())

    const nearestEvent = eventsByDay[0]

    return {
      weekday: formatWeekday(currentDate),
      date: formatDate(currentDate, { format: 'D MMMM' }),
      time: nearestEvent ? formatDate(nearestEvent.startsAt, { format: 'HH:mm' }) : 'Нет',
      eventCount: eventsByDay.length,
      active: isSameDate(currentDate, today),
    }
  })
})
</script>

<template>
  <section
    class="group relative overflow-hidden rounded-2xl border border-red-500/70 bg-black/70 px-3 py-2.5 shadow-[0_0_18px_rgba(239,68,68,0.55),inset_0_0_18px_rgba(239,68,68,0.16)] backdrop-blur-xl transition hover:border-red-400 hover:bg-black/75 hover:shadow-[0_0_26px_rgba(239,68,68,0.7),inset_0_0_22px_rgba(239,68,68,0.2)]"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-linear-to-br from-red-500/24 via-red-950/18 to-transparent"
    />
    <div
      class="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-red-500/30 blur-3xl transition group-hover:bg-red-400/35"
    />
    <div
      class="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_0_0_1px_rgba(248,113,113,0.18)]"
    />

    <div class="relative z-10">
      <div class="flex items-center gap-2.5">
        <div
          class="flex size-8 shrink-0 items-center justify-center rounded-xl border border-red-400/55 bg-red-500/12 text-amber-200 shadow-[0_0_14px_rgba(239,68,68,0.42)]"
          aria-hidden="true"
        >
          <CalendarDays :size="16" :stroke-width="2.5" />
        </div>

        <div class="min-w-0 flex-1">
          <h2
            class="mt-0.5 text-xs leading-4 font-black tracking-wide text-amber-200 uppercase [text-shadow:0_0_10px_rgba(251,191,36,0.85),0_0_18px_rgba(239,68,68,0.55)]"
          >
            {{ title }}
          </h2>
        </div>

        <button
          class="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-red-400/40 bg-red-500/10 text-amber-200 shadow-[0_0_12px_rgba(239,68,68,0.35)] transition hover:border-red-300/65 hover:bg-red-500/18 active:scale-95"
          type="button"
          aria-label="Открыть расписание турниров"
          @click="emit('open')"
        >
          <ChevronRight :size="16" :stroke-width="2.5" />
        </button>
      </div>

      <div class="mt-2 grid grid-cols-7 gap-1.5">
        <div
          v-for="day in calendarDays"
          :key="`${day.weekday}-${day.date}-${day.time}`"
          class="min-w-0 rounded-xl border px-1 py-1.5 text-center transition"
          :class="
            day.active
              ? 'border-red-400/55 bg-red-500/12 shadow-[0_0_16px_rgba(239,68,68,0.32)]'
              : 'border-red-500/14 bg-black/28'
          "
        >
          <div
            class="text-[10px] leading-none font-black tracking-wide text-amber-200 [text-shadow:0_0_9px_rgba(251,191,36,0.55)]"
          >
            {{ day.weekday }}
          </div>

          <div class="mt-1 min-h-6 text-[9px] leading-3 font-bold text-amber-300/75">
            <span class="inline-block rounded px-1">
              {{ day.date }}
            </span>
          </div>

          <div
            class="text-[10px] leading-none font-black text-white tabular-nums [text-shadow:0_0_8px_rgba(255,255,255,0.36)]"
            :class="[
              day.active && 'text-white',
              !day.eventCount && 'text-[10px] text-white/42 normal-nums',
            ]"
          >
            {{ day.time }}
          </div>

          <div
            v-if="day.eventCount > 1"
            class="mt-1 text-[9px] leading-none font-bold text-(--logo-bg)"
          >
            +{{ day.eventCount - 1 }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
