<template>
  <div class="min-h-screen bg-[#0F0F0F] text-white pb-32">
    <header class="p-6 pb-2 text-center sticky top-0 bg-[#0F0F0F]/80 backdrop-blur-lg z-50">
      <h1 class="text-xl font-black uppercase tracking-widest italic">Афиша</h1>
    </header>

    <div class="p-4 space-y-6">
      <div class="flex gap-2 overflow-x-auto no-scrollbar py-2">
        <button
          v-for="cat in ['Все', 'Покер', 'Дартс', 'Бильярд', 'Квиз']"
          :key="cat"
          @click="selectedCat = cat"
          :class="[
            'px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all active:scale-95',
            selectedCat === cat
              ? 'bg-[#E11D48] text-white shadow-lg shadow-[#E11D48]/20'
              : 'bg-[#1A1A1A] text-gray-500',
          ]"
        >
          {{ cat }}
        </button>
      </div>

      <section>
        <h3 class="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 ml-2">
          Ближайшие события
        </h3>
        <div class="space-y-3">
          <div
            v-for="event in events"
            :key="event.id"
            class="bg-[#1A1A1A] border border-white/5 p-4 rounded-[24px] flex items-center gap-4 active:scale-[0.98] transition-transform"
          >
            <div
              class="w-16 h-16 rounded-2xl bg-[#0F0F0F] flex items-center justify-center text-3xl shadow-inner"
            >
              {{ event.icon }}
            </div>
            <div class="flex-grow">
              <div class="flex justify-between items-start">
                <h4 class="font-bold text-base leading-tight">{{ event.title }}</h4>
                <span
                  class="text-[10px] bg-[#E11D48]/10 text-[#E11D48] px-2 py-0.5 rounded-full font-bold uppercase"
                  >{{ event.cat }}</span
                >
              </div>
              <div class="flex items-center gap-3 mt-1 text-xs text-gray-500 font-medium">
                <span class="flex items-center gap-1"
                  ><svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {{ event.date }}</span
                >
                <span class="flex items-center gap-1 font-bold text-gray-400 italic"
                  >@ {{ event.time }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="fixed bottom-24 left-0 right-0 px-6 z-40">
      <button
        class="w-full bg-[#E11D48] text-white font-black py-4 rounded-2xl shadow-xl active:scale-95 transition-all uppercase tracking-wider"
      >
        Записаться на событие
      </button>
    </div>

    <nav
      class="fixed bottom-0 left-0 right-0 bg-[#141414]/90 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex justify-between items-center z-50"
    >
      <div
        v-for="nav in navItems"
        :key="nav.label"
        @click="navigateTo(nav.path)"
        class="flex flex-col items-center gap-1 cursor-pointer group"
      >
        <div :class="[nav.active ? 'text-[#E11D48]' : 'text-gray-600']">
          <component :is="nav.icon" class="w-6 h-6" />
        </div>
        <span
          :class="[
            'text-[10px] font-bold uppercase',
            nav.active ? 'text-[#E11D48]' : 'text-gray-600',
          ]"
          >{{ nav.label }}</span
        >
      </div>
    </nav>
  </div>
</template>

<script setup>
const selectedCat = ref('Все')
const events = [
  { id: 1, title: 'Турнир по покеру', date: '25 мая', time: '19:00', cat: 'Покер', icon: '♠️' },
  { id: 2, title: 'Дартс баттл', date: '27 мая', time: '20:00', cat: 'Дартс', icon: '🎯' },
  { id: 3, title: 'Квиз: Кино и музыка', date: '30 мая', time: '18:00', cat: 'Квиз', icon: '🎬' },
  { id: 4, title: 'Мафия Night', date: '31 мая', time: '19:30', cat: 'Квиз', icon: '🕵️‍♂️' },
]

const navItems = [
  { label: 'Афиша', active: true, path: '/events' },
  { label: 'Рейтинг', active: false, path: '/rating' },
  { label: 'Моё', active: false, path: '/profile' },
  { label: 'Правила', active: false, path: '/rules' },
  { label: 'Help', active: false, path: '/support' },
]
</script>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
