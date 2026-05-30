<script setup lang="ts">
import { Send, Phone, HelpCircle, MessageCircle } from '@lucide/vue'

import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'

useHead({
  title: "Duck's | Поддержка",
})

const contacts = [
  {
    label: 'Написать в Telegram',
    sub: 'Ответ за 5 минут',
    icon: Send,
    link: 'https://t.me/adm_ducks',
  },
  {
    label: 'Написать в MAX',
    sub: 'Уточнить детали',
    icon: MessageCircle,
    link: 'https://web.max.ru/+79152769269',
  },
  {
    label: 'Позвонить в клуб',
    sub: '+7 (915) 276-92-69',
    icon: Phone,
    link: 'tel:+79152769269',
  },
  {
    label: 'Часто задаваемые вопросы',
    sub: 'База знаний',
    icon: HelpCircle,
    link: '/support/faq',
  },
]
</script>

<template>
  <BaseHeader>
    <template #default>
      <HeaderTitle title="Поддержка" />
    </template>
  </BaseHeader>

  <main class="p-6">
    <div class="space-y-2">
      <NuxtLink
        v-for="contact in contacts"
        :key="contact.label"
        :to="contact.link"
        class="group flex items-center gap-4 rounded-3xl border border-white/5 bg-(--secondary)/20 p-4 transition-all duration-200 hover:border-(--logo-bg)/20 hover:bg-white/4 active:scale-[0.98]"
      >
        <div
          class="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-(--logo-bg) transition group-hover:border-(--logo-bg)/30"
        >
          <component :is="contact.icon" :size="18" />
        </div>

        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-bold text-white">
            {{ contact.label }}
          </p>

          <p class="mt-1 truncate text-xs text-gray-500">
            {{ contact.sub }}
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
