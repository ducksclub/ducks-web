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

      const text = options.text || 'Посмотри это'
      const url = options.url || `${window.location.origin}${route.fullPath}`

      /**
       * Один общий текст для всех способов поделиться
       */
      const message = `${text}\n\n${url}`

      const shareData: ShareData = {
        text: message,
      }

      /**
       * Нативное меню "Поделиться"
       */
      if (navigator.share) {
        await navigator.share(shareData)
        notify.success('Вы поделились ссылкой')
        return
      }

      /**
       * Fallback: копируем тот же самый текст
       */
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(message)
        notify.success('Текст со ссылкой скопирован')
        return
      }

      notify.error('Ваш браузер не поддерживает функцию поделиться')
    } catch (err) {
      if (err instanceof Error) {
        /**
         * Если пользователь сам закрыл меню поделиться,
         * лучше не показывать ошибку
         */
        if (err.name === 'AbortError') return

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
