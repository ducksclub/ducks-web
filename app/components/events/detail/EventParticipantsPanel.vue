<script setup lang="ts">
import { ChevronDown, Users } from '@lucide/vue'

const isOpen = defineModel<boolean>('open', { required: true })

defineProps<{
  count: number
  nicknames: string[]
  currentNickname?: string | null
  pending: boolean
  error?: string | null
}>()
</script>

<template>
  <section class="rounded-2xl border border-white/5 bg-(--secondary)/20">
    <button
      type="button"
      class="flex w-full items-center gap-3 p-4 text-left transition hover:bg-white/5"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <span
        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-300"
      >
        <Users class="size-4" />
      </span>

      <span class="min-w-0 flex-1">
        <span class="block text-[10px] font-medium uppercase tracking-widest text-gray-500">
          Уже зарегистрированы
        </span>
        <span class="mt-1 block text-sm font-bold text-white"> {{ count }} игроков </span>
      </span>

      <ChevronDown
        class="size-4 shrink-0 text-gray-500 transition-transform duration-200"
        :class="{ 'rotate-180 text-red-300': isOpen }"
      />
    </button>

    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-80 opacity-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="max-h-80 opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div v-if="isOpen" class="overflow-hidden border-t border-white/5">
        <div v-if="pending" class="space-y-2 p-4">
          <div class="h-4 rounded bg-white/5" />
          <div class="h-4 w-2/3 rounded bg-white/5" />
        </div>

        <div v-else-if="error" class="p-4 text-sm text-red-300">
          {{ error }}
        </div>

        <div v-else-if="nicknames.length" class="max-h-72 overflow-y-auto p-2">
          <div
            v-for="(nickname, index) in nicknames"
            :key="`${nickname}-${index}`"
            class="rounded-xl px-3 py-2 text-sm font-semibold"
            :class="currentNickname === nickname ? 'text-(--logo-bg)' : 'text-gray-200'"
          >
            <b>{{ index + 1 }} - </b>
            <span>{{ nickname }} {{ currentNickname === nickname ? '(Вы)' : '' }}</span>
          </div>
        </div>

        <div v-else class="p-4 text-sm text-gray-400">Пока никто не зарегистрирован</div>
      </div>
    </Transition>
  </section>
</template>
