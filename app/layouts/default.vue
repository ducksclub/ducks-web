<script setup lang="ts">
import { Calendar, Info, List, Star, User } from '@lucide/vue'
</script>

<template>
  <!-- <div class="min-h-screen bg-(--bg) text-white font-sans pb-20"> -->
  <div class="min-height[100dvh] bg-(--bg) text-white font-sans pb-20">
    <slot />

    <LayoutNavbar>
      <LayoutNavbarButton path="/events">
        <template #icon>
          <Calendar />
        </template>
        <template #default> Афиша </template>
      </LayoutNavbarButton>

      <LayoutNavbarButton path="/rating">
        <template #icon>
          <Star />
        </template>
        <template #default> Рейтинг </template>
      </LayoutNavbarButton>

      <LayoutNavbarButton path="/profile">
        <template #icon>
          <User />
        </template>
        <template #default> Профиль </template>
      </LayoutNavbarButton>

      <LayoutNavbarButton path="/rules">
        <template #icon>
          <List />
        </template>
        <template #default> Правила </template>
      </LayoutNavbarButton>

      <LayoutNavbarButton path="/support">
        <template #icon>
          <Info />
        </template>
        <template #default> Поддержка </template>
      </LayoutNavbarButton>
    </LayoutNavbar>
  </div>
</template>
