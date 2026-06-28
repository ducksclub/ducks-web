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

const menu: {
  label: string
  path: string
  variant?: 'default' | 'admin'
}[] = [
  { label: 'Мои турниры', path: '/profile/events' },
  { label: 'Настройки профиля', path: '/profile/settings' },
  { label: 'Ближайшие турниры', path: '/events', variant: 'admin' },
  { label: 'Идеи и предложения', path: '/profile/feedback' },
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
    <ProfileCard :nickname="auth.user.value?.nickname!" :photo-url="auth.user.value?.avatarUrl" />
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

        <template v-for="btn in menu" :key="btn.label">
          <ProfileNavigationButton
            :title="btn.label"
            :variant="btn.variant ?? 'default'"
            @click="go(btn.path)"
          />
        </template>
      </div>

      <BaseButton type="button" @click="auth.signOut"> Выйти </BaseButton>
    </div>
  </div>
</template>
