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
import type { Event, EventGameType } from '~/types/event'

definePageMeta({
  layout: 'empty',
  middleware: 'admin',
})

useHead({
  title: "Duck's | Создание события",
})

const router = useRouter()

const api = useEventsApi()
const { uploadImage, isUploading } = useUploadApi()

const isSaving = ref(false)
const errorMessage = ref('')

const templates = ref<Event[]>([])
const isTemplateLoading = ref<boolean>(false)
const form = reactive({
  title: '',
  city: '',
  gameRules: '',
  features: '',
  address: '',
  gameType: '',
  startsAt: '',
  participantLimit: 10,
  template: '',
  isTemplate: false,

  imageUrl: '',
  imageHash: '',
  file: null as File | null,
})

watch(
  () => form.template,
  (templateId) => {
    const template = templates.value.find((t) => t.id === templateId)

    if (!template) return

    form.title = template.title
    form.city = template.city
    form.gameRules = template.gameRules
    form.features = template.features
    form.address = template.address
    form.gameType = template.gameType
    form.participantLimit = template.participantLimit
    form.imageUrl = template.imageUrl
    form.imageHash = template.imageHash
  },
)

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
      title: form.title,
      city: form.city,
      features: form.features,
      gameRules: form.gameRules,
      address: form.address,
      gameType: form.gameType as EventGameType,
      startsAt: form.startsAt,
      participantLimit: form.participantLimit,
      isTemplate: form.isTemplate,
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

const fetchTemplates = async () => {
  try {
    isTemplateLoading.value = true
    const res = await api.getTemplates()
    templates.value = res.data
  } catch (e) {
    console.error('Failed to fetch templates', e)
  } finally {
    isTemplateLoading.value = false
  }
}

onMounted(() => {
  fetchTemplates()
})
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

    <BaseSelect
      v-if="!form.template"
      v-model="form.template"
      label="Шаблоны"
      placeholder="Выберите шаблон для создания события"
      :options="
        isTemplateLoading
          ? [{ label: 'Загрузка...', value: '' }]
          : templates.map((t) => ({ label: t.title, value: t.id }))
      "
    />

    <BaseInput
      v-model="form.title"
      type="text"
      label="Название"
      placeholder="Название мероприятия"
      :icon="Map"
    />

    <BaseSelect v-model="form.gameType" label="Категория" :options="categories" />

    <BaseInput v-model="form.city" type="text" label="Город" placeholder="Москва" :icon="Map" />

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
      v-model.number="form.participantLimit"
      type="text"
      inputmode="numeric"
      label="Лимит участников"
      placeholder="Количество мест"
      :icon="Users"
    />

    <BaseInput
      v-model="form.gameRules"
      type="text"
      label="Правила игры"
      placeholder="1 правило игры, 2 правило игры ..."
      :icon="Map"
    />

    <BaseInput
      v-model="form.features"
      type="text"
      label="Особенности"
      placeholder="1 особенность, 2 особенность ..."
      :icon="Map"
    />

    <CheckboxAgreement v-model="form.isTemplate">
      <template #default>
        <p class="text-sm text-gray-500">Сохранить как шаблон</p>
      </template>
    </CheckboxAgreement>

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
