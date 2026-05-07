<script setup lang="ts">
import { useEventsApi } from '~/api/events.api'
import { useUploadApi } from '~/api/upload.api'

import BackButton from '~/components/BackButton.vue'

import { categories } from '~/constants/categories'

definePageMeta({
  layout: false,
  middleware: 'admin',
})

const router = useRouter()

const api = useEventsApi()
const { uploadImage, isUploading } = useUploadApi()

const isSaving = ref(false)
const errorMessage = ref('')

const form = reactive({
  title: '',
  description: '',
  address: '',
  gameType: '',
  startsAt: '',
  participantLimit: 10,

  imageUrl: '',
  imageHash: '',
  file: null as File | null,
})

/**
 * Create event
 */
const createEvent = async () => {
  if (isSaving.value || isUploading.value) return

  errorMessage.value = ''

  try {
    isSaving.value = true

    let imageUrl = ''
    let imageHash = ''

    /**
     * Upload image
     */
    if (form.file) {
      const uploaded = await uploadImage(form.file)

      imageUrl = uploaded.url
      imageHash = uploaded.hash
    }

    await api.createEvent({
      address: form.address,
      gameType: form.gameType,
      startsAt: form.startsAt,
      participantLimit: form.participantLimit,
      imageUrl,
      imageHash,
    })

    router.push('/admin/events')
  } catch (e: any) {
    console.error(e)

    errorMessage.value = e?.error || 'Не удалось создать событие'
  } finally {
    isSaving.value = false
  }
}

/**
 * File preview
 */
const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  form.file = file
  form.imageUrl = URL.createObjectURL(file)
}
</script>

