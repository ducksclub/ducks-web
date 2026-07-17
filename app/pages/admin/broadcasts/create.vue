<script setup lang="ts">
import { useBroadcastApi } from '~/api/broadcast.api'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import BaseTextarea from '~/components/ui/BaseTextarea.vue'

definePageMeta({ middleware: 'admin', layout: 'admin' })
useHead({ title: "DUCK'S | Новая рассылка" })

const { createBroadcast } = useBroadcastApi()
const message = ref('')
const isSaving = ref(false)
const errorMessage = ref('')
const isValid = computed(() => message.value.trim().length > 0 && message.value.length <= 4000)

async function submit() {
  if (!isValid.value || isSaving.value) return
  if (!window.confirm('Запустить рассылку через Telegram-бота?')) return

  isSaving.value = true
  errorMessage.value = ''

  try {
    const response = await createBroadcast({ message: message.value.trim() })
    await navigateTo(`/admin/broadcasts/${response.data.id}`)
  } catch (error: any) {
    errorMessage.value = error?.response?.data?.message || 'Не удалось создать рассылку'
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <BaseHeader>
    <template #left><HeaderBackButton /></template>
    <template #default><HeaderTitle title="Новая рассылка" /></template>
  </BaseHeader>

  <main class="space-y-6 p-4 pb-24">
    <BaseTextarea
      v-model="message"
      label="Текст сообщения"
      placeholder="Введите сообщение для пользователей Telegram"
    />
    <p class="-mt-4 text-right text-xs" :class="message.length > 4000 ? 'text-red-400' : 'text-gray-500'">
      {{ message.length }}/4000
    </p>

    <div v-if="errorMessage" class="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
      {{ errorMessage }}
    </div>

    <BaseButton class="w-full" :disabled="!isValid || isSaving" :loading="isSaving" @click="submit">
      Поставить рассылку в очередь
    </BaseButton>
  </main>
</template>
