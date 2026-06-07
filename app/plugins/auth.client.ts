export default defineNuxtPlugin(() => {
  const auth = useAuthStore()

  void auth.initializeAuth().catch(() => {
    // Auth errors are stored in Pinia; startup should not render Nuxt error page.
  })
})
