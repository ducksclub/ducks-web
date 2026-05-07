<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: 'auth',
})

const router = useRouter()

const goToEvents = () => {
  router.push('/events')
}
</script>

<template>
  <div class="min-h-screen bg-(--bg) text-white">
    <!-- HEADER -->
    <div class="sticky top-0 z-20 border-b border-white/5 bg-(--bg)/80 backdrop-blur-xl">
      <div class="flex items-center justify-between p-4">
        <BackButton to="/profile" label="Назад" />
      </div>
    </div>

    <div class="mx-auto max-w-2xl space-y-6 p-4 pb-24">
      <!-- HERO / INTRO -->
      <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-6">
        <div class="flex items-center gap-4">
          <div class="flex size-14 items-center justify-center rounded-2xl bg-white/10">
            <!-- DUCK ICON -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14 4c0 1.5-1 3-3 3S8 5.5 8 4s1-3 3-3 3 1.5 3 3z"
              />
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 21c0-5 4-9 9-9s9 4 9 9" />
            </svg>
          </div>

          <div>
            <h2 class="text-lg font-semibold">DUCK’S GameClub</h2>
            <p class="text-sm text-gray-400">Основан как игровое комьюнити</p>
          </div>
        </div>

        <p class="mt-4 text-sm text-gray-300 leading-relaxed">
          DUCK’S GameClub появился как идея собрать людей, которым не хватает живого общения, эмоций
          и соревновательного духа. Мы начали с небольших встреч, а выросли в полноценное игровое
          сообщество.
        </p>
      </div>

      <!-- HISTORY -->
      <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-6">
        <div class="mb-4 flex items-center gap-3 text-gray-400">
          <!-- HISTORY ICON -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3" />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 12a9 9 0 1018 0A9 9 0 003 12z"
            />
          </svg>

          <span class="text-sm font-medium">История клуба</span>
        </div>

        <div class="space-y-3 text-sm text-gray-300 leading-relaxed">
          <p>
            Изначально клуб был небольшой инициативой среди друзей, которые собирались играть в
            покер и настольные игры.
          </p>

          <p>
            Со временем формат вырос: появились регулярные события, рейтинги игроков и система
            участия.
          </p>

          <p>
            Сейчас DUCK’S GameClub — это структурированная платформа для организации игровых
            мероприятий.
          </p>
        </div>
      </div>

      <!-- MISSION -->
      <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-6">
        <div class="mb-4 flex items-center gap-3 text-gray-400">
          <!-- TARGET ICON -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <circle cx="12" cy="12" r="8" />
            <circle cx="12" cy="12" r="3" />
          </svg>

          <span class="text-sm font-medium">Миссия</span>
        </div>

        <p class="text-sm text-gray-300 leading-relaxed">
          Создавать пространство, где люди могут объединяться через игры, развивать навыки,
          соревноваться и находить новое окружение. Мы верим, что игра — это лучший способ
          социализации.
        </p>
      </div>

      <!-- VALUES -->
      <div class="grid gap-3 md:grid-cols-2">
        <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-5">
          <p class="text-sm font-medium text-white">Комьюнити</p>
          <p class="mt-2 text-sm text-gray-400">Люди важнее формата игры</p>
        </div>

        <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-5">
          <p class="text-sm font-medium text-white">Соревнование</p>
          <p class="mt-2 text-sm text-gray-400">Рейтинг и прогресс игроков</p>
        </div>

        <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-5">
          <p class="text-sm font-medium text-white">Развитие</p>
          <p class="mt-2 text-sm text-gray-400">Каждый ивент — новый опыт</p>
        </div>

        <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-5">
          <p class="text-sm font-medium text-white">Эмоции</p>
          <p class="mt-2 text-sm text-gray-400">Игра ради впечатлений</p>
        </div>
      </div>

      <!-- CTA -->
      <div
        class="rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 to-white/5 p-6 text-center"
      >
        <h3 class="text-lg font-semibold">Хочешь стать частью клуба?</h3>

        <p class="mt-2 text-sm text-gray-400">Присоединяйся к ближайшим событиям и начни играть</p>

        <button
          class="mt-5 rounded-2xl bg-(--primary) px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
          @click="goToEvents"
        >
          Смотреть события
        </button>
      </div>
    </div>
  </div>
</template>
