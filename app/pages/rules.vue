<template>
  <div class="p-6 space-y-6">
    <h1 class="text-xl font-black italic uppercase text-center py-4">ПРАВИЛА КЛУБА</h1>
    <div class="space-y-4">
      <div
        v-for="(r, i) in rules"
        :key="i"
        class="bg-[#1A1A1A] p-5 rounded-[24px] border border-white/5 flex gap-4"
      >
        <span class="text-[#E11D48] font-black italic text-xl">{{ i + 1 }}</span>
        <p class="text-sm font-medium leading-relaxed">{{ r }}</p>
      </div>
    </div>
    <button
      class="w-full bg-[#E11D48] font-black py-4 rounded-2xl shadow-xl italic uppercase tracking-widest"
    >
      Полные правила PDF
    </button>
  </div>
</template>

<script setup>
const rules = [
  'Уважай других игроков и персонал',
  'Честная игра и спортивное поведение',
  'Запрещено употребление наркотиков',
  'Следуй указаниям администратора',
]
</script>
