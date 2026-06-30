<script setup lang="ts">
defineProps<{
  isAuthenticated: boolean
  isPublished: boolean
  isRegistered: boolean
  isPokerEvent: boolean
  isRegistrationLoading: boolean
  isSeatLoading: boolean
}>()

const emit = defineEmits<{
  (e: 'register'): void
  (e: 'unregister'): void
  (e: 'open-seat'): void
  (e: 'signin'): void
}>()
</script>

<template>
  <template v-if="isAuthenticated">
    <div v-if="isPublished" class="pt-2">
      <BaseButton
        v-if="!isRegistered"
        :loading="isRegistrationLoading"
        :disabled="isRegistrationLoading"
        class="w-full"
        @click="emit('register')"
      >
        Участвовать
      </BaseButton>

      <div v-else-if="isPokerEvent" class="space-y-3">
        <BaseButton
          :loading="isSeatLoading"
          :disabled="isSeatLoading || isRegistrationLoading"
          class="w-full mt-0"
          @click="emit('open-seat')"
        >
          Узнать место
        </BaseButton>

        <BaseButton
          variant="secondary"
          :loading="isRegistrationLoading"
          :disabled="isRegistrationLoading || isSeatLoading"
          class="w-full mt-0"
          @click="emit('unregister')"
        >
          Отменить запись
        </BaseButton>
      </div>

      <BaseButton
        v-else
        variant="secondary"
        :loading="isRegistrationLoading"
        :disabled="isRegistrationLoading"
        class="w-full"
        @click="emit('unregister')"
      >
        Отменить запись
      </BaseButton>
    </div>

    <div
      v-else
      class="rounded-2xl border border-white/5 bg-white/5 p-4 text-center text-sm text-gray-400"
    >
      Событие недоступно
    </div>
  </template>

  <template v-else>
    <BaseButton class="w-full" @click="emit('signin')"> Зарегистрироваться </BaseButton>
  </template>
</template>
