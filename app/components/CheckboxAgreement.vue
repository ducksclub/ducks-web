<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean
  error?: boolean
  errorMessage?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const toggle = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>

<template>
  <div class="space-y-1.5">
    <label
      class="flex items-start gap-3 text-[11px] cursor-pointer group transition-colors"
      :class="error ? 'text-red-500' : 'text-gray-500'"
    >
      <!-- Checkbox -->
      <div class="relative flex items-center">
        <input
          :checked="modelValue"
          @change="toggle"
          type="checkbox"
          class="peer appearance-none w-5 h-5 rounded-md transition-all"
          :class="[
            error
              ? 'bg-red-500/10 border border-red-500/50 checked:bg-red-500 checked:border-transparent'
              : 'bg-(--secondary)/20 border border-white/10 checked:bg-(--logo-bg) checked:border-transparent',
          ]"
        />

        <!-- Check icon -->
        <svg
          class="absolute w-3 h-3 left-1 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="4"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <!-- Text -->
      <span
        class="leading-tight transition-colors"
        :class="error ? 'group-hover:text-red-400' : 'group-hover:text-gray-400'"
      >
        <slot />
      </span>
    </label>

    <!-- Error message -->
    <p v-if="error && errorMessage" class="pl-8 text-[11px] leading-tight text-red-500">
      {{ errorMessage }}
    </p>
  </div>
</template>
