<script setup lang="ts">
import type { Rating } from '~/types/rating'

const props = defineProps<{
  rating: Rating[]
}>()

const { user } = useAuthStore()

const isMe = (id: string) => id === user?.id

const getInitial = (name?: string) => {
  if (!name) return '?'
  return name.trim().charAt(0).toUpperCase()
}

const positionClass = (index: number) => {
  if (index === 0) return 'text-white'
  if (index === 1) return 'text-gray-200'
  if (index === 2) return 'text-gray-300'
  return 'text-gray-500'
}

const rowClass = (item: Rating, index: number) => {
  if (isMe(item.user.id)) {
    return 'bg-(--logo-bg)/10 border-(--logo-bg)/30'
  }

  if (index < 3) {
    return 'bg-white/3 border-white/5'
  }

  return 'bg-(--secondary)/20 border-white/5 hover:bg-white/5'
}

const avatarClass = (item: Rating) => {
  return isMe(item.user.id)
    ? 'bg-(--logo-bg)/20 border-(--logo-bg)/40 text-white'
    : 'bg-(--bg) border-white/10 text-gray-300'
}

const nameClass = (item: Rating) => {
  return isMe(item.user.id) ? 'text-white' : 'text-gray-300'
}

const pointsClass = (item: Rating) => {
  return isMe(item.user.id) ? 'text-(--logo-bg)' : 'text-white'
}

const showMeBadge = (item: Rating) => isMe(item.user.id)
</script>

<template>
  <div
    class="mt-4 grid grid-cols-12 px-4 mb-2 text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]"
  >
    <div class="col-span-2">#</div>
    <div class="col-span-7">Игрок</div>
    <div class="col-span-3 text-right">Очки</div>
  </div>

  <!-- LIST -->
  <div class="space-y-2">
    <div
      v-for="(item, index) in rating"
      :key="item.id"
      class="grid grid-cols-12 items-center px-4 py-4 rounded-2xl border transition-all duration-200"
      :class="rowClass(item, index)"
    >
      <div class="col-span-2 flex items-center gap-2">
        <span class="text-sm font-black" :class="positionClass(index)">
          {{ index + 1 }}
        </span>
      </div>

      <div class="col-span-7 flex items-center gap-3 min-w-0">
        <NuxtImg
          v-if="item.user?.avatarUrl"
          class="w-9 h-9 rounded-xl flex items-center justify-center border text-xs font-black tracking-wide"
          :class="avatarClass(item)"
          :src="item.user.avatarUrl"
          alt="Avatar"
        />

        <div
          v-else
          class="w-9 h-9 rounded-xl flex items-center justify-center border text-xs font-black tracking-wide"
          :class="avatarClass(item)"
        >
          {{ getInitial(item.user.username) }}
        </div>

        <div class="min-w-0">
          <div class="text-sm font-semibold truncate" :class="nameClass(item)">
            {{ item.user.username }}
          </div>

          <div
            v-if="showMeBadge(item)"
            class="text-[10px] text-(--logo-bg) uppercase tracking-widest font-bold"
          >
            вы
          </div>
        </div>
      </div>

      <div class="col-span-3 text-right font-black text-sm tabular-nums" :class="pointsClass(item)">
        {{ item.points }}
      </div>
    </div>
  </div>
</template>
