import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: {
    enabled: process.env.NODE_ENV !== 'production',
  },

  css: ['~/assets/css/main.css'],

  modules: ['@nuxt/image', '@vite-pwa/nuxt'],

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
    apiBase: process.env.NUXT_PRIVATE_API_BASE || '',
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || process.env.NUXT_PUBLIC_API_URL || '/api',
      mediaBase: process.env.NUXT_PUBLIC_MEDIA_BASE || '',
    },
  },

  app: {
    head: {
      meta: [
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
        },
      ],
      link: [{ rel: 'apple-touch-icon', href: '/192.png' }],
      script: [
        {
          src: '/telegram-web-app.js',
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
          src: '/192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
    },

    devOptions: {
      enabled: process.env.NODE_ENV === 'production',
      type: 'module',
    },
  },
})
