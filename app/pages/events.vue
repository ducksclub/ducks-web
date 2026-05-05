<template>
  <div class="min-h-screen text-white pb-32">
    <LayoutHeader> Афиша </LayoutHeader>

    <div class="p-4 space-y-6">
      <EventsButtonGroup v-model="selectedCategory" :list="categories" />

      <section>
        <h3 class="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 ml-2">
          Ближайшие события
        </h3>

        <div class="space-y-3">
          <EventsCard v-for="event in events" :key="event.id" :event="event" />
        </div>
      </section>
    </div>

    <!--
    <div class="fixed bottom-24 left-0 right-0 px-6 z-40">
      <button
        class="w-full bg-[#E11D48] text-white font-black py-4 rounded-2xl shadow-xl active:scale-95 transition-all uppercase tracking-wider"
      >
        Записаться на событие
      </button>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import EventsButtonGroup from '~/components/events/EventsButtonGroup.vue'

const categories = ref<string[]>(['Все', 'Бильярд', 'Покер', 'Дартс', 'Квиз'])
const selectedCategory = ref<string>(categories.value[0] ?? 'Все')

const events = [
  {
    id: 1,
    title: 'Турнир по покеру',
    datetime: '25 мая 19:00',
    category: 'Покер',
    image: '♠️',
  },
  { id: 2, title: 'Дартс баттл', datetime: '27 мая 20:00', category: 'Дартс', image: '🎯' },
  {
    id: 3,
    title: 'Квиз: Кино и музыка',
    datetime: '30 мая 18:00',
    category: 'Квиз',
    image: '🎬',
  },
  { id: 4, title: 'Мафия Night', datetime: '31 мая 19:30', category: 'Квиз', image: '🕵️‍♂️' },
]
</script>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
