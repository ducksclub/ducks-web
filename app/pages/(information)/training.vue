<script setup lang="ts">
import { ref } from 'vue'

const opened = ref<string | null>(null)

const toggle = (key: string) => {
  opened.value = opened.value === key ? null : key
}

const steps = [
  {
    key: 'regular',
    title: 'REGULAR FISH',
    desc: 'Базовый уровень. Игрок понимает правила покера, комбинации и основы принятия решений за столом. Основной фокус — минимизация ошибок и обучение дисциплине.',
  },
  {
    key: 'senior',
    title: 'Senior FISH',
    desc: 'Игрок уже знаком с базовой стратегией. Начинается работа над диапазонами рук, позиционной игрой и чтением оппонентов. Формируется фундамент стратегии.',
  },
  {
    key: 'middle',
    title: 'Middle FISH',
    desc: 'Средний уровень. Игрок активно работает над математикой покера: пот-оддсы, EV, баланс диапазонов. Вводится продвинутая постфлоп игра.',
  },
  {
    key: 'profi',
    title: 'PROFI Junior FISH',
    desc: 'Почти профессиональный уровень. Углублённая стратегия, эксплуатация оппонентов, GTO основы, работа с анализом раздач и софтом. Подготовка к профессиональной игре.',
  },
]
</script>

<template>
  <div class="min-h-screen bg-black text-white px-4 pt-safe pb-safe">
    <!-- HEADER -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold">Курс обучения покеру</h1>
      <p class="text-sm text-white/60 mt-2">4 ступени от BASE до PROFI уровня</p>
    </div>

    <!-- INTRO CARD -->
    <div class="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
      <p class="text-sm text-white/70 leading-relaxed">
        На базе нашего клуба доступен структурированный курс обучения покеру, состоящий из 4
        ступеней. Каждая ступень — это отдельный уровень понимания игры, от новичка до продвинутого
        игрока.
      </p>
    </div>

    <!-- ACCORDION -->
    <div class="space-y-3">
      <div
        v-for="item in steps"
        :key="item.key"
        class="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
      >
        <!-- HEADER -->
        <button
          @click="toggle(item.key)"
          class="w-full flex items-center justify-between px-4 py-4 text-left"
        >
          <span class="font-semibold tracking-wide">
            {{ item.title }}
          </span>

          <span
            class="text-white/60 transition-transform"
            :class="opened === item.key ? 'rotate-180' : ''"
          >
            ▼
          </span>
        </button>

        <!-- CONTENT -->
        <div v-show="opened === item.key" class="px-4 pb-4 text-sm text-white/70 leading-relaxed">
          {{ item.desc }}
        </div>
      </div>
    </div>

    <!-- FOOTER CTA -->
    <div class="mt-8 rounded-2xl bg-white text-black p-4 text-center font-semibold">
      Записаться на курс
    </div>
  </div>
</template>
