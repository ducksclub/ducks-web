<script lang="ts" setup>
type Item = { label: string; value: string }

const props = defineProps<{
  list: Item[]
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const selectedValue = computed({
  get: () => props.modelValue ?? props.list[0]?.value ?? '',
  set: (val: string) => emit('update:modelValue', val),
})
</script>

<template>
  <div class="flex gap-2 overflow-x-auto no-scrollbar py-2">
    <button
      v-for="item in list"
      :key="item.value"
      @click="selectedValue = item.value"
      :class="[
        'px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition-all active:scale-95',
        selectedValue === item.value
          ? 'bg-(--logo-bg) text-white shadow-lg shadow-(--logo-bg)/20'
          : 'bg-(--secondary)/20 text-gray-500',
      ]"
    >
      {{ item.label }}
    </button>
  </div>
</template>