<template>
  <div class="min-h-screen bg-(--bg) text-white">
    <!-- HEADER -->
    <div class="sticky top-0 z-20 border-b border-white/5 bg-(--bg)/80 backdrop-blur-xl">
      <div class="flex items-center justify-between p-4">
        <BackButton to="/admin/events" label="Назад" />
      </div>
    </div>

    <!-- CONTENT -->
    <div class="mx-auto max-w-2xl space-y-6 p-4 pb-28">
      <!-- TITLE -->
      <!-- <div>
        <label class="mb-2 block text-sm text-gray-400"> Название события </label>

        <div
          class="flex h-14 items-center gap-3 rounded-2xl border border-white/5 bg-(--secondary)/20 px-4 transition focus-within:border-(--primary)/40"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 7h16M4 12h10M4 17h7" />
          </svg>

          <input
            v-model="form.title"
            placeholder="Например: Poker Night"
            class="h-full w-full bg-transparent outline-none"
          />
        </div>
      </div> -->

      <!-- DESCRIPTION -->
      <!-- <div>
        <label class="mb-2 block text-sm text-gray-400"> Описание </label>

        <div
          class="rounded-3xl border border-white/5 bg-(--secondary)/20 p-4 transition focus-within:border-(--primary)/40"
        >
          <div class="mb-3 flex items-center gap-2 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 10h8M8 14h5M7 4h10a2 2 0 012 2v12l-3-2-3 2-3-2-3 2V6a2 2 0 012-2z"
              />
            </svg>

            <span class="text-sm"> Описание события </span>
          </div>

          <textarea
            v-model="form.description"
            rows="5"
            placeholder="Расскажите подробнее о мероприятии..."
            class="w-full resize-none bg-transparent outline-none"
          />
        </div>
      </div> -->

      <!-- IMAGE -->
      <div>
        <label class="mb-2 block text-sm text-gray-400"> Обложка </label>

        <label
          class="group relative flex h-56 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border border-dashed border-white/10 bg-(--secondary)/10 transition hover:border-(--primary)/40"
        >
          <img
            v-if="form.imageUrl"
            :src="form.imageUrl"
            class="absolute inset-0 h-full w-full object-cover"
          />

          <div class="absolute inset-0 bg-black/40 opacity-0 transition group-hover:opacity-100" />

          <div
            v-if="!form.imageUrl"
            class="relative z-10 flex flex-col items-center gap-3 text-center"
          >
            <div
              class="flex size-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md"
            >
              <!-- IMAGE ICON -->
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
              <p class="text-sm font-medium">
                {{ form.imageUrl ? 'Изменить изображение' : 'Загрузить изображение' }}
              </p>

              <p class="mt-1 text-xs text-gray-400">PNG, JPG, WEBP</p>
            </div>
          </div>

          <input type="file" accept="image/.png,.jpg,.jpeg" class="hidden" @change="onFileChange" />
        </label>

        <p v-if="isUploading" class="mt-2 text-xs text-gray-500">Загрузка изображения...</p>
      </div>

      <!-- CATEGORY -->
      <div>
        <label class="mb-2 block text-sm text-gray-400"> Категория </label>

        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="category in categories"
            :key="category.value"
            type="button"
            @click="form.gameType = category.value"
            class="rounded-2xl border px-4 py-3 text-sm transition"
            :class="
              form.gameType === category.value
                ? 'border-(--primary) bg-(--primary)/10 text-(--primary)'
                : 'border-white/5 bg-(--secondary)/20 text-gray-300 hover:border-white/10'
            "
          >
            {{ category.label }}
          </button>
        </div>
      </div>

      <!-- ADDRESS -->
      <div>
        <label class="mb-2 block text-sm text-gray-400"> Локация </label>

        <div
          class="flex h-14 items-center gap-3 rounded-2xl border border-white/5 bg-(--secondary)/20 px-4 transition focus-within:border-(--primary)/40"
        >
          <!-- MAP ICON -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5 text-gray-500 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 21s-6-4.35-6-10a6 6 0 1112 0c0 5.65-6 10-6 10z"
            />
            <circle cx="12" cy="11" r="2.5" />
          </svg>

          <input
            v-model="form.address"
            placeholder="Адрес мероприятия"
            class="h-full w-full bg-transparent outline-none"
          />
        </div>
      </div>

      <!-- DATE -->
      <div>
        <label class="mb-2 block text-sm text-gray-400"> Дата и время </label>

        <div
          class="flex h-14 items-center gap-3 rounded-2xl border border-white/5 bg-(--secondary)/20 px-4 transition focus-within:border-(--primary)/40"
        >
          <!-- CALENDAR ICON -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 3v2M16 3v2M4 9h16M5 5h14a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"
            />
          </svg>

          <input
            v-model="form.startsAt"
            type="datetime-local"
            class="h-full w-full bg-transparent outline-none"
          />
        </div>
      </div>

      <!-- PARTICIPANTS -->
      <div>
        <label class="mb-2 block text-sm text-gray-400"> Лимит участников </label>

        <div
          class="flex h-14 items-center gap-3 rounded-2xl border border-white/5 bg-(--secondary)/20 px-4 transition focus-within:border-(--primary)/40"
        >
          <!-- USERS ICON -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"
            />
            <circle cx="9" cy="7" r="3" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M23 21v-2a4 4 0 00-3-3.87" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 3.13a4 4 0 010 7.75" />
          </svg>

          <input
            v-model.number="form.participantLimit"
            type="number"
            min="1"
            placeholder="Количество мест"
            class="h-full w-full bg-transparent outline-none"
          />
        </div>
      </div>

      <!-- ERROR -->
      <div
        v-if="errorMessage"
        class="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
      >
        {{ errorMessage }}
      </div>
    </div>

    <!-- MOBILE BUTTON -->
    <div
      class="fixed inset-x-0 bottom-0 z-30 border-t border-white/5 bg-(--bg)/80 p-4 backdrop-blur-xl md:hidden"
    >
      <BaseButton
        class="w-full"
        :disabled="isSaving || isUploading"
        :loading="isSaving || isUploading"
        @click="createEvent"
      >
        Создать событие
      </BaseButton>
    </div>
  </div>
</template>
