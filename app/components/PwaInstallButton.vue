<script setup lang="ts">
const deferredPrompt = ref<any>(null)

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e
  })
})

const installApp = async () => {
  if (!deferredPrompt.value) return

  deferredPrompt.value.prompt()

  await deferredPrompt.value.userChoice

  deferredPrompt.value = null
}
</script>

<template>
  <button @click="installApp" class="rounded-2xl bg-white px-4 py-3 text-black font-bold">
    Установить приложение
  </button>
</template>
