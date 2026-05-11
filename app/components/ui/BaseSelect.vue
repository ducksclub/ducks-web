<script setup lang="ts">
import { ChevronDown } from '@lucide/vue'

type Item = {
  label: string
  value: string
}

const props = defineProps<{
  options: Item[]
  label?: string
  modelValue?: string
  placeholder?: string
  error?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const isOpen = ref(false)

const selected = computed(() => props.options.find((i) => i.value === props.modelValue))

const selectItem = (item: Item) => {
  emit('update:modelValue', item.value)
  isOpen.value = false
}
</script>

<template>
  <div>
    <label v-if="label" class="mb-2 block text-sm text-gray-400">
      {{ label }}
    </label>

    <div ref="root" class="relative w-full">
      <button
        class="flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm text-white transition-all duration-200 active:scale-[0.99]"
        :class="
          error
            ? 'border-red-500/40 bg-red-500/5 hover:border-red-500/60'
            : 'border-white/5 bg-(--secondary)/20 hover:border-white/10 hover:bg-white/6'
        "
        @click="isOpen = !isOpen"
      >
        <span class="truncate">
          {{ selected?.label ?? placeholder ?? 'Выберите' }}
        </span>

        <ChevronDown
          :size="16"
          class="transition-transform duration-200"
          :class="[isOpen ? 'rotate-180' : '', error ? 'text-red-400' : 'text-gray-400']"
        />
      </button>

      <Transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="translate-y-1 scale-95 opacity-0"
        enter-to-class="translate-y-0 scale-100 opacity-100"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="scale-100 opacity-100"
        leave-to-class="scale-95 opacity-0"
      >
        <div
          v-if="isOpen"
          class="absolute right-0 z-50 mt-2 w-full overflow-hidden rounded-2xl border border-white/5 bg-[#14151c] p-1 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
        >
          <button
            v-for="item in options"
            :key="item.value"
            class="flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all"
            :class="
              item.value === modelValue
                ? 'bg-red-500/15 text-red-300'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            "
            @click="selectItem(item)"
          >
            {{ item.label }}
          </button>
        </div>
      </Transition>
    </div>

    <p v-if="error" class="mt-2 text-xs text-red-400">
      {{ error }}
    </p>
  </div>
</template>
