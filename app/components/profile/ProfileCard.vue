<script setup lang="ts">
import { getInitial } from '~/shared/lib/text'
import { renderPicture } from '~/shared/lib/media'
import type { AuthUser } from '~/features/auth/model/user'

const props = defineProps<{
  photoUrl?: Pick<AuthUser, 'avatarUrl'>['avatarUrl']
  nickname: Pick<AuthUser, 'nickname'>['nickname']
}>()
</script>

<template>
  <div class="rounded-2xl border border-white/5 bg-(--secondary)/20 p-8 text-center">
    <NuxtImg
      v-if="props.photoUrl"
      class="mx-auto flex size-32 items-center justify-center rounded-full border border-(--logo-bg)/30 bg-black select-none"
      :src="renderPicture(props.photoUrl)"
    />

    <div
      v-else
      class="mx-auto flex size-32 items-center justify-center rounded-full border border-(--logo-bg)/30 bg-black text-4xl font-black"
    >
      {{ getInitial(props.nickname) }}
    </div>

    <h2 class="mt-4 text-xl font-black tracking-wide">
      {{ props.nickname }}
    </h2>
  </div>
</template>
