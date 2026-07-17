<script setup lang="ts">
import { RefreshCw, Send, UserRound } from '@lucide/vue'
import { useBroadcastApi } from '~/api/broadcast.api'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import type { BroadcastDetail } from '~/types/broadcast'

definePageMeta({ middleware: 'admin', layout: 'admin' })
useHead({ title: "DUCK'S | Детали рассылки" })

const route = useRoute()
const { getBroadcast } = useBroadcastApi()
const broadcast = ref<BroadcastDetail | null>(null)
const isLoading = ref(true)
const errorMessage = ref('')

async function loadBroadcast() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await getBroadcast(String(route.params.id))
    broadcast.value = response.data
  } catch (error: any) {
    errorMessage.value = error?.response?.data?.message || 'Не удалось загрузить рассылку'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadBroadcast)
</script>

<template>
  <BaseHeader>
    <template #left><HeaderBackButton /></template>
    <template #default><HeaderTitle title="Детали рассылки" /></template>
    <template #right>
      <button class="text-(--logo-bg)" type="button" @click="loadBroadcast">
        <RefreshCw :size="20" />
      </button>
    </template>
  </BaseHeader>

  <main class="space-y-4 p-4 pb-24">
    <div v-if="isLoading" class="space-y-3">
      <div class="h-44 animate-pulse rounded-3xl bg-(--secondary)/20" />
      <div v-for="item in 4" :key="item" class="h-20 animate-pulse rounded-3xl bg-(--secondary)/20" />
    </div>

    <div v-else-if="errorMessage" class="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
      {{ errorMessage }}
    </div>

    <template v-else-if="broadcast">
      <section class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-4">
        <p class="whitespace-pre-wrap text-sm leading-relaxed">{{ broadcast.message }}</p>
        <p class="mt-3 text-[11px] text-gray-500">
          {{ formatDate(broadcast.createdAt, { dateStyle: 'medium', timeStyle: 'short' }) }}
        </p>
        <div class="mt-4 grid grid-cols-2 gap-2">
          <div class="rounded-2xl bg-emerald-500/10 p-3 text-emerald-400">
            <p class="text-xl font-black">{{ broadcast.delivery.sent }}</p>
            <p class="text-xs">Отправлено</p>
          </div>
          <div class="rounded-2xl bg-red-500/10 p-3 text-red-400">
            <p class="text-xl font-black">{{ broadcast.delivery.notSent }}</p>
            <p class="text-xs">Не отправлено</p>
          </div>
        </div>
      </section>

      <h2 class="px-1 text-sm font-black">Получатели ({{ broadcast.recipients.length }})</h2>

      <div v-if="!broadcast.recipients.length" class="py-14 text-center text-sm text-gray-500">
        <Send class="mx-auto mb-3" :size="34" /> Получателей нет
      </div>

      <section v-else class="space-y-2">
        <div
          v-for="recipient in broadcast.recipients"
          :key="recipient.id"
          class="flex items-center gap-3 rounded-3xl border border-white/5 bg-(--secondary)/20 p-3"
        >
          <div class="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-gray-400">
            <UserRound :size="20" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-bold">{{ recipient.user?.nickname || `Telegram ${recipient.telegramUserId}` }}</p>
            <p class="truncate text-xs text-gray-500">{{ recipient.user?.email || recipient.telegramUserId }}</p>
            <p v-if="recipient.error" class="mt-1 line-clamp-1 text-[10px] text-red-400">{{ recipient.error }}</p>
          </div>
          <span
            class="shrink-0 rounded-xl px-2.5 py-1 text-[10px] font-bold"
            :class="recipient.deliveryStatus === 'sent'
              ? 'bg-emerald-500/10 text-emerald-400'
              : 'bg-red-500/10 text-red-400'"
          >
            {{ recipient.deliveryStatus === 'sent' ? 'Отправлено' : 'Не отправлено' }}
          </span>
        </div>
      </section>
    </template>
  </main>
</template>
