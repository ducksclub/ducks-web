<script setup lang="ts">
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'

definePageMeta({
  middleware: 'auth',
})

useHead({
  title: "Duck's | Профиль",
})

const { user, logout, isAdmin } = useAuthStore()
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

onMounted(async () => {
  await useAuthStore().fetchMe()
})
</script>

<template>
  <BaseHeader>
    <template #default>
      <HeaderTitle title="Профиль" />
    </template>
  </BaseHeader>

  <div class="p-6 space-y-8">
    <ProfileCard :username="user?.username!" :photo-url="user?.avatarUrl" />
    <ProfileRating :ratings="user?.ratings ?? []" />

    <div class="space-y-3">
      <p class="px-1 text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">Навигация</p>

      <div class="space-y-2">
        <ProfileNavigationButton
          v-if="isAdmin"
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

      <BaseButton type="button" @click="logout"> Выйти </BaseButton>
    </div>
  </div>
</template>
