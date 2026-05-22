export default defineNuxtPlugin(() => {
  if (window.Telegram?.WebApp) return

  const script = document.createElement('script')
  script.src = 'https://telegram.org/js/telegram-web-app.js'
  script.async = true
  script.defer = true

  document.head.appendChild(script)
})
