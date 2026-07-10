<script setup lang="ts">
import { RefreshCw, Search, UserRound } from '@lucide/vue'
import { useUsersApi } from '~/api/users.api'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderMenu from '~/components/layout/header/HeaderMenu.vue'
import HeaderMenuItem from '~/components/layout/header/HeaderMenuItem.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import type { AdminUser, GetUsersResponse } from '~/types/user'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

useHead({
  title: "Duck's Admin | Пользователи",
})

const { getUsers } = useUsersApi()

const users = ref<AdminUser[]>([])
const isLoading = ref(true)
const errorMessage = ref('')
const search = ref('')

const normalizeUsersResponse = (response: GetUsersResponse) => {
  return Array.isArray(response) ? response : response.data
}

const filteredUsers = computed(() => {
  const query = search.value.trim().toLowerCase()

  if (!query) return users.value

  return users.value.filter((user) => {
    return [user.nickname, user.email, user.phone, user.telegramId, user.role]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(query))
  })
})

const registeredUsersCount = computed(() => users.value.length)

const telegramUsersCount = computed(() => users.value.filter((user) => user.telegramId).length)

const adminUsersCount = computed(() => users.value.filter((user) => user.role === 'admin').length)

const loadUsers = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await getUsers()
    users.value = normalizeUsersResponse(response)
  } catch (error: any) {
    errorMessage.value =
      error?.response?.data?.message || error?.data?.message || error?.error || 'Ошибка загрузки'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadUsers)
</script>

<template>
  <BaseHeader>
    <template #left>
      <HeaderBackButton />
    </template>

    <template #default>
      <HeaderTitle title="Пользователи" />
    </template>

    <template #right>
      <HeaderMenu>
        <HeaderMenuItem @click="loadUsers">Обновить</HeaderMenuItem>
      </HeaderMenu>
    </template>
  </BaseHeader>

  <main class="space-y-4 p-4 pb-24">
    <section class="grid grid-cols-3 gap-2">
      <div class="rounded-2xl border border-white/10 bg-(--secondary)/15 p-3">
        <p class="text-[10px] font-bold text-gray-500 uppercase">Всего</p>
        <p class="mt-1 text-2xl font-black text-white tabular-nums">{{ registeredUsersCount }}</p>
      </div>

      <div class="rounded-2xl border border-white/10 bg-(--secondary)/15 p-3">
        <p class="text-[10px] font-bold text-gray-500 uppercase">Telegram</p>
        <p class="mt-1 text-2xl font-black text-white tabular-nums">{{ telegramUsersCount }}</p>
      </div>

      <div class="rounded-2xl border border-white/10 bg-(--secondary)/15 p-3">
        <p class="text-[10px] font-bold text-gray-500 uppercase">Админы</p>
        <p class="mt-1 text-2xl font-black text-white tabular-nums">{{ adminUsersCount }}</p>
      </div>
    </section>

    <label
      class="flex items-center gap-3 rounded-2xl border border-white/10 bg-(--secondary)/15 px-4 py-3 text-sm text-white"
    >
      <Search :size="18" class="shrink-0 text-gray-500" />
      <input
        v-model="search"
        class="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-600"
        type="search"
        placeholder="Поиск по имени, email, телефону"
      />
    </label>

    <div v-if="isLoading" class="space-y-3">
      <div v-for="i in 6" :key="i" class="h-24 animate-pulse rounded-3xl bg-(--secondary)/20" />
    </div>

    <div
      v-else-if="errorMessage"
      class="rounded-3xl border border-(--warning)/20 bg-(--warning)/5 p-6 text-center"
    >
      <div
        class="mx-auto flex size-12 items-center justify-center rounded-2xl bg-(--warning)/10 text-(--warning)"
      >
        <RefreshCw :size="22" />
      </div>
      <p class="mt-4 text-sm font-semibold text-(--warning)">{{ errorMessage }}</p>
      <button
        class="mt-4 text-sm font-semibold text-white underline"
        type="button"
        @click="loadUsers"
      >
        Повторить
      </button>
    </div>

    <div
      v-else-if="!filteredUsers.length"
      class="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 px-6 py-20 text-center"
    >
      <div class="flex size-16 items-center justify-center rounded-2xl bg-(--secondary)/20">
        <UserRound :size="28" class="text-gray-500" />
      </div>
      <p class="mt-4 text-sm font-semibold text-white">
        {{ users.length ? 'Ничего не найдено' : 'Пока нет пользователей' }}
      </p>
      <p class="mt-1 text-xs text-gray-500">
        {{ users.length ? 'Попробуйте изменить поисковый запрос' : 'Регистрации появятся здесь' }}
      </p>
    </div>

    <section v-else class="space-y-3">
      <NuxtLink
        v-for="user in filteredUsers"
        :key="user.id"
        class="block rounded-3xl border border-white/5 bg-(--secondary)/20 p-4 transition hover:border-(--logo-bg)/25 hover:bg-white/5 active:scale-[0.99]"
        :to="`/users/${user.id}`"
      >
        <div class="flex items-start gap-4">
          <NuxtImg
            v-if="user.avatarUrl"
            class="size-12 shrink-0 rounded-2xl border border-white/10 bg-black object-cover"
            :src="renderPicture(user.avatarUrl)"
            :alt="user.nickname"
          />

          <div
            v-else
            class="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-sm font-black text-(--logo-bg)"
          >
            {{ getInitial(user.nickname) }}
          </div>

          <div class="min-w-0 flex-1">
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <p class="truncate text-sm font-black text-white">
                  {{ user.nickname || 'Без имени' }}
                </p>
                <p class="mt-1 truncate text-xs text-gray-500">
                  {{ user.email || user.phone || user.telegramId || 'Контакты не указаны' }}
                </p>
              </div>

              <span
                class="shrink-0 rounded-xl px-2 py-1 text-[10px] font-black uppercase"
                :class="
                  user.role === 'admin'
                    ? 'bg-(--logo-bg)/10 text-(--logo-bg)'
                    : 'bg-white/5 text-gray-400'
                "
              >
                {{ user.role || 'user' }}
              </span>
            </div>

            <div class="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div class="min-w-0 rounded-2xl bg-black/20 px-3 py-2">
                <p class="text-[10px] font-bold text-gray-600 uppercase">Дата регистрации</p>
                <p class="mt-1 truncate text-gray-300">
                  {{ user.createdAt ? formatDate(user.createdAt, { dateStyle: 'short' }) : '—' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </NuxtLink>
    </section>
  </main>
</template>
