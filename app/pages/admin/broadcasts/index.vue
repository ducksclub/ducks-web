<script setup lang="ts">
import { ChevronRight, Plus, RefreshCw, Send } from '@lucide/vue'
import { useBroadcastApi } from '~/api/broadcast.api'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import type { BroadcastListItem } from '~/types/broadcast'

definePageMeta({ middleware: 'admin', layout: 'admin' })
useHead({ title: "DUCK'S | История рассылок" })

const { getBroadcasts } = useBroadcastApi()
const broadcasts = ref<BroadcastListItem[]>([])
const isLoading = ref(true)
const errorMessage = ref('')

async function loadBroadcasts() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await getBroadcasts()
    broadcasts.value = response.data
  } catch (error: any) {
    errorMessage.value = error?.response?.data?.message || 'Не удалось загрузить рассылки'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadBroadcasts)
</script>

<template>
  <BaseHeader>
    <template #left><HeaderBackButton /></template>
    <template #default><HeaderTitle title="Рассылки" /></template>
    <template #right>
      <button class="text-(--logo-bg)" type="button" @click="loadBroadcasts">
        <RefreshCw :size="20" />
      </button>
    </template>
  </BaseHeader>

  <main class="space-y-4 p-4 pb-24">
    <NuxtLink
      to="/admin/broadcasts/create"
      class="flex w-full items-center justify-center gap-2 rounded-2xl bg-(--logo-bg) px-4 py-3 text-sm font-black text-black"
    >
      <Plus :size="18" /> Новая рассылка
    </NuxtLink>

    <div v-if="isLoading" class="space-y-3">
      <div v-for="item in 4" :key="item" class="h-36 animate-pulse rounded-3xl bg-(--secondary)/20" />
    </div>

    <div v-else-if="errorMessage" class="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
      {{ errorMessage }}
    </div>

    <div v-else-if="!broadcasts.length" class="py-20 text-center">
      <Send class="mx-auto text-gray-600" :size="40" />
      <p class="mt-4 text-sm font-bold">Рассылок пока нет</p>
      <p class="mt-1 text-xs text-gray-500">Создайте первую рассылку через Telegram-бота</p>
    </div>

    <section v-else class="space-y-3">
      <NuxtLink
        v-for="broadcast in broadcasts"
        :key="broadcast.id"
        :to="`/admin/broadcasts/${broadcast.id}`"
        class="block rounded-3xl border border-white/5 bg-(--secondary)/20 p-4 active:scale-[0.99]"
      >
        <div class="flex items-start gap-3">
          <div class="min-w-0 flex-1">
            <p class="line-clamp-2 text-sm font-semibold leading-relaxed">{{ broadcast.message }}</p>
            <p class="mt-2 text-[11px] text-gray-500">
              {{ formatDate(broadcast.createdAt, { dateStyle: 'medium', timeStyle: 'short' }) }}
            </p>
          </div>
          <ChevronRight class="shrink-0 text-gray-500" :size="18" />
        </div>

        <div class="mt-4 grid grid-cols-3 gap-2 text-center">
          <div class="rounded-2xl bg-white/5 p-2">
            <p class="text-base font-black">{{ broadcast.delivery.total }}</p>
            <p class="text-[10px] text-gray-500">Всего</p>
          </div>
          <div class="rounded-2xl bg-emerald-500/10 p-2 text-emerald-400">
            <p class="text-base font-black">{{ broadcast.delivery.sent }}</p>
            <p class="text-[10px]">Отправлено</p>
          </div>
          <div class="rounded-2xl bg-red-500/10 p-2 text-red-400">
            <p class="text-base font-black">{{ broadcast.delivery.notSent }}</p>
            <p class="text-[10px]">Не отправлено</p>
          </div>
        </div>
      </NuxtLink>
    </section>
  </main>
</template>
