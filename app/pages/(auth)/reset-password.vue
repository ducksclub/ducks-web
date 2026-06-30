<script setup lang="ts">
import { ArrowLeft, CircleAlert, LockKeyhole } from '@lucide/vue'
import { resetPasswordSchema, type ResetPasswordSchema } from '~/validation/auth'
import { useZodValidation } from '~/composables/useZodValidation'

definePageMeta({
  layout: false,
})

useHead({
  title: "Duck's | Новый пароль",
})

const route = useRoute()
const notify = useNotify()
const auth = useAuthProvider()
const { errors, validate } = useZodValidation<ResetPasswordSchema>(resetPasswordSchema)

const token = computed(() => {
  const queryToken = route.query.token
  return Array.isArray(queryToken) ? queryToken[0] || '' : queryToken || ''
})

const formData = ref<ResetPasswordSchema>({
  password: '',
  confirmPassword: '',
})

const isLoading = ref(false)
const isTokenMissing = computed(() => !token.value)

const submit = async () => {
  if (isTokenMissing.value) {
    notify.error('Ссылка для восстановления пароля недействительна')
    return
  }

  if (!validate(formData.value)) return

  try {
    isLoading.value = true

    const response = await auth.resetPassword({
      token: token.value,
      password: formData.value.password,
    })

    notify.success(response.message)
    await navigateTo('/signin')
  } catch (err) {
    const message =
      (err as any)?.response?.data?.error?.message ?? 'Не удалось изменить пароль'
    notify.error(message)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-(--bg) text-white flex flex-col items-center justify-center p-6 relative overflow-hidden"
  >
    <div class="relative z-10 w-full max-w-85">
      <AuthLogo />

      <template v-if="isTokenMissing">
        <div class="flex justify-center mb-5">
          <div
            class="w-15 h-15 rounded-2xl bg-[var(--warning)]/15 border border-[var(--warning)]/30 flex items-center justify-center text-[var(--warning)]"
          >
            <CircleAlert class="w-8 h-8" />
          </div>
        </div>

        <h2 class="text-center text-lg font-bold uppercase mb-3">Ссылка недействительна</h2>

        <p class="text-center text-sm leading-6 text-gray-400">
          Запросите новую ссылку для восстановления пароля.
        </p>

        <NuxtLink
          to="/forgot-password"
          class="w-full mt-5 py-4 rounded-xl font-bold uppercase text-xs tracking-widest transition active:scale-[0.97] flex items-center justify-center bg-[var(--logo-bg)] text-white"
        >
          Получить ссылку
        </NuxtLink>
      </template>

      <template v-else>
        <h2 class="text-center text-lg font-bold uppercase mb-3">Новый пароль</h2>

        <p class="text-center text-sm leading-6 text-gray-400 mb-6">
          Придумайте новый пароль для входа в аккаунт.
        </p>

        <form @submit.prevent="submit">
          <div class="space-y-3">
            <AuthInput
              v-model="formData.password"
              :disabled="isLoading"
              type="password"
              placeholder="Новый пароль"
              :error="!!errors.password"
              :error-message="errors.password"
              autocomplete="new-password"
            >
              <template #icon>
                <LockKeyhole class="w-5 h-5" />
              </template>
            </AuthInput>

            <AuthInput
              v-model="formData.confirmPassword"
              :disabled="isLoading"
              type="password"
              placeholder="Повторите пароль"
              :error="!!errors.confirmPassword"
              :error-message="errors.confirmPassword"
              autocomplete="new-password"
            >
              <template #icon>
                <LockKeyhole class="w-5 h-5" />
              </template>
            </AuthInput>
          </div>

          <BaseButton type="submit" :disabled="isLoading" :loading="isLoading">
            Сохранить пароль
          </BaseButton>
        </form>
      </template>

      <NuxtLink
        to="/signin"
        class="mt-5 flex items-center justify-center gap-2 text-sm text-gray-500 active:scale-95 transition"
      >
        <ArrowLeft class="w-4 h-4" />
        Вернуться ко входу
      </NuxtLink>
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
