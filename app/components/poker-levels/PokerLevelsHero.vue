<script setup lang="ts">
import { GraduationCap } from '@lucide/vue'
</script>

<template>
  <div class="overflow-hidden rounded-3xl border border-white/5 bg-(--secondary)/20">
    <div class="p-5">
      <div
        class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-300 shadow-[0_0_16px_rgba(239,68,68,0.12)]"
      >
        <GraduationCap :size="22" />
      </div>

      <h1 class="text-xl font-black text-white">Курс обучения покеру</h1>

      <p class="mt-2 text-sm leading-relaxed text-gray-400">
        На базе нашего клуба доступен структурированный курс обучения покеру, состоящий из 4
        ступеней — от базового понимания игры до профессионального уровня.
      </p>

      <div
        class="mt-4 inline-flex rounded-xl border border-red-500/10 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200"
      >
        4 ступени • BASE → PROFI
      </div>
    </div>
  </div>
</template>
