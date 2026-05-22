<script setup lang="ts">
import { CalendarDays, ChevronRight, MessageSquare } from '@lucide/vue'

import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

useHead({
  title: "Duck's Admin | Меню",
})

const { impact } = useTelegramHaptics()

const menu = computed(() => {
  const items = [
    {
      label: 'Активные события',
      description: 'Активные турниры и игры',
      path: '/admin/active-events',
      icon: CalendarDays,
    },
    {
      label: 'Контент',
      description: 'Основной контент для участников',
      path: '/admin/content',
      icon: MessageSquare,
    },
    {
      label: 'Feedback',
      description: 'Отзывы и предложения от участников',
      path: '/admin/feedback',
      icon: MessageSquare,
    },
  ]

  return items
})

const go = async (path: string) => {
  impact('light')
  await navigateTo(path)
}
</script>

<template>
  <BaseHeader>
    <template #default>
      <HeaderTitle title="Меню" />
    </template>
  </BaseHeader>

  <main class="p-6">
    <section class="space-y-2">
      <button
        v-for="item in menu"
        :key="item.path"
        type="button"
        class="group flex w-full items-center gap-4 rounded-3xl border border-white/5 bg-(--secondary)/20 p-4 text-left transition-all duration-200 hover:border-(--logo-bg)/25 hover:bg-white/4 active:scale-[0.98]"
        @click="go(item.path)"
      >
        <div
          class="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-(--logo-bg) transition-all duration-200 group-hover:border-(--logo-bg)/30 group-hover:bg-(--logo-bg)/10"
        >
          <component :is="item.icon" :size="19" />
        </div>

        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-black text-white">
            {{ item.label }}
          </p>

          <p class="mt-1 truncate text-xs text-gray-500">
            {{ item.description }}
          </p>
        </div>

        <div
          class="flex size-8 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-gray-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-(--logo-bg)"
        >
          <ChevronRight :size="17" />
        </div>
      </button>
    </section>
  </main>
</template>
