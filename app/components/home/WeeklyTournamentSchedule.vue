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

const formatCalendarDate = (date: Date) =>
  new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
  }).format(date)

const isSameDate = (left: Date, right: Date) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate()

const formatEventTime = (date: Date) =>
  new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)

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
      date: formatCalendarDate(currentDate),
      time: nearestEvent ? formatEventTime(new Date(nearestEvent.startsAt)) : 'Нет',
      eventCount: eventsByDay.length,
      active: isSameDate(currentDate, today),
    }
  })
})
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
          v-for="day in calendarDays"
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
            :class="[
              day.active && 'text-white',
              !day.eventCount && 'text-[10px] text-gray-600 normal-nums',
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
