<script setup lang="ts">
import { getApiErrorMessage } from '~/shared/api/api-error'
import { AtSign, Phone } from '@lucide/vue'

import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'

import BaseInput from '~/components/ui/BaseInput.vue'
import ImageUpload from '~/components/ui/ImageUpload.vue'
import { useAuthSession } from '~/features/auth/composables/useAuthSession'
import { useProfileEditor } from '~/features/profile/composables/useProfileEditor'
import { useUploadImage } from '~/features/upload/composables/useUploadImage'
import { profileSchema } from '~/validation/profile'

definePageMeta({
  layout: 'empty',
  middleware: 'auth',
})

const notify = useNotify()
const { uploadImage, isUploading } = useUploadImage()
const { validate, errors } = useZodValidation(profileSchema)

const auth = useAuthSession()
const profile = useProfileEditor()

const form = reactive({
  email: auth.profile.value?.email ?? '',
  nickname: auth.profile.value?.nickname ?? '',
  phone: auth.profile.value?.phone ?? '',
  avatar: auth.profile.value?.avatarUrl ?? '',
  file: null as File | null,
})

watch(
  () => auth.profile.value,
  (currentProfile) => {
    if (!currentProfile) return

    form.email = currentProfile.email
    form.nickname = currentProfile.nickname
    form.phone = currentProfile.phone ?? ''
    form.avatar = currentProfile.avatarUrl ?? ''
  },
  { immediate: true },
)

const saveProfile = async () => {
  if (!validate(form)) return

  if (profile.pending.value || isUploading.value) {
    return
  }

  let imageUrl = form.avatar
  let imageHash = ''

  try {
    if (form.file) {
      const uploaded = await uploadImage(form.file)

      imageUrl = uploaded.url
      imageHash = uploaded.hash
    }

    await profile.updateProfile({
      nickname: form.nickname,
      phone: form.phone || null,
      avatarUrl: imageUrl,
      ...(imageHash ? { avatarHash: imageHash } : {}),
    })

    form.file = null
    notify.success('Профиль сохранен')
  } catch (error) {
    notify.error(getApiErrorMessage(error, 'Не удалось сохранить профиль'))
  }
}
</script>

<template>
  <BaseHeader>
    <template #left>
      <HeaderBackButton />
    </template>

    <template #default>
      <HeaderTitle title="Редактирование профиля" />
    </template>
  </BaseHeader>

  <form @submit.prevent="saveProfile" class="space-y-6 p-4 pb-10">
    <ImageUpload
      v-model="form.avatar"
      :loading="isUploading"
      :crop-shape="'circle'"
      label="Аватар"
      @change="(file) => (form.file = file)"
    />

    <BaseInput
      v-model="form.email"
      label="Ваша почта"
      placeholder="email"
      :icon="AtSign"
      :disabled="true"
    />

    <BaseInput
      v-model="form.nickname"
      label="Ваш никнейм"
      placeholder="nickname"
      :icon="AtSign"
      :error="errors.nickname"
      hint="имя которое используете в игре"
    />

    <BaseInput
      v-model="form.phone"
      label="Телефон"
      type="tel"
      placeholder="+7 777 777 77 77"
      :icon="Phone"
      :error="errors.phone"
    />

    <BaseButton
      class="w-full"
      :loading="profile.pending.value || isUploading"
      :disabled="profile.pending.value || isUploading"
      type="submit"
    >
      Сохранить изменения
    </BaseButton>
  </form>
</template>
