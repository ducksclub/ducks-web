<script setup lang="ts">
import { ChevronDown, MapPinPlus, User } from '@lucide/vue'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'

definePageMeta({
  layout: 'empty',
  middleware: 'auth',
})

const router = useRouter()

const goToEvents = () => {
  router.push('/events')
}

const values = [
  {
    title: 'Принадлежность',
    description: 'место, где вы всегда «свой».',
  },
  {
    title: 'Дофамин',
    description: 'качественный отдых через интеллектуальный вызов.',
  },
  {
    title: 'Реализация',
    description: 'пространство для вашего проявления и роста.',
  },
  {
    title: 'Атмосфера',
    description:
      'интеллектуальный досуг (покер, дартс, пул, мафия, квизы), который помогает разгрузить мысли и вернуть ясность.',
  },
]

const openedValue = ref<string | null>(null)

const toggleValue = (title: string) => {
  openedValue.value = openedValue.value === title ? null : title
}
</script>

<template>
  <BaseHeader>
    <template #left>
      <HeaderBackButton />
    </template>

    <template #default>
      <HeaderTitle title="О клубе" />
    </template>
  </BaseHeader>

  <div class="p-4 space-y-4 pb-24">
    <!-- HERO -->
    <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-6">
      <div class="flex items-center gap-4">
        <div
          class="size-12 rounded-2xl bg-(--logo-bg)/10 flex items-center justify-center text-(--logo-bg)"
        >
          <User :size="24" />
        </div>

        <div>
          <h2 class="text-lg font-semibold">DUCK’S Game Space</h2>
          <p class="text-xs text-gray-500 tracking-widest">Gaming community</p>
        </div>
      </div>

      <p class="mt-4 text-sm text-gray-300 leading-relaxed">
        Первое в мегаполисе игровое пространство, где можно выдохнуть, перезагрузиться и проявить
        себя . Мы соединили интеллектуальную игру с качественным отдыхом, создав место, где каждый
        обретает собственную значимость и находит возможности для реализации.
      </p>

      <p class="mt-4 text-sm text-gray-300 leading-relaxed italic">
        Тренируйся умом — отдыхай телом
      </p>
    </div>

    <!-- SECTIONS GRID -->
    <div class="grid gap-3 md:grid-cols-2">
      <!-- HISTORY -->
      <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-5">
        <div class="flex items-center gap-2 text-gray-400 mb-3">
          <span class="text-(--logo-bg)">⌛</span>
          <span class="text-xs font-bold uppercase tracking-widest">История</span>
        </div>

        <p class="text-sm text-gray-300 leading-relaxed">
          Мы прошли десятки покерных клубов столицы и поняли: гостю не хватает главного. Не просто
          столов и фишек, а чувства, что ты пришёл к «своим». <br />
          Так родилась идея DUCK’S. Мы не хотим открывать «ещё один покерный клуб» — нам важно
          закрыть настоящую потребность в пространстве, где человек становится не просто игроком за
          столом, а частью круга, с которым делит и игру, и жизнь. <br />
          Здесь нет рамок одного формата. Покер, мафия, дартс, пул, квизы — интеллектуальный досуг
          без границ, в котором каждый находит себя и своих.
        </p>

        <p class="mt-4 text-sm text-gray-300 leading-relaxed italic">DUCK’S — клуб для своих.</p>
      </div>

      <!-- MISSION -->
      <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-5">
        <div class="flex items-center gap-2 text-gray-400 mb-3">
          <span class="text-(--logo-bg)">🎯</span>
          <span class="text-xs font-bold uppercase tracking-widest">Миссия</span>
        </div>

        <p class="text-sm text-gray-300 leading-relaxed">
          Дать нашим гостям возможность восстановить силы и получить здоровый дофамин, даже находясь
          в ритме большого города. Мы создаём среду, где игра становится инструментом для
          самореализации и глубокого, настоящего общения.
        </p>
      </div>

      <!-- VALUES -->
      <div class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-5 md:col-span-2">
        <div class="flex items-center gap-2 text-gray-400 mb-3">
          <span class="text-(--logo-bg)">⚡</span>
          <span class="text-xs font-bold uppercase tracking-widest">Ценности</span>
        </div>

        <div class="grid gap-3 text-sm sm:grid-cols-2">
          <button
            v-for="value in values"
            :key="value.title"
            type="button"
            class="rounded-2xl bg-white/5 p-3 text-left transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--logo-bg)/60"
            :aria-expanded="openedValue === value.title"
            @click="toggleValue(value.title)"
          >
            <span class="flex items-center justify-between gap-3">
              <span class="font-medium text-white">{{ value.title }}</span>
              <ChevronDown
                :size="16"
                class="shrink-0 text-gray-400 transition-transform duration-200"
                :class="{ 'rotate-180': openedValue === value.title }"
              />
            </span>

            <Transition
              enter-active-class="transition-all duration-200 ease-out overflow-hidden"
              enter-from-class="max-h-0 opacity-0"
              enter-to-class="max-h-24 opacity-100"
              leave-active-class="transition-all duration-150 ease-in overflow-hidden"
              leave-from-class="max-h-24 opacity-100"
              leave-to-class="max-h-0 opacity-0"
            >
              <p
                v-if="openedValue === value.title"
                class="mt-2 text-xs leading-relaxed text-gray-300"
              >
                {{ value.description }}
              </p>
            </Transition>
          </button>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div
      class="rounded-3xl border border-white/5 bg-linear-to-br from-white/10 to-white/5 p-6 text-center"
    >
      <h3 class="text-lg font-semibold">Хочешь участвовать?</h3>
      <p class="mt-2 text-sm text-gray-400">Присоединяйся к ближайшим событиям</p>

      <BaseButton :variant="'secondary'" @click="goToEvents" class="mt-5 w-full">
        Смотреть события
      </BaseButton>
    </div>

    <!-- FRANCHISE -->
    <div
      class="rounded-3xl border border-green-500/10 bg-linear-to-br from-green-500/10 to-transparent p-6 transition-all duration-300 hover:border-green-500/20"
    >
      <div class="flex items-center gap-3">
        <div
          class="flex size-12 items-center justify-center rounded-2xl bg-green-500/10 text-green-400"
        >
          <MapPinPlus :size="24" />
        </div>

        <div>
          <h3 class="text-base font-semibold text-white">Франшиза DUCK'S</h3>
          <p class="text-xs text-gray-400">Открой игровой клуб</p>
        </div>
      </div>

      <p class="mt-4 text-sm text-gray-300">
        Мы помогаем запускать игровые пространства и турниры.
      </p>

      <BaseButton
        @click="navigateTo('/profile/franchise')"
        class="mt-5 w-full bg-green-500! text-black! hover:bg-green-400! transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/30"
      >
        Стать партнером
      </BaseButton>
    </div>
  </div>
</template>
