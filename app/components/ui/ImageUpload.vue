<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: string
    label?: string
    loading?: boolean
    error?: string
  }>(),
  {
    modelValue: '',
    label: 'Обложка',
    loading: false,
    error: '',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', file: File): void
}>()

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) {
    return
  }

  emit('change', file)

  emit('update:modelValue', URL.createObjectURL(file))
}
</script>

<template>
  <div>
    <label v-if="label" class="mb-2 block text-sm text-gray-400">
      {{ label }}
    </label>

    <label
      class="group relative flex h-56 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border border-dashed transition"
      :class="
        error
          ? 'border-red-500/40 bg-red-500/5 hover:border-red-500/60'
          : 'border-white/10 bg-(--secondary)/10 hover:border-(--primary)/40'
      "
    >
      <NuxtImg
        v-if="modelValue"
        :src="modelValue.startsWith('blob') ? modelValue : renderPicture(modelValue)"
        class="absolute inset-0 h-full w-full object-cover"
      />

      <div class="absolute inset-0 bg-black/40 opacity-0 transition group-hover:opacity-100" />

      <div v-if="!modelValue" class="relative z-10 flex flex-col items-center gap-3 text-center">
        <div
          class="flex size-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-7 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 16l4-4a2 2 0 012.828 0L14 15l2-2a2 2 0 012.828 0L20 14M7 8h.01M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
            />
          </svg>
        </div>

        <div>
          <p class="text-sm font-medium">Загрузить изображение</p>

          <p class="mt-1 text-xs text-gray-400">PNG, JPG, WEBP</p>
        </div>
      </div>

      <div
        v-if="modelValue"
        class="absolute right-3 bottom-3 rounded-xl bg-black/60 px-3 py-1 text-xs backdrop-blur-md"
      >
        Изменить
      </div>

      <input type="file" accept="image/*" class="hidden" @change="onFileChange" />
    </label>

    <p v-if="loading" class="mt-2 text-xs text-gray-500">Загрузка изображения...</p>

    <p v-if="error" class="mt-2 text-xs text-red-400">
      {{ error }}
    </p>
  </div>
</template>
