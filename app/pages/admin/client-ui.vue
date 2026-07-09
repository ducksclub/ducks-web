<script setup lang="ts">
import { Image, Loader2, Save } from '@lucide/vue'
import { useClientUiApi } from '~/api/clientUi.api'
import BaseHeader from '~/components/layout/header/BaseHeader.vue'
import HeaderBackButton from '~/components/layout/header/HeaderBackButton.vue'
import HeaderTitle from '~/components/layout/header/HeaderTitle.vue'
import BaseSelect from '~/components/ui/BaseSelect.vue'
import { ClientUiTypes, type ClientUiType } from '~/types/client-ui'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

useHead({
  title: "Duck's Admin | Клиентская часть",
})

const notify = useNotify()
const { getClientUi, updateClientUi } = useClientUiApi()

const selectedType = ref<ClientUiType>(ClientUiTypes.POKER)
const initialType = ref<ClientUiType>(ClientUiTypes.POKER)
const isLoading = ref(true)
const isSaving = ref(false)

const typeOptions = [
  { label: ClientUiTypes.POKER, value: ClientUiTypes.POKER },
  { label: ClientUiTypes.DEALER, value: ClientUiTypes.DEALER },
  { label: ClientUiTypes.FLOOR, value: ClientUiTypes.FLOOR },
  { label: ClientUiTypes.ADMINISTRATOR, value: ClientUiTypes.ADMINISTRATOR },
  { label: ClientUiTypes.MANAGER, value: ClientUiTypes.MANAGER },
]

const hasChanges = computed(() => selectedType.value !== initialType.value)

const fetchSetting = async () => {
  isLoading.value = true

  try {
    const setting = await getClientUi()

    selectedType.value = setting.type
    initialType.value = setting.type
  } catch (error: any) {
    notify.error(error?.data?.message || error?.message || 'Не удалось загрузить настройку')
  } finally {
    isLoading.value = false
  }
}

const saveSetting = async () => {
  if (!hasChanges.value || isSaving.value) return

  isSaving.value = true

  try {
    const setting = await updateClientUi({ type: selectedType.value })

    selectedType.value = setting.type
    initialType.value = setting.type
    notify.success('Настройка сохранена')
  } catch (error: any) {
    notify.error(error?.data?.message || error?.message || 'Не удалось сохранить настройку')
  } finally {
    isSaving.value = false
  }
}

onMounted(fetchSetting)
</script>

<template>
  <BaseHeader>
    <template #left>
      <HeaderBackButton />
    </template>

    <template #default>
      <HeaderTitle title="Клиентская часть" />
    </template>
  </BaseHeader>

  <main class="space-y-6 p-4 pb-10 sm:p-6">
    <section class="rounded-2xl border border-white/10 bg-(--secondary)/15 p-4">
      <div class="flex items-center gap-3">
        <div
          class="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-(--logo-bg)"
        >
          <Image :size="19" />
        </div>

        <div class="min-w-0 flex-1">
          <h2 class="text-sm font-black text-white">Картинка и кнопка</h2>
          <p class="mt-1 text-xs text-gray-500">Выберите тип отображения для клиентской части</p>
        </div>
      </div>

      <div v-if="isLoading" class="mt-5 flex items-center gap-2 text-sm text-gray-400">
        <Loader2 class="size-4 animate-spin" />
        Загрузка настройки...
      </div>

      <div v-else class="mt-5 space-y-5">
        <BaseSelect v-model="selectedType" :options="typeOptions" label="Тип" />

        <div class="rounded-2xl border border-white/5 bg-black/10 p-4">
          <p class="text-xs text-gray-500">Текущее значение</p>
          <p class="mt-2 text-lg font-black text-white">{{ initialType }}</p>
        </div>

        <BaseButton :disabled="!hasChanges || isSaving" :loading="isSaving" @click="saveSetting">
          <span class="inline-flex items-center justify-center gap-2">
            <Save class="size-4" />
            Сохранить
          </span>
        </BaseButton>
      </div>
    </section>
  </main>
</template>
