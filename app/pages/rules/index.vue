<script setup lang="ts">
import FileButton from '~/components/info/FileButton.vue'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import Accordion from '~/components/ui/Accordion.vue'

useHead({
  title: "Duck's | Правила",
})

type Rule = {
  title: string
  content: string
}

type DocumentItem = {
  title: string
  url: string
  subtitle: string
}

const openIndex = ref<number | null>(0)

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
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
    url: '/rules/full',
    subtitle: 'PDF документ',
  },
  {
    title: 'Пользовательское соглашение',
    url: '/docs/ПОЛИТИКА_ОБРАБОТКИ_ПЕРСОНАЛЬНЫХ_ДАННЫХ_клуба_Duck.docx',
    subtitle: 'PDF документ',
  },
  {
    title: 'Оферта',
    url: '/docs/Политика_Утки.pdf',
    subtitle: 'PDF документ',
  },
]

const go = (url: string) => {
  window.open(url, '_blank')
}
</script>

<template>
  <BaseHeader>
    <template #default>
      <HeaderTitle title="Правила" />
    </template>
  </BaseHeader>

  <div class="p-6">
    <div class="space-y-3">
      <Accordion
        v-for="(rule, index) in rules"
        :key="index"
        :index="index"
        :is-open="openIndex === index"
        :title="rule.title"
        :description="rule.content"
        @toggle="toggle(index)"
      />
    </div>

    <div class="mt-6 space-y-3">
      <FileButton
        v-for="doc in documents"
        :title="doc.title"
        :url="doc.url"
        :subtitle="doc.subtitle"
      />
    </div>

    <!-- CTA -->
    <BaseButton @click="go('https://t.me/adm_ducks')" class="mt-6 w-full"> Написать </BaseButton>
  </div>
</template>
