<script setup lang="ts">
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import { useAuthSession } from '~/features/auth/composables/useAuthSession'

definePageMeta({
  middleware: 'auth',
  layout: 'default',
})

useHead({
  title: "Duck's | Профиль",
})

const router = useRouter()
const auth = useAuthSession()

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

const signOut = () => {
  auth.signOut()
  navigateTo('/signin')
}
</script>

<template>
  <BaseHeader>
    <template #default>
      <HeaderTitle title="Профиль" />
    </template>
  </BaseHeader>

  <div class="p-6 space-y-8">
    <ProfileCard
      :nickname="auth.profile.value?.nickname!"
      :photo-url="auth.profile.value?.avatarUrl"
    />
    <ProfileRating :ratings="auth.profile.value?.ratings ?? []" />

    <div class="space-y-3">
      <p class="px-1 text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">Навигация</p>

      <div class="space-y-2">
        <ProfileNavigationButton
          v-if="auth.profile.value?.role && auth.profile.value.role === 'admin'"
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

      <BaseButton type="button" @click="signOut"> Выйти </BaseButton>
    </div>
  </div>
</template>
