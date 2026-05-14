interface TelegramHapticFeedback {
  impactOccurred(style: 'light' | 'medium' | 'heavy'): void
  notificationOccurred(type: 'success' | 'error' | 'warning'): void
  selectionChanged(): void
}

interface TelegramWebApp {
  initData: string
  initDataUnsafe: any
  version: string
  platform: string

  ready(): void
  expand(): void
  close(): void

  HapticFeedback: TelegramHapticFeedback
}

interface Window {
  Telegram?: {
    WebApp: TelegramWebApp
  }
}
