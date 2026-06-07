<script setup lang="ts">
onMounted(() => {
  const telegram = useTelegramWebApp()
  const webApp = telegram.getWebApp()

  telegram.syncInitDataFromTelegram()

  webApp?.ready()
  webApp?.expand()
})
</script>

<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <NotifyContainer />
  </NuxtLayout>
</template>
