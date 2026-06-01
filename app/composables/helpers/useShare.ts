type ShareOptions = {
  title?: string
  text?: string
  url?: string
}

export function useShare() {
  const notify = useNotify()

  const isSharing = ref(false)
  const error = ref<string | null>(null)

  const share = async (options: ShareOptions = {}) => {
    error.value = null
    isSharing.value = true

    try {
      if (!import.meta.client) return

      const route = useRoute()

      const title = options.title || document.title
      const text = options.text || 'Посмотри это'
      const url = options.url || `${window.location.origin}${route.fullPath}`

      const shareData: ShareData = {
        title,
        text,
        url,
      }

      /**
       * Нативное меню "Поделиться"
       * Работает на телефонах и некоторых desktop-браузерах
       */
      if (navigator.share) {
        await navigator.share(shareData)
        notify.success('Вы поделились ссылкой')
        return
      }

      /**
       * Fallback: копируем ссылку
       */
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url)
        notify.success('Ссылка скопирована в буфер обмена')
        return
      }

      notify.error('Ваш браузер не поддерживает функцию поделиться')
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'Не удалось поделиться'
      }
    } finally {
      isSharing.value = false
    }
  }

  return {
    share,
    isSharing,
    error,
  }
}
