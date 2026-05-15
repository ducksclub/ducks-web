<script setup lang="ts">
import { useContentApi } from '~/api/content.api'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderMenu from '~/components/layout/header/HeaderMenu.vue'
import HeaderMenuItem from '~/components/layout/header/HeaderMenuItem.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import BaseSelect from '~/components/ui/BaseSelect.vue'
import { ContentType, type Content } from '~/types/api/content.types'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

const router = useRouter()
const notify = useNotify()

const { getContents } = useContentApi()

const selectedContentType = ref<ContentType>(ContentType.FAQ)

const content = ref<Content[]>([])
const isLoading = ref(false)

const contentTypeOptions = [
  {
    label: 'FAQ',
    value: ContentType.FAQ,
  },
  {
    label: 'Правила',
    value: ContentType.RULES,
  },
  {
    label: 'О клубе',
    value: ContentType.ABOUT,
  },
  {
    label: 'Уровни покера',
    value: ContentType.POKER_LEVELS,
  },
]

const currentTitle = computed(() => {
  return (
    contentTypeOptions.find((item) => item.value === selectedContentType.value)?.label || 'Контент'
  )
})

const fetchContent = async () => {
  isLoading.value = true

  // очистка старого контента
  content.value = []

  try {
    const response = await getContents({
      key: selectedContentType.value,
    })

    content.value = response
  } catch (error: any) {
    notify.error(error?.error || 'Ошибка загрузки')
  } finally {
    isLoading.value = false
  }
}

const goToCreate = () => {
  router.push('/admin/content/create')
}

const goToUpdate = (contentId: string) => {
  router.push('/admin/content/' + contentId)
}

watch(selectedContentType, fetchContent, {
  immediate: true,
})
</script>

<template>
  <BaseHeader>
    <template #left> </template>

    <template #default>
      <HeaderTitle title="Контент" />
    </template>

    <template #right>
      <HeaderMenu>
        <HeaderMenuItem @click="goToCreate"> Создать </HeaderMenuItem>
      </HeaderMenu>
    </template>
  </BaseHeader>

  <div class="space-y-4 p-6">
    <!-- SELECT -->
    <BaseSelect
      v-model="selectedContentType"
      :options="contentTypeOptions"
      placeholder="Тип контента"
    />

    <!-- HEADER -->
    <div>
      <h2 class="text-lg font-bold text-white">
        {{ currentTitle }}
      </h2>

      <p class="mt-1 text-sm text-gray-400">Управление контентом раздела</p>
    </div>

    <!-- LOADING -->
    <div v-if="isLoading" class="space-y-3">
      <div v-for="i in 4" :key="i" class="h-28 animate-pulse rounded-2xl bg-(--secondary)/20" />
    </div>

    <!-- EMPTY -->
    <div
      v-else-if="!content.length"
      class="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 py-20 text-center"
    >
      <p class="text-lg font-medium text-white">Контент отсутствует</p>

      <p class="mt-2 text-sm text-gray-400">Создайте первую запись для этого раздела</p>
    </div>

    <!-- CONTENT -->
    <div v-else class="space-y-3">
      <div
        v-for="item in content"
        :key="item.id"
        class="rounded-2xl border border-white/5 bg-(--secondary)/20 p-4"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0 flex-1">
            <h3 class="truncate text-sm font-semibold text-white">
              {{ item.title || 'Без названия' }}
            </h3>

            <p class="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-400 whitespace-pre-wrap">
              {{ item.body }}
            </p>
          </div>

          <button
            @click="goToUpdate(item.id)"
            class="rounded-xl border border-white/10 px-3 py-2 text-xs text-white transition hover:bg-white/5"
          >
            Изменить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
