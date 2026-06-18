<script setup lang="ts">
import { Send, Phone, HelpCircle, MessageCircle } from '@lucide/vue'

import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'

definePageMeta({
  layout: 'empty',
})

useHead({
  title: "Duck's | Пользовательская информация",
})

const menu = [
  {
    label: 'Поддержка',
    sub: '',
    icon: Send,
    link: '/support',
  },
  {
    label: 'Правила',
    sub: '',
    icon: MessageCircle,
    link: '/rules',
  },
  {
    label: 'Обучение',
    sub: '',
    icon: Phone,
    link: '/training/levels',
  },
]
</script>

<template>
  <BaseHeader>
    <template #left>
      <HeaderBackButton />
    </template>

    <template #default>
      <HeaderTitle title="Пользовательская информация" />
    </template>
  </BaseHeader>

  <main class="p-6">
    <div class="space-y-2">
      <NuxtLink
        v-for="item in menu"
        :key="item.label"
        :to="item.link"
        class="group flex items-center gap-4 rounded-3xl border border-white/5 bg-(--secondary)/20 p-4 transition-all duration-200 hover:border-(--logo-bg)/20 hover:bg-white/4 active:scale-[0.98]"
      >
        <div
          class="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-(--logo-bg) transition group-hover:border-(--logo-bg)/30"
        >
          <component :is="item.icon" :size="18" />
        </div>

        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-bold text-white">
            {{ item.label }}
          </p>

          <p class="mt-1 truncate text-xs text-gray-500">
            {{ item.sub }}
          </p>
        </div>

        <span
          class="flex size-8 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-(--logo-bg) transition group-hover:translate-x-0.5"
        >
          →
        </span>
      </NuxtLink>
    </div>
  </main>
</template>
