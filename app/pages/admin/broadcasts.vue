<script setup lang="ts">
import { useBroadcastApi } from '~/api/broadcast.api'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import BaseTextarea from '~/components/ui/BaseTextarea.vue'

definePageMeta({
  middleware: 'admin',
  layout: 'empty',
})

useHead({
  title: "DUCK'S | Рассылка",
})

const broadcast = useBroadcastApi()

const message = ref('')
const isSaving = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const maxLength = 4000

const charsCount = computed(() => message.value.length)

const isValid = computed(() => {
  return message.value.trim().length > 0 && message.value.length <= maxLength
})

const previewText = computed(() => {
  return message.value.trim() || 'Текст рассылки появится здесь...'
})

async function createBroadcast() {
  if (!isValid.value || isSaving.value || !import.meta.client) return

  const confirmed = window.confirm(
    'Запустить рассылку? Сообщение будет поставлено в очередь для отправки пользователям Telegram.',
  )

  if (!confirmed) return

  isSaving.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const response = await broadcast.createBroadcast({ message: message.value.trim() })

    successMessage.value = `Рассылка добавлена в очередь. Получателей: ${response.data.createdCount}. Пропущено: ${response.data.skippedCount}.`
    message.value = ''
  } catch (error) {
    errorMessage.value = getApiErrorMessage(error, 'Не удалось создать рассылку')
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <BaseHeader>
    <template #left>
      <HeaderBackButton />
    </template>

    <template #default>
      <HeaderTitle title="Рассылка" />
    </template>
  </BaseHeader>

  <div class="space-y-6 p-4 pb-10">
    <!-- <span class="text-xs" :class="charsCount > maxLength ? 'text-red-400' : 'text-gray-500'">
          {{ charsCount }}/{{ maxLength }}
        </span> -->

    <BaseTextarea
      label="Текст сообщения"
      v-model="message"
      placeholder="Например: 🔥 Сегодня в DUCK'S новый турнир! Записаться можно через бота."
    />

    <!-- SUCCESS -->
    <div
      v-if="successMessage"
      class="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400"
    >
      {{ successMessage }}
    </div>

    <!-- ERROR -->
    <div
      v-if="errorMessage"
      class="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
    >
      {{ errorMessage }}
    </div>

    <!-- ACTION -->
    <BaseButton
      class="w-full"
      :disabled="!isValid || isSaving"
      :loading="isSaving"
      @click="createBroadcast"
    >
      Поставить рассылку в очередь
    </BaseButton>
  </div>
</template>
