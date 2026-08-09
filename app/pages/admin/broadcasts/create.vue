<script setup lang="ts">
import { useBroadcastApi } from '~/api/broadcast.api'
import { useUploadApi } from '~/api/upload.api'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import BaseInput from '~/components/ui/BaseInput.vue'
import BaseTextarea from '~/components/ui/BaseTextarea.vue'
import ImageUpload from '~/components/ui/ImageUpload.vue'

definePageMeta({ middleware: 'admin', layout: 'admin' })
useHead({ title: "DUCK'S | Новая рассылка" })

const { createBroadcast } = useBroadcastApi()
const { uploadImage, isUploading } = useUploadApi()
const form = reactive({
  message: '',
  imageUrl: '',
  file: null as File | null,
  buttonText: '',
  buttonUrl: '',
})
const isSaving = ref(false)
const errorMessage = ref('')
const hasButtonText = computed(() => form.buttonText.trim().length > 0)
const hasButtonUrl = computed(() => form.buttonUrl.trim().length > 0)
const buttonFieldsMatch = computed(() => hasButtonText.value === hasButtonUrl.value)
const isButtonUrlValid = computed(() => {
  if (!hasButtonUrl.value) return true

  try {
    return ['http:', 'https:'].includes(new URL(form.buttonUrl.trim()).protocol)
  } catch {
    return false
  }
})
const buttonError = computed(() => {
  if (!buttonFieldsMatch.value) return 'Название и ссылка кнопки должны быть заполнены вместе'
  if (!isButtonUrlValid.value) return 'Ссылка должна начинаться с http:// или https://'
  return ''
})
const isValid = computed(
  () =>
    form.message.trim().length > 0 &&
    form.message.length <= 4000 &&
    form.buttonText.trim().length <= 64 &&
    buttonFieldsMatch.value &&
    isButtonUrlValid.value,
)

async function submit() {
  if (!isValid.value || isSaving.value || isUploading.value) return
  if (!window.confirm('Запустить рассылку через Telegram-бота?')) return

  isSaving.value = true
  errorMessage.value = ''

  try {
    let imageUrl = ''

    if (form.file) {
      const uploaded = await uploadImage(form.file)
      imageUrl = uploaded.url
    }

    const response = await createBroadcast({
      message: form.message.trim(),
      ...(imageUrl && { imageUrl }),
      ...(hasButtonText.value && { buttonText: form.buttonText.trim() }),
      ...(hasButtonUrl.value && { buttonUrl: form.buttonUrl.trim() }),
    })
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
    <ImageUpload
      v-model="form.imageUrl"
      label="Изображение (необязательно)"
      :loading="isUploading"
      @change="(file) => (form.file = file)"
    />

    <BaseTextarea
      v-model="form.message"
      label="Текст сообщения"
      placeholder="Введите сообщение для пользователей Telegram"
    />
    <p class="-mt-4 text-right text-xs" :class="form.message.length > 4000 ? 'text-red-400' : 'text-gray-500'">
      {{ form.message.length }}/4000
    </p>

    <div class="space-y-4 rounded-3xl border border-white/5 bg-(--secondary)/10 p-4">
      <p class="text-sm font-bold">Кнопка (необязательно)</p>
      <BaseInput
        v-model="form.buttonText"
        label="Название кнопки"
        placeholder="Подробнее"
        :error="form.buttonText.length > 64 ? 'Не более 64 символов' : ''"
      />
      <BaseInput
        v-model="form.buttonUrl"
        type="url"
        label="Ссылка на кнопку"
        placeholder="https://example.com"
        :error="buttonError"
      />
    </div>

    <div v-if="errorMessage" class="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
      {{ errorMessage }}
    </div>

    <BaseButton
      class="w-full"
      :disabled="!isValid || isSaving || isUploading"
      :loading="isSaving || isUploading"
      @click="submit"
    >
      Поставить рассылку в очередь
    </BaseButton>
  </main>
</template>
