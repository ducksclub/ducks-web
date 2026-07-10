<script setup lang="ts">
import Accordion from '../ui/Accordion.vue'

type Props = {
  steps: {
    key: string
    title: string
    body: string
  }[]
  openedKey: string | null
  isLoading?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  toggle: [key: string]
}>()
</script>

<template>
  <div>
    <div v-if="isLoading" class="space-y-3">
      <div v-for="i in 5" :key="i" class="h-20 animate-pulse rounded-2xl bg-(--secondary)/20" />
    </div>

    <div v-else-if="steps.length" class="space-y-3">
      <Accordion
        v-for="(step, index) in steps"
        :key="step.key"
        :index="index"
        :title="step.title"
        :description="step.body"
        :is-open="openedKey === step.key"
        wrap
        @toggle="emit('toggle', step.key)"
      />
    </div>

    <div
      v-else
      class="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-gray-400"
    >
      Пока нет данных по обучению
    </div>
  </div>
</template>
