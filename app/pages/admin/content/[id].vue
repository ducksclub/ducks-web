<script setup lang="ts">
import { FileText } from '@lucide/vue'
import { uuid } from 'zod'

import { useContentApi } from '~/api/content.api'

import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'

import BaseInput from '~/components/ui/BaseInput.vue'
import BaseSelect from '~/components/ui/BaseSelect.vue'

import { ContentType } from '~/types/api/content.types'

definePageMeta({
  layout: 'empty',
  middleware: 'admin',
})

const route = useRoute()
const router = useRouter()
const notify = useNotify()

const { getContentById, updateContent } = useContentApi()

const contentId = route.params.id as string | undefined

const isLoading = ref(true)
const isSaving = ref(false)
const isCreateMode = ref(false)
const errorMessage = ref('')

const contentTypeOptions = [
  { label: 'FAQ', value: ContentType.FAQ },
  { label: 'Правила', value: ContentType.RULES },
  { label: 'О клубе', value: ContentType.ABOUT },
  { label: 'Уровни покера', value: ContentType.POKER_LEVELS },
]

const form = ref({
  id: '',
  key: ContentType.FAQ as ContentType,
  title: '',
  body: '',
})

const currentTypeLabel = computed(() => {
  return contentTypeOptions.find((i) => i.value === form.value.key)?.label || 'Контент'
})

const loadContent = async () => {
  isLoading.value = true

  try {
    if (!contentId) {
      isCreateMode.value = true
      return
    }

    const content = await getContentById({
      id: contentId,
    })

    if (!content) {
      isCreateMode.value = true
      return
    }

    form.value = {
      id: content.id ?? '',
      key: content.key ?? ContentType.FAQ,
      title: content.title ?? '',
      body: content.body ?? '',
    }
  } catch (e: any) {
    console.error(e)

    isCreateMode.value = true
  } finally {
    isLoading.value = false
  }
}

onMounted(loadContent)

const saveContent = async () => {
  if (isSaving.value) return

  errorMessage.value = ''

  try {
    isSaving.value = true

    await updateContent(
      {
        id: isCreateMode.value ? 'create' : form.value.id,
      },
      {
        key: form.value.key,
        title: form.value.title,
        body: form.value.body,
      },
    )

    notify.success(isCreateMode.value ? 'Контент создан' : 'Контент обновлён')

    router.push('/admin/content')
  } catch (e: any) {
    console.error(e)

    errorMessage.value = e?.error || 'Не удалось сохранить контент'
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
      <HeaderTitle :title="isCreateMode ? 'Создание контента' : 'Редактирование контента'" />
    </template>
  </BaseHeader>

  <div v-if="isLoading" class="flex items-center justify-center py-20 text-gray-500">
    Загрузка контента...
  </div>

  <div v-else class="space-y-6 p-4 pb-10">
    <!-- MODE -->
    <div class="text-xs text-gray-400">
      {{ isCreateMode ? 'Режим: создание' : 'Режим: редактирование' }}
    </div>

    <!-- TYPE -->
    <BaseSelect
      v-model="form.key"
      label="Тип контента"
      :options="contentTypeOptions"
      :disabled="!isCreateMode"
    />

    <!-- TITLE -->
    <BaseInput
      v-model="form.title"
      type="text"
      label="Заголовок"
      placeholder="Введите заголовок"
      :icon="FileText"
    />

    <!-- BODY -->
    <div>
      <label class="mb-2 block text-sm font-medium text-white"> Контент </label>

      <textarea
        v-model="form.body"
        rows="10"
        placeholder="Введите содержимое..."
        class="min-h-55 w-full rounded-2xl border border-white/10 bg-(--secondary)/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-red-500/30"
      />
    </div>

    <!-- ERROR -->
    <div
      v-if="errorMessage"
      class="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
    >
      {{ errorMessage }}
    </div>

    <!-- ACTION -->
    <BaseButton class="w-full" :disabled="isSaving" :loading="isSaving" @click="saveContent">
      {{ isCreateMode ? 'Создать' : 'Сохранить изменения' }}
    </BaseButton>
  </div>
</template>
