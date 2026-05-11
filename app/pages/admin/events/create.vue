<script setup lang="ts">
import { Calendar, Map, Users } from '@lucide/vue'
import { useEventsApi } from '~/api/events.api'
import { useUploadApi } from '~/api/upload.api'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import BaseInput from '~/components/ui/BaseInput.vue'
import BaseSelect from '~/components/ui/BaseSelect.vue'
import ImageUpload from '~/components/ui/ImageUpload.vue'

import { categories } from '~/constants/categories'

definePageMeta({
  layout: 'empty',
  middleware: 'admin',
})

const router = useRouter()

const api = useEventsApi()
const { uploadImage, isUploading } = useUploadApi()

const isSaving = ref(false)
const errorMessage = ref('')

const form = reactive({
  title: '',
  description: '',
  address: '',
  gameType: '',
  startsAt: '',
  participantLimit: 10,

  imageUrl: '',
  imageHash: '',
  file: null as File | null,
})

/**
 * Create event
 */
const createEvent = async () => {
  if (isSaving.value || isUploading.value) return

  errorMessage.value = ''

  try {
    isSaving.value = true

    let imageUrl = ''
    let imageHash = ''

    /**
     * Upload image
     */
    if (form.file) {
      const uploaded = await uploadImage(form.file)

      imageUrl = uploaded.url
      imageHash = uploaded.hash
    }

    await api.createEvent({
      address: form.address,
      gameType: form.gameType,
      startsAt: form.startsAt,
      participantLimit: form.participantLimit,
      imageUrl,
      imageHash,
    })

    router.push('/admin/events')
  } catch (e: any) {
    console.error(e)

    errorMessage.value = e?.error || 'Не удалось создать событие'
  } finally {
    isSaving.value = false
  }
}

/**
 * File preview
 */
const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  form.file = file
  form.imageUrl = URL.createObjectURL(file)
}
</script>

<template>
  <BaseHeader>
    <template #left>
      <HeaderBackButton />
    </template>

    <template #default>
      <HeaderTitle title="Создание события" />
    </template>
  </BaseHeader>

  <div class="space-y-6 p-4 pb-10">
    <ImageUpload
      v-model="form.imageUrl"
      :loading="isUploading"
      @change="(file) => (form.file = file)"
    />

    <BaseSelect v-model="form.gameType" label="Категория" :options="categories" />

    <BaseInput
      v-model="form.address"
      type="text"
      label="Адрес"
      placeholder="Адрес мероприятия"
      :icon="Map"
    />

    <BaseInput
      v-model="form.startsAt"
      type="datetime-local"
      label="Дата и время"
      :icon="Calendar"
    />

    <BaseInput
      v-model="form.participantLimit"
      type="text"
      inputmode="numeric"
      label="Лимит участников"
      placeholder="Количество мест"
      :icon="Users"
    />

    <div
      v-if="errorMessage"
      class="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
    >
      {{ errorMessage }}
    </div>

    <BaseButton
      class="w-full"
      :disabled="isSaving || isUploading"
      :loading="isSaving || isUploading"
      @click="createEvent"
    >
      Создать событие
    </BaseButton>
  </div>
</template>
