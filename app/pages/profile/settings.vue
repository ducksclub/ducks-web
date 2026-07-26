<script setup lang="ts">
import { AtSign, Phone } from '@lucide/vue'
import { useUploadApi } from '~/api/upload.api'

import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'

import BaseInput from '~/components/ui/BaseInput.vue'
import ImageUpload from '~/components/ui/ImageUpload.vue'
import { profileSchema } from '~/validation/profile'

definePageMeta({
  layout: 'empty',
  middleware: 'auth',
})

const notify = useNotify()
const { uploadImage, isUploading } = useUploadApi()
const { validate, errors } = useZodValidation(profileSchema)

const isSaving = ref(false)
const auth = useAuthProvider()

const form = reactive({
  email: auth.user.value?.email ?? '',
  nickname: auth.user.value?.nickname ?? '',
  phone: auth.user.value?.phone ?? '',
  avatar: auth.user.value?.avatarUrl ?? '',
  file: null as File | null,
})

const saveProfile = async () => {
  if (!validate(form)) return

  if (isSaving.value || isUploading.value) {
    return
  }

  let imageUrl = form.avatar
  let imageHash = ''

  try {
    isSaving.value = true

    if (form.file) {
      const uploaded = await uploadImage(form.file)

      imageUrl = uploaded.url
      imageHash = uploaded.hash
    }

    await auth.updateProfile({
      ...(form.email.trim() && { email: form.email }),
      ...(form.nickname.trim() && { nickname: form.nickname }),
      ...(form.phone.trim() && { phone: form.phone }),
      ...(imageUrl.trim() && { avatarUrl: imageUrl }),
      ...(imageHash.trim() && { avatarHash: imageHash }),
    })
    notify.success('Профиль сохранен')
    await auth.restoreSession()
  } catch (e: any) {
    console.error(e)
    notify.error('Не удалось сохранить профиль')
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
      :error="errors.email"
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
      :loading="isSaving || isUploading"
      :disabled="isSaving || isUploading"
      type="submit"
    >
      Сохранить изменения
    </BaseButton>
  </form>
</template>
