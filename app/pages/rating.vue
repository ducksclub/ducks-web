<template>
  <div class="min-h-screen bg-[#0F0F0F] text-white pb-24 font-sans">
    <header class="p-6 text-center">
      <h1 class="text-xl font-black uppercase tracking-widest italic">Рейтинг игроков</h1>
    </header>

    <div class="px-4">
      <div class="bg-[#1A1A1A] p-1 rounded-2xl flex mb-6 border border-white/5">
        <button v-for="t in ['Покер', 'Дартс', 'Бильярд']" :key="t" @click="activeTab = t"
          :class="['flex-1 py-3 rounded-xl font-black text-xs uppercase transition-all italic', activeTab === t ? 'bg-[#E11D48] shadow-lg' : 'text-gray-500']">
          {{ t }}
        </button>
      </div>

      <div class="grid grid-cols-12 px-4 mb-2 text-[10px] font-black text-gray-600 uppercase tracking-widest italic">
        <div class="col-span-2">Поз.</div>
        <div class="col-span-7">Никнейм</div>
        <div class="col-span-3 text-right">Очки</div>
      </div>

      <div class="space-y-2">
        <div v-for="(p, i) in players" :key="p.name"
          :class="['grid grid-cols-12 items-center p-4 rounded-2xl border transition-all',
          p.isMe ? 'bg-[#E11D48]/10 border-[#E11D48]/30' : 'bg-[#1A1A1A] border-white/5']">

          <div class="col-span-2 font-black italic" :class="i < 3 ? 'text-[#E11D48] text-lg' : 'text-gray-500'">
            {{ i + 1 }}
          </div>

          <div class="col-span-7 flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-[#0F0F0F] flex items-center justify-center border border-white/10 text-xs shadow-inner">
              {{ p.avatar }}
            </div>
            <span :class="['font-bold text-sm italic uppercase tracking-tight', p.isMe ? 'text-white' : 'text-gray-300']">{{ p.name }}</span>
          </div>

          <div class="col-span-3 text-right font-black italic" :class="p.isMe ? 'text-[#E11D48]' : 'text-white'">
            {{ p.score }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const activeTab = ref('Покер')
const players = [
  { name: 'Joker', score: 2500, avatar: '🤡' },
  { name: 'AceKing', score: 2100, avatar: '🤴' },
  { name: 'LuckyDuck', score: 1980, avatar: '🦆' },
  { name: 'PushFold', score: 1750, avatar: '💣' },
  { name: 'DarkSide', score: 1600, avatar: '🥷' },
  { name: 'Alexey Duck', score: 1250, avatar: '🕶️', isMe: true },
]
</script>
