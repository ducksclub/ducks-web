<script setup lang="ts">
import { Calendar, CalendarCheck, CornerDownLeft, Link2, Menu, MessageSquare } from '@lucide/vue'
</script>

<template>
  <div class="min-h-screen relative bg-(--bg) text-white pb-20 w-full max-w-115 mx-auto pt-safe">
    <slot />

    <LayoutNavbar>
      <LayoutNavbarButton path="/events">
        <template #icon>
          <CornerDownLeft />
        </template>
        <template #default> Главная </template>
      </LayoutNavbarButton>

      <LayoutNavbarButton path="/admin/events">
        <template #icon>
          <Calendar />
        </template>
        <template #default> События </template>
      </LayoutNavbarButton>

      <LayoutNavbarButton path="/admin/promo-links">
        <template #icon>
          <Link2 />
        </template>
        <template #default>Промо </template>
      </LayoutNavbarButton>

      <LayoutNavbarButton path="/admin/menu">
        <template #icon>
          <Menu />
        </template>
        <template #default>Меню</template>
      </LayoutNavbarButton>
    </LayoutNavbar>
  </div>
</template>
