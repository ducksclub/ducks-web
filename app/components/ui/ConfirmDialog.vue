<script setup lang="ts">
import { AlertTriangle, X } from '@lucide/vue'

const props = withDefaults(
  defineProps<{
    open: boolean
    title: string
    description: string
    confirmLabel?: string
    cancelLabel?: string
    danger?: boolean
    loading?: boolean
  }>(),
  {
    confirmLabel: 'Подтвердить',
    cancelLabel: 'Отмена',
    danger: false,
    loading: false,
  },
)

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'close'): void
}>()

const close = () => {
  if (!props.loading) emit('close')
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.open) close()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="confirm-dialog">
      <div v-if="open" class="fixed inset-0 z-100 flex items-end justify-center p-4 sm:items-center">
        <button
          type="button"
          class="absolute inset-0 bg-black/75 backdrop-blur-sm"
          aria-label="Закрыть окно подтверждения"
          @click="close"
        />

        <section
          role="alertdialog"
          aria-modal="true"
          :aria-labelledby="`confirm-title-${title}`"
          class="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-[#14151c] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
        >
          <div
            class="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full blur-3xl"
            :class="danger ? 'bg-red-500/15' : 'bg-(--logo-bg)/10'"
          />

          <div class="relative flex items-start gap-4">
            <div
              class="flex size-11 shrink-0 items-center justify-center rounded-2xl border"
              :class="
                danger
                  ? 'border-red-500/20 bg-red-500/10 text-red-400'
                  : 'border-(--logo-bg)/20 bg-(--logo-bg)/10 text-(--logo-bg)'
              "
            >
              <AlertTriangle class="size-5" />
            </div>

            <div class="min-w-0 flex-1">
              <h2 :id="`confirm-title-${title}`" class="text-lg font-black text-white">
                {{ title }}
              </h2>
              <p class="mt-2 text-sm leading-6 text-gray-400">{{ description }}</p>
            </div>

            <button
              type="button"
              class="flex size-8 shrink-0 items-center justify-center rounded-xl text-gray-500 transition hover:bg-white/5 hover:text-white disabled:opacity-40"
              :disabled="loading"
              aria-label="Закрыть"
              @click="close"
            >
              <X class="size-4" />
            </button>
          </div>

          <div class="relative mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-gray-200 transition hover:bg-white/10 active:scale-[0.98] disabled:opacity-50"
              :disabled="loading"
              @click="close"
            >
              {{ cancelLabel }}
            </button>

            <button
              type="button"
              class="rounded-2xl px-4 py-3 text-sm font-bold text-white transition active:scale-[0.98] disabled:cursor-wait disabled:opacity-60"
              :class="danger ? 'bg-red-600 hover:bg-red-500' : 'bg-(--logo-bg) hover:brightness-110'"
              :disabled="loading"
              @click="emit('confirm')"
            >
              {{ loading ? 'Подождите...' : confirmLabel }}
            </button>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.confirm-dialog-enter-active,
.confirm-dialog-leave-active {
  transition: opacity 0.18s ease;
}

.confirm-dialog-enter-from,
.confirm-dialog-leave-to {
  opacity: 0;
}
</style>
