<script setup lang="ts">
import { useZodValidation } from '~/composables/useZodValidation'
import { AtSign, LockKeyhole, User } from '@lucide/vue'
import { signUpSchema } from '~/validation/auth.validation'
import type { SignUpSchema } from '~/validation/auth.validation'
import { useAuthSession } from '~/composables/useAuthSession'
import type { AxiosError } from 'axios'
import type { ApiErrorResponse } from '~~/shared/types/http'

definePageMeta({
  layout: false,
  middleware: 'guest',
})

useHead({
  title: "Duck's | Регистрация",
})

const notify = useNotify()
const { signUp } = useAuthSession()
const { errors, validate } = useZodValidation<SignUpSchema>(signUpSchema)

const pending = ref(false)
const form = ref<SignUpSchema>({
  email: '',
  nickname: '',
  password: '',
  confirmPassword: '',
  agree: false,
  agreeDuck: false,
})

const registerHandler = async () => {
  if (!validate(form.value)) return
  pending.value = true

  try {
    await signUp({
      email: form.value.email,
      nickname: form.value.nickname,
      password: form.value.password,
    })

    notify.success('Аккаунт создан!')
    await navigateTo('/')
  } catch (e) {
    const axiosError = e as AxiosError<ApiErrorResponse>
    const errorMessage =
      axiosError.response?.data?.error?.message || 'Произошла ошибка при созданий аккаунта'
    notify.error(errorMessage)
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-(--bg) text-white flex flex-col items-center justify-start p-6 font-sans overflow-x-hidden"
  >
    <AuthBrandLogo class="mt-8" />

    <form @submit.prevent="registerHandler" class="mt-10 w-full max-w-85 space-y-4">
      <h2 class="text-center uppercase text-lg font-black mb-6 tracking-wide">Регистрация</h2>

      <div class="space-y-3">
        <AuthField
          v-model="form.nickname"
          type="text"
          placeholder="Ваш никнейм"
          :error="!!errors.nickname"
          :error-message="errors.nickname"
          :icon="User"
        />

        <AuthField
          v-model="form.email"
          type="text"
          placeholder="Email"
          :error="!!errors.email"
          :error-message="errors.email"
          :icon="AtSign"
        />

        <AuthField
          v-model="form.password"
          type="password"
          placeholder="Придумайте пароль"
          :error="!!errors.password"
          :error-message="errors.password"
          :icon="LockKeyhole"
        />

        <AuthField
          v-model="form.confirmPassword"
          type="password"
          placeholder="Повторите пароль"
          :error="!!errors.confirmPassword"
          :error-message="errors.confirmPassword"
          :icon="LockKeyhole"
        />
      </div>

      <CheckboxAgreement v-model="form.agree" :error="!!errors.agree" :error-message="errors.agree">
        Ставя галочку, я подтверждаю свое согласие с условиями
        <NuxtLink
          target="_blank"
          to="/docs/ПОЛИТИКА_ОБРАБОТКИ_ПЕРСОНАЛЬНЫХ_ДАННЫХ_клуба_Duck.docx"
          class="text-(--logo-bg) font-bold underline"
        >
          пользовательского соглашения
        </NuxtLink>
        и
        <NuxtLink
          target="_blank"
          to="/docs/Политика_Утки.pdf"
          class="text-(--logo-bg) font-bold underline"
        >
          публичной оферты.
        </NuxtLink>
      </CheckboxAgreement>

      <CheckboxAgreement
        v-model="form.agreeDuck"
        :error="!!errors.agreeDuck"
        :error-message="errors.agreeDuck"
      >
        Ставя галочку, я даю свое согласие на
        <NuxtLink
          target="_blank"
          to="/docs/СОГЛАСИЕ_НА_ОБРАБОТКУ_ПЕРСОНАЛЬНЫХ_ДАННЫХ.docx"
          class="text-(--logo-bg) font-bold underline"
        >
          обработку моих персональных данных.
        </NuxtLink>
      </CheckboxAgreement>

      <BaseButton type="submit" :disabled="pending" :loading="pending">
        ЗАРЕГИСТРИРОВАТЬСЯ
      </BaseButton>

      <div class="text-center pt-4">
        <p class="text-center text-sm text-gray-500 mt-8">
          Уже в клубе?
          <NuxtLink to="/signin" class="text-(--logo-bg) font-semibold">Войти</NuxtLink>
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped>
div {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
