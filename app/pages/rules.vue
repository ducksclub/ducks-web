<script setup lang="ts">
import { ChevronDown, FileText } from '@lucide/vue'

import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'

type Rule = {
  title: string
  content: string
}

type DocumentItem = {
  title: string
  url: string
}

const openIndex = ref<number | null>(0)

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}

const openDocument = (url: string) => {
  window.open(url, '_blank')
}

const rules: Rule[] = [
  {
    title: 'Уважение к игрокам',
    content:
      'Каждый участник обязан уважительно относиться к другим игрокам, персоналу и администрации клуба.',
  },
  {
    title: 'Честная игра',
    content: 'Любые попытки мошенничества, сговора или нарушения правил турнира запрещены.',
  },
  {
    title: 'Поведение в клубе',
    content: 'Запрещается агрессивное поведение, оскорбления и создание конфликтных ситуаций.',
  },
  {
    title: 'Ответственность участников',
    content:
      'Администрация клуба оставляет за собой право отказать в участии при нарушении внутренних правил.',
  },
]

const documents: DocumentItem[] = [
  {
    title: 'Полные правила PDF',
    url: '/docs/rules.pdf',
  },
  {
    title: 'Пользовательское соглашение',
    url: '/docs/agreement.pdf',
  },
  {
    title: 'Оферта',
    url: '/docs/oferta.pdf',
  },
]
</script>

<template>
  <BaseHeader>
    <template #default>
      <HeaderTitle title="Правила" />
    </template>
  </BaseHeader>

  <div class="p-6">
    <!-- RULES -->
    <div class="space-y-3">
      <button
        v-for="(rule, index) in rules"
        :key="index"
        class="group w-full overflow-hidden rounded-2xl border border-white/5 bg-(--secondary)/20 text-left transition-all duration-200 hover:border-red-500/20 hover:bg-(--secondary)/30"
        @click="toggle(index)"
      >
        <!-- HEADER -->
        <div class="flex items-center gap-4 p-4">
          <!-- NUMBER -->
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-sm font-black text-red-300 shadow-[0_0_12px_rgba(239,68,68,0.10)]"
          >
            {{ index + 1 }}
          </div>

          <!-- TITLE -->
          <div class="flex-1">
            <h3 class="text-sm font-semibold text-white transition-colors group-hover:text-red-100">
              {{ rule.title }}
            </h3>
          </div>

          <!-- ICON -->
          <ChevronDown
            :size="18"
            class="text-gray-500 transition-all duration-300"
            :class="{
              'rotate-180 text-red-300': openIndex === index,
            }"
          />
        </div>

        <!-- CONTENT -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-[300px]"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 max-h-[300px]"
          leave-to-class="opacity-0 max-h-0"
        >
          <div v-if="openIndex === index" class="border-t border-white/5 px-4 pb-4 pt-3">
            <p class="text-sm leading-relaxed text-gray-300">
              {{ rule.content }}
            </p>
          </div>
        </Transition>
      </button>
    </div>

    <!-- DOCUMENTS -->
    <div class="mt-6 space-y-3">
      <button
        v-for="doc in documents"
        :key="doc.url"
        class="group flex w-full items-center gap-3 rounded-2xl border border-white/5 bg-(--secondary)/20 p-4 transition-all duration-200 hover:border-red-500/20 hover:bg-(--secondary)/30 active:scale-[0.99]"
        @click="openDocument(doc.url)"
      >
        <!-- ICON -->
        <div
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-300 shadow-[0_0_14px_rgba(239,68,68,0.10)]"
        >
          <FileText :size="18" />
        </div>

        <!-- CONTENT -->
        <div class="flex-1 text-left">
          <p class="text-sm font-semibold text-white transition-colors group-hover:text-red-100">
            {{ doc.title }}
          </p>

          <p class="mt-0.5 text-xs text-gray-500">PDF документ</p>
        </div>
      </button>
    </div>

    <!-- CTA -->
    <BaseButton class="mt-6 w-full"> Связаться с администрацией </BaseButton>
  </div>
</template>
