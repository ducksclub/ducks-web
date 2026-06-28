<script lang="ts" setup>
import { ArrowUpRight, Info, MapPin, Sparkles } from '@lucide/vue'
</script>

<template>
  <section class="grid grid-cols-2 gap-3">
    <!-- About -->
    <NuxtLink
      to="/about"
      class="group relative col-span-2 overflow-hidden rounded-3xl border border-(--logo-bg)/25 bg-[#08090f] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.28)] transition active:scale-[0.985]"
    >
      <div class="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-(--logo-bg)/18 blur-3xl" />

      <div
        class="absolute inset-0 bg-linear-to-br from-(--logo-bg)/16 via-(--logo-bg)/5 to-transparent"
      />

      <div
        class="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/8"
      />

      <div
        class="pointer-events-none absolute inset-x-5 top-0 h-px bg-linear-to-r from-transparent via-white/16 to-transparent"
      />

      <div class="relative z-10 flex items-center justify-between gap-4">
        <div class="min-w-0">
          <div
            class="mb-3 flex h-9 w-9 items-center justify-center rounded-2xl border border-(--logo-bg)/18 bg-(--logo-bg)/10 text-(--logo-bg)"
          >
            <Sparkles :size="18" :stroke-width="2.5" />
          </div>

          <p class="text-[10px] font-black uppercase tracking-[0.18em] text-(--logo-bg)/70">
            Duck’s club
          </p>

          <h2 class="mt-1 text-[18px] font-black leading-tight tracking-[-0.035em] text-white">
            О клубе
          </h2>

          <p class="mt-1 max-w-65 text-[12px] leading-4 text-white/58">
            Атмосфера, правила и игровые направления DUCK’S
          </p>
        </div>

        <div
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/7 text-white/70 transition group-active:scale-95"
        >
          <ArrowUpRight :size="17" :stroke-width="2.6" />
        </div>
      </div>
    </NuxtLink>

    <!-- Location -->
    <NuxtLink
      to="/location"
      class="relative overflow-hidden rounded-[22px] border border-sky-400/18 bg-[#08090f] p-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.26)] transition active:scale-[0.985]"
    >
      <div class="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-sky-400/16 blur-3xl" />

      <div class="absolute inset-0 bg-linear-to-br from-sky-400/14 via-sky-500/5 to-transparent" />

      <div
        class="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/8"
      />

      <div class="relative z-10">
        <div
          class="mb-3 flex h-8 w-8 items-center justify-center rounded-xl border border-sky-300/14 bg-sky-400/8 text-sky-200"
        >
          <MapPin :size="16" :stroke-width="2.5" />
        </div>

        <p class="text-[14px] font-black leading-tight tracking-tight text-white">Как нас найти</p>

        <p class="mt-1.5 text-[10px] leading-4 text-white/52">
          БП «ПАРК МИРА»<br />
          Проспект Мира 102<br />
          Ⓜ️ Алексеевская
        </p>
      </div>
    </NuxtLink>

    <!-- Info -->
    <NuxtLink
      to="/info"
      class="relative overflow-hidden rounded-[22px] border border-red-400/18 bg-[#08090f] p-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.26)] transition active:scale-[0.985]"
    >
      <div class="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-red-400/16 blur-3xl" />

      <div class="absolute inset-0 bg-linear-to-br from-red-400/14 via-red-500/5 to-transparent" />

      <div
        class="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/8"
      />

      <div class="relative z-10">
        <div
          class="mb-3 flex h-8 w-8 items-center justify-center rounded-xl border border-red-300/14 bg-red-400/8 text-red-200"
        >
          <Info :size="16" :stroke-width="2.5" />
        </div>

        <p class="text-[14px] font-black leading-tight tracking-tight text-white">Информация</p>

        <p class="mt-1.5 text-[10px] leading-4 text-white/52">
          Поддержка,<br />
          правила и FAQ
        </p>
      </div>
    </NuxtLink>
  </section>
</template>
