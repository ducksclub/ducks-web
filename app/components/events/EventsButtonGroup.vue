<script lang="ts" setup>
const props = defineProps<{
  list: string[]
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const selectedItem = computed({
  get: () => props.modelValue ?? props.list[0] ?? '',
  set: (val: string) => emit('update:modelValue', val),
})
</script>

<template>
  <div class="flex gap-2 overflow-x-auto no-scrollbar py-2">
    <button
      v-for="item in list"
      :key="item"
      @click="selectedItem = item"
      :class="[
        'px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition-all active:scale-95',
        selectedItem === item
          ? 'bg-(--logo-bg) text-white shadow-lg shadow-(--logo-bg)/20'
          : 'bg-(--secondary)/20 text-gray-500',
      ]"
    >
      {{ item }}
    </button>
  </div>
</template>
