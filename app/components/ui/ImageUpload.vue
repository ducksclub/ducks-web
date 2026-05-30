<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { Cropper, CircleStencil, RectangleStencil } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    label?: string
    loading?: boolean
    error?: string
    cropShape?: 'rectangle' | 'circle'
    aspectRatio?: number
  }>(),
  {
    modelValue: '',
    label: 'Обложка',
    loading: false,
    error: '',
    cropShape: 'rectangle',
    aspectRatio: 16 / 9,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', file: File): void
}>()

const cropperRef = ref<InstanceType<typeof Cropper> | null>(null)

const isCropperOpen = ref(false)
const tempImage = ref('')
const originalFileName = ref('image.jpg')
const originalFileType = ref('image/jpeg')

const stencilComponent = computed(() => {
  return props.cropShape === 'circle' ? CircleStencil : RectangleStencil
})

const stencilProps = computed(() => {
  if (props.cropShape === 'circle') {
    return {
      aspectRatio: 1,
      handlers: {},
      movable: false,
      resizable: false,
    }
  }

  return {
    aspectRatio: props.aspectRatio,
    handlers: {},
    movable: false,
    resizable: false,
  }
})

const clearTempImage = () => {
  if (tempImage.value.startsWith('blob:')) {
    URL.revokeObjectURL(tempImage.value)
  }

  tempImage.value = ''
}

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) {
    return
  }

  clearTempImage()

  originalFileName.value = file.name || 'image.jpg'
  originalFileType.value = file.type || 'image/jpeg'

  tempImage.value = URL.createObjectURL(file)
  isCropperOpen.value = true

  target.value = ''
}

const closeCropper = () => {
  isCropperOpen.value = false
  clearTempImage()
}

const saveCroppedImage = () => {
  const result = cropperRef.value?.getResult()
  const canvas = result?.canvas

  if (!canvas) {
    return
  }

  canvas.toBlob(
    (blob) => {
      if (!blob) {
        return
      }

      const file = new File([blob], originalFileName.value, {
        type: originalFileType.value,
      })

      const previewUrl = URL.createObjectURL(file)

      emit('change', file)
      emit('update:modelValue', previewUrl)

      isCropperOpen.value = false
      clearTempImage()
    },
    originalFileType.value,
    0.92,
  )
}

onBeforeUnmount(() => {
  clearTempImage()

  if (props.modelValue?.startsWith('blob:')) {
    URL.revokeObjectURL(props.modelValue)
  }
})
</script>

<template>
  <div>
    <label v-if="label" class="mb-2 block text-sm text-gray-400">
      {{ label }}
    </label>

    <div :class="cropShape === 'circle' ? 'flex justify-center' : ''">
      <label
        class="group relative flex cursor-pointer items-center justify-center overflow-hidden border border-dashed transition"
        :class="[
          cropShape === 'circle' ? 'size-56 rounded-full' : 'h-56 w-full rounded-3xl',
          error
            ? 'border-red-500/40 bg-red-500/5 hover:border-red-500/60'
            : 'border-white/10 bg-(--secondary)/10 hover:border-(--primary)/40',
        ]"
      >
        <img
          v-if="modelValue"
          :src="modelValue.startsWith('blob') ? modelValue : renderPicture(modelValue)"
          class="absolute inset-0 h-full w-full object-cover"
          alt="Изображение"
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
          :class="cropShape === 'circle' ? 'right-1/2 translate-x-1/2' : ''"
        >
          Изменить
        </div>

        <input type="file" accept="image/*" class="hidden" @change="onFileChange" />
      </label>
    </div>

    <p v-if="loading" class="mt-2 text-xs text-gray-500">Загрузка изображения...</p>

    <p v-if="error" class="mt-2 text-xs text-red-400">
      {{ error }}
    </p>

    <Teleport to="body">
      <div
        v-if="isCropperOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      >
        <div
          class="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#111] shadow-2xl"
        >
          <div class="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div>
              <h3 class="text-base font-semibold text-white">Обрезать изображение</h3>
              <p class="mt-1 text-xs text-gray-400">Передвигайте и масштабируйте изображение</p>
            </div>

            <button
              type="button"
              class="rounded-xl bg-white/10 px-3 py-2 text-sm text-white transition hover:bg-white/15"
              @click="closeCropper"
            >
              Закрыть
            </button>
          </div>

          <ClientOnly>
            <Cropper
              ref="cropperRef"
              :src="tempImage"
              class="h-105 bg-black"
              :stencil-component="stencilComponent"
              :stencil-props="stencilProps"
              :resize-image="{
                touch: true,
                wheel: true,
              }"
              image-restriction="stencil"
            />
          </ClientOnly>

          <div class="flex items-center justify-end gap-3 border-t border-white/10 px-5 py-4">
            <button
              type="button"
              class="rounded-xl bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/15"
              @click="closeCropper"
            >
              Отмена
            </button>

            <button
              type="button"
              class="rounded-xl bg-(--primary) px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              @click="saveCroppedImage"
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
