<script setup lang="ts">
import { registerSchema, type RegisterSchema } from '~/validation/register'
import { useZodValidation } from '~/composables/useZodValidation'
import { AtSign, LockKeyhole, User } from '@lucide/vue'

definePageMeta({
  layout: false,
  middleware: 'guest',
})

const form = ref<RegisterSchema>({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agree: false,
})

const isLoading = ref(false)

const notify = useNotify()
const { errors, validate } = useZodValidation<RegisterSchema>(registerSchema)
const { register } = useAuthStore()

const registerHandler = async () => {
  if (!validate(form.value)) return
  isLoading.value = true

  try {
    await notify.promise(
      register({
        email: form.value.email,
        username: form.value.username,
        password: form.value.password,
      }),
      {
        loading: 'Создаем аккаунт...',
        success: 'Аккаунт создан!',
        error: 'Произошла ошибка при созданий аккаунта',
      },
    )

    await navigateTo('/login')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-(--bg) text-white flex flex-col items-center justify-start p-6 font-sans overflow-x-hidden"
  >
    <AuthLogo class="mt-8" />

    <form @submit.prevent="registerHandler" class="w-full max-w-85 space-y-4">
      <h2 class="text-center uppercase text-lg font-black mb-6 tracking-wide">Регистрация</h2>

      <div class="space-y-3">
        <AuthInput
          v-model="form.username"
          type="text"
          placeholder="Ваш никнейм"
          :error="!!errors.username"
          :error-message="errors.username"
        >
          <template #icon>
            <User class="w-5 h-5" />
          </template>
        </AuthInput>

        <AuthInput
          v-model="form.email"
          type="text"
          placeholder="Email"
          :error="!!errors.email"
          :error-message="errors.email"
        >
          <template #icon>
            <AtSign class="w-5 h-5" />
          </template>
        </AuthInput>

        <AuthInput
          v-model="form.password"
          type="password"
          placeholder="Придумайте пароль"
          :error="!!errors.password"
          :error-message="errors.password"
        >
          <template #icon>
            <LockKeyhole class="w-5 h-5" />
          </template>
        </AuthInput>

        <AuthInput
          v-model="form.confirmPassword"
          type="password"
          placeholder="Повторите пароль"
          :error="!!errors.confirmPassword"
          :error-message="errors.confirmPassword"
        >
          <template #icon>
            <LockKeyhole class="w-5 h-5" />
          </template>
        </AuthInput>
      </div>

      <CheckboxAgreement v-model="form.agree">
        Ставя галочку, я подтверждаю свое согласие с условиями
        <NuxtLink to="/docs/agreement.pdf" class="text-(--logo-bg) font-bold underline">
          пользовательского соглашения
        </NuxtLink>
        и
        <NuxtLink to="/docs/oferta.pdf" class="text-(--logo-bg) font-bold underline">
          публичной оферты.
        </NuxtLink>
      </CheckboxAgreement>

      <BaseButton type="submit" :disabled="isLoading" :loading="isLoading">
        ЗАРЕГИСТРИРОВАТЬСЯ
      </BaseButton>

      <div class="text-center pt-4">
        <p class="text-center text-sm text-gray-500 mt-8">
          Уже в клубе?
          <NuxtLink to="/login" class="text-(--logo-bg) font-semibold">Войти</NuxtLink>
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
