<script setup lang="ts">
import { Calendar, CalendarCheck, CornerDownLeft, Link2, MessageSquare } from '@lucide/vue'
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

      <LayoutNavbarButton path="/admin/active-events">
        <template #icon>
          <CalendarCheck />
        </template>
        <template #default> Активные </template>
      </LayoutNavbarButton>

      <LayoutNavbarButton path="/admin/feedback">
        <template #icon>
          <MessageSquare />
        </template>
        <template #default> Feedback </template>
      </LayoutNavbarButton>

      <LayoutNavbarButton path="/admin/promo-links">
        <template #icon>
          <Link2 />
        </template>
        <template #default>Промо </template>
      </LayoutNavbarButton>

      <LayoutNavbarButton path="/admin/content">
        <template #icon>
          <MessageSquare />
        </template>
        <template #default>Контент </template>
      </LayoutNavbarButton>
    </LayoutNavbar>
  </div>
</template>
