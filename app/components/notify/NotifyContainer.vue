<script setup lang="ts">
import { CheckCircle2, Info, LoaderCircle, X, XCircle } from '@lucide/vue'
import { useNotify, type NotifyItem } from '~/composables/useNotify'

type NotifyType = NotifyItem['type']

type ToastVariant = {
  icon: typeof CheckCircle2
  cardClass: string
  iconClass: string
}

const { list, remove } = useNotify()

const variants: Record<NotifyType, ToastVariant> = {
  success: {
    icon: CheckCircle2,
    cardClass: 'border-emerald-400/25 bg-emerald-500/12 text-emerald-50',
    iconClass: 'bg-emerald-400/15 text-emerald-300',
  },
  error: {
    icon: XCircle,
    cardClass: 'border-orange-500/30 bg-orange-600/12 text-orange-50',
    iconClass: 'bg-orange-500/15 text-orange-300',
  },
  info: {
    icon: Info,
    cardClass: 'border-sky-300/20 bg-sky-400/10 text-slate-50',
    iconClass: 'bg-sky-300/12 text-sky-200',
  },
  loading: {
    icon: LoaderCircle,
    cardClass: 'border-white/12 bg-white/8 text-white',
    iconClass: 'bg-white/10 text-(--accent)',
  },
}

const getVariant = (type: NotifyType) => variants[type]
</script>

<template>
  <div
    class="pointer-events-none fixed inset-x-0 top-0 z-999 flex flex-col gap-2 px-3 pt-[calc(var(--safe-top)+0.75rem)]"
  >
    <TransitionGroup name="toast">
      <div
        v-for="n in list"
        :key="n.id"
        :class="[
          'toast-card pointer-events-auto relative overflow-hidden rounded-2xl border px-3.5 py-3 shadow-xl backdrop-blur-md transition active:scale-[0.99]',
          getVariant(n.type).cardClass,
        ]"
      >
        <div class="flex items-start gap-3">
          <div
            :class="[
              'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl',
              getVariant(n.type).iconClass,
            ]"
          >
            <component
              :is="getVariant(n.type).icon"
              class="size-4"
              :class="n.type === 'loading' ? 'animate-spin [animation-duration:1.1s]' : ''"
              aria-hidden="true"
            />
          </div>

          <p class="min-w-0 flex-1 pt-0.5 text-[13px] font-medium leading-5">
            {{ n.message }}
          </p>

          <button
            type="button"
            class="-mr-1 -mt-1 flex size-8 shrink-0 items-center justify-center rounded-xl text-white/45 transition active:scale-95"
            aria-label="Закрыть уведомление"
            @click="remove(n.id)"
          >
            <X class="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-card {
  background-color: rgb(10 12 18 / 0.88);
  box-shadow: 0 12px 32px rgb(0 0 0 / 0.32);
}

.toast-enter-from {
  opacity: 0;
  transform: translate3d(0, -10px, 0) scale(0.98);
}

.toast-enter-active {
  transition:
    opacity 180ms ease,
    transform 220ms ease;
}

.toast-leave-to {
  opacity: 0;
  transform: translate3d(0, -8px, 0) scale(0.98);
}

.toast-leave-active {
  position: absolute;
  left: 0.75rem;
  right: 0.75rem;
  transition:
    opacity 160ms ease,
    transform 180ms ease;
}

.toast-move {
  transition: transform 180ms ease;
}
</style>
