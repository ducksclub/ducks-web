<script setup lang="ts">
import { Calendar, Info, List, Star, User } from '@lucide/vue'
</script>

<template>
  <div class="min-h-screen relative bg-(--bg) text-white pb-20 w-full max-w-100 mx-auto pt-safe">
    <slot />

    <LayoutNavbar>
      <LayoutNavbarButton path="/">
        <template #icon>
          <Calendar />
        </template>
        <template #default> Главная </template>
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
