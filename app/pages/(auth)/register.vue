<template>
  <div
    class="min-h-screen bg-[#0F0F0F] text-white flex flex-col items-center justify-start p-6 font-sans overflow-x-hidden"
  >
    <BackButton to="/login" label="Назад" />

    <AuthLogo class="mt-8" />

    <!-- Форма регистрации -->
    <div class="w-full max-w-85 space-y-4">
      <h2 class="text-center uppercase text-lg font-black mb-6 tracking-wide">Регистрация</h2>

      <div class="space-y-3">
        <!-- Никнейм -->
        <AuthInput v-model="form.nickname" type="text" placeholder="Ваш никнейм">
          <template #icon>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </template>
        </AuthInput>

        <!-- Email -->
        <AuthInput v-model="form.email" type="text" placeholder="Email">
          <template #icon>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </template>
        </AuthInput>

        <!-- Пароль -->
        <AuthInput v-model="form.password" type="password" placeholder="Придумайте пароль">
          <template #icon>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </template>
        </AuthInput>

        <!-- Подтверждение пароля -->
        <AuthInput v-model="form.confirmPassword" type="password" placeholder="Повторите пароль">
          <template #icon>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </template>
        </AuthInput>
      </div>

      <!-- Соглашение -->
      <CheckboxAgreement v-model="form.agree">
        Я принимаю условия
        <span class="text-(--logo-bg) font-bold underline"> Пользовательского соглашения </span>
        и даю согласие на обработку данных.
      </CheckboxAgreement>

      <!-- Кнопка регистрации -->
      <BaseButton> ЗАРЕГИСТРИРОВАТЬСЯ </BaseButton>

      <div class="text-center pt-4">
        <p class="text-center text-sm text-gray-500 mt-8">
          Уже в клубе?
          <NuxtLink to="/login" class="text-(--logo-bg) font-semibold">Войти</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: false }) // Без навигации
// Данные формы хранятся прямо на странице
const form = ref({
  nickname: '',
  email: '',
  password: '',
  confirmPassword: '',
  agree: false,
})

const handleRegister = () => {
  // Базовая проверка (для UX)
  if (form.value.password !== form.value.confirmPassword) {
    alert('Пароли не совпадают!')
    return
  }

  console.log('Регистрация нового утки:', form.value)
  // Имитация успеха и переход в приложение
  navigateTo('/events')
}
</script>

<style scoped>
/* Плавное появление контента */
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
