<template>
  <div class="p-6 space-y-8">
    <h1 class="text-xl font-black italic uppercase text-center py-4">ПОДДЕРЖКА</h1>
    <div class="space-y-3">
      <div
        v-for="c in contacts"
        :key="c.label"
        class="bg-[#1A1A1A] p-5 rounded-3xl border border-white/5 flex items-center gap-4 active:scale-95 transition-all cursor-pointer"
      >
        <span class="text-3xl">{{ c.icon }}</span>
        <div class="grow text-left">
          <p class="font-black italic text-sm uppercase leading-tight">{{ c.label }}</p>
          <p class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{{ c.sub }}</p>
        </div>
        <span class="text-[#E11D48]">→</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const contacts = [
  { label: 'Написать в Telegram', sub: 'Ответ за 5 минут', icon: '🤖' },
  { label: 'Позвонить в клуб', sub: '+7 (999) 123-45-67', icon: '📞' },
  { label: 'Часто задаваемые вопросы', sub: 'База знаний', icon: '❓' },
]
</script>
