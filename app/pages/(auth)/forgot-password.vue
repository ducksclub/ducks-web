<script setup lang="ts">
import { ArrowLeft, AtSign, MailCheck } from '@lucide/vue'
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from '~/validation/auth'
import { useZodValidation } from '~/composables/useZodValidation'

definePageMeta({
  layout: false,
})

useHead({
  title: "Duck's | Восстановление пароля",
})

const notify = useNotify()
const auth = useAuthProvider()
const { errors, validate } = useZodValidation<ForgotPasswordSchema>(forgotPasswordSchema)

const formData = ref<ForgotPasswordSchema>({
  email: '',
})

const isLoading = ref(false)
const isSent = ref(false)
const submittedEmail = ref('')

const submit = async () => {
  if (!validate(formData.value)) return

  try {
    isLoading.value = true

    const response = await auth.forgotPassword({
      email: formData.value.email,
    })

    submittedEmail.value = formData.value.email
    isSent.value = true
    notify.success(response.message)
  } catch (err) {
    const message =
      (err as any)?.response?.data?.error?.message ?? 'Не удалось отправить письмо'
    notify.error(message)
  } finally {
    isLoading.value = false
  }
}

const editEmail = () => {
  isSent.value = false
}
</script>

<template>
  <div
    class="min-h-screen bg-(--bg) text-white flex flex-col items-center justify-center p-6 relative overflow-hidden"
  >
    <div class="relative z-10 w-full max-w-85">
      <AuthLogo />

      <template v-if="isSent">
        <div class="flex justify-center mb-5">
          <div
            class="w-15 h-15 rounded-2xl bg-[var(--logo-bg)]/15 border border-[var(--logo-bg)]/30 flex items-center justify-center text-[var(--logo-bg)]"
          >
            <MailCheck class="w-8 h-8" />
          </div>
        </div>

        <h2 class="text-center text-lg font-bold uppercase mb-3">Проверьте почту</h2>

        <p class="text-center text-sm leading-6 text-gray-400">
          Мы отправили ссылку для смены пароля на
          <span class="text-white font-semibold break-all">{{ submittedEmail }}</span>
        </p>

        <BaseButton type="button" variant="secondary" :disabled="isLoading" @click="editEmail">
          Изменить email
        </BaseButton>

        <NuxtLink
          to="/signin"
          class="mt-5 flex items-center justify-center gap-2 text-sm text-gray-500 active:scale-95 transition"
        >
          <ArrowLeft class="w-4 h-4" />
          Вернуться ко входу
        </NuxtLink>
      </template>

      <template v-else>
        <h2 class="text-center text-lg font-bold uppercase mb-3">Восстановление пароля</h2>

        <p class="text-center text-sm leading-6 text-gray-400 mb-6">
          Введите email аккаунта, и мы отправим ссылку для смены пароля.
        </p>

        <form @submit.prevent="submit">
          <AuthInput
            v-model="formData.email"
            :disabled="isLoading"
            type="email"
            placeholder="Email"
            :error="!!errors.email"
            :error-message="errors.email"
            autocomplete="email"
          >
            <template #icon>
              <AtSign class="w-5 h-5" />
            </template>
          </AuthInput>

          <BaseButton type="submit" :disabled="isLoading" :loading="isLoading">
            Отправить ссылку
          </BaseButton>
        </form>

        <NuxtLink
          to="/signin"
          class="mt-5 flex items-center justify-center gap-2 text-sm text-gray-500 active:scale-95 transition"
        >
          <ArrowLeft class="w-4 h-4" />
          Вернуться ко входу
        </NuxtLink>
      </template>
    </div>
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
