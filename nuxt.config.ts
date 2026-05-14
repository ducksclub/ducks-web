import tailwindcss from '@tailwindcss/vite'
import process from 'node:process'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/image', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@vite-pwa/nuxt'],
  typescript: {
    strict: true,
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
    },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_URL,
    },
  },
  app: {
    head: {
      script: [
        {
          src: 'https://telegram.org/js/telegram-web-app.js',
        },
      ],
      meta: [
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover, user-scalable=0',
        },
      ],
    },
  },

  pwa: {
    registerType: 'autoUpdate',

    manifest: {
      name: "Duck's GameClub",
      short_name: "Duck's",
      description: "Duck's GameClub Mini App",
      theme_color: '#0a0c12',
      background_color: '#0a0c12',
      display: 'standalone',
      orientation: 'portrait',
      start_url: '/',
      scope: '/',

      icons: [
        {
          src: '/pwa-192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/pwa-512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/pwa-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
    devOptions: {
      enabled: true,
    },
  },
})
