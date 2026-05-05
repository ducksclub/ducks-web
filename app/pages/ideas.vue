<template>
  <div class="p-6 space-y-6 text-center">
    <h1 class="text-xl font-black italic uppercase py-4">ВАШИ ИДЕИ</h1>
    <p class="text-xs text-gray-500 font-bold uppercase tracking-[0.2em]">Помоги нам стать лучше</p>
    <textarea
      v-model="text"
      rows="6"
      class="w-full bg-[#1A1A1A] border border-white/5 rounded-3xl p-6 outline-none focus:border-[#E11D48]/50 placeholder:text-gray-700"
      placeholder="Опишите вашу идею..."
    ></textarea>
    <div class="flex justify-center gap-2">
      <button
        v-for="s in 5"
        :key="s"
        @click="stars = s"
        :class="[
          'text-3xl transition-all',
          s <= stars ? 'grayscale-0 scale-110' : 'grayscale opacity-30',
        ]"
      >
        ⭐️
      </button>
    </div>
    <button
      @click="send"
      class="w-full bg-[#E11D48] font-black py-4 rounded-2xl shadow-lg uppercase italic mt-4"
    >
      ОТПРАВИТЬ
    </button>
  </div>
</template>

<script setup>
const text = ref('')
const stars = ref(5)
const send = () => {
  alert('Спасибо за идею!')
  navigateTo('/profile')
}
</script>
