<script setup lang="ts">
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'

definePageMeta({
  middleware: 'auth',
})

useHead({
  title: "Duck's | Профиль",
})

const auth = useAuthProvider()
const router = useRouter()

const menu = [
  { label: 'Идеи и предложения', path: '/profile/feedback' },
  { label: 'Мои записи', path: '/profile/events' },
  { label: 'О клубе', path: '/about' },
  { label: 'Настройки профиля', path: '/profile/settings' },
]

const go = (path: string) => {
  if (!path || path === '#') return
  router.push(path)
}
</script>

<template>
  <BaseHeader>
    <template #default>
      <HeaderTitle title="Профиль" />
    </template>
  </BaseHeader>

  <div class="p-6 space-y-8">
    <ProfileCard :username="auth.user.value?.username!" :photo-url="auth.user.value?.avatarUrl" />
    <ProfileRating :ratings="auth.user.value?.ratings ?? []" />

    <div class="space-y-3">
      <p class="px-1 text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">Навигация</p>

      <div class="space-y-2">
        <ProfileNavigationButton
          v-if="auth.user.value?.role && auth.user.value.role === 'admin'"
          :title="'Кабинет админа'"
          :subtitle="'Управление событиями'"
          variant="admin"
          @click="go('/admin/events')"
        />

        <ProfileNavigationButton
          v-for="btn in menu"
          :key="btn.label"
          :title="btn.label"
          variant="default"
          @click="go(btn.path)"
        />
      </div>

      <BaseButton type="button" @click="auth.signOut"> Выйти </BaseButton>
    </div>
  </div>
</template>
