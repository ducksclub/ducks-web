<script setup lang="ts">
import { ArrowUpRight, CalendarDays } from '@lucide/vue'
</script>

<template>
  <NuxtLink
    to="/events"
    class="group relative block overflow-hidden rounded-[30px] border border-white/10 bg-[#07080d] shadow-[0_20px_60px_rgba(0,0,0,0.45)] active:scale-[0.985] transition"
  >
    <!-- Background -->
    <div
      class="absolute inset-0 scale-110 bg-cover bg-center opacity-70 transition duration-700 group-active:scale-105"
      style="background-image: url('/assets/images/duck.jpg')"
    />

    <!-- Dark overlays -->
    <div class="absolute inset-0 bg-black/45" />
    <div class="absolute inset-0 bg-linear-to-b from-black/10 via-black/55 to-[#07080d]" />
    <div class="absolute inset-0 bg-linear-to-r from-black/85 via-black/45 to-transparent" />

    <!-- Glow -->
    <div class="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-(--logo-bg)/20 blur-3xl" />
    <div class="absolute -bottom-24 left-0 h-52 w-52 rounded-full bg-orange-500/10 blur-3xl" />

    <!-- Border light -->
    <div
      class="pointer-events-none absolute inset-0 rounded-[30px] ring-1 ring-inset ring-white/10"
    />
    <div
      class="pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-white/35 to-transparent"
    />

    <div class="relative z-10 p-5">
      <!-- Top -->
      <div class="flex items-start justify-between gap-4">
        <div
          class="inline-flex items-center gap-1.5 rounded-full border border-(--logo-bg)/25 bg-(--logo-bg)/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-(--logo-bg)"
        >
          <CalendarDays :size="12" :stroke-width="2.5" />
          Афиша
        </div>

        <div
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-xl transition group-active:scale-95"
        >
          <ArrowUpRight :size="19" :stroke-width="2.6" />
        </div>
      </div>

      <!-- Content -->
      <div class="mt-10">
        <p class="text-[11px] font-bold uppercase tracking-[0.22em] text-white/45">
          Poker club events
        </p>

        <h1
          class="mt-2 max-w-67.5 text-[31px] font-black uppercase leading-[0.92] tracking-[-0.055em] text-white"
        >
          Игровое пространство

          <span
            class="mt-2 block w-fit -rotate-1 rounded-lg bg-(--logo-bg) px-3 py-1.5 font-anton text-[50px] font-black leading-none tracking-normal text-white shadow-[0_14px_38px_rgba(255,140,0,0.28)]"
          >
            DUCK'S
          </span>
        </h1>

        <p class="mt-4 max-w-63.75 text-[13px] leading-5 text-white/62">
          Турниры по покеру, рейтинги, игровые вечера и события клуба.
        </p>
      </div>

      <!-- Bottom hint -->
      <div class="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
        <span class="text-sm font-bold text-white"> Открыть афишу </span>

        <span class="text-xs font-semibold text-white/40"> Нажмите </span>
      </div>
    </div>
  </NuxtLink>
</template>
