interface TelegramHapticFeedback {
  impactOccurred(style: 'light' | 'medium' | 'heavy'): void
  notificationOccurred(type: 'success' | 'error' | 'warning'): void
  selectionChanged(): void
}

interface TelegramWebApp {
  initData: string
  initDataUnsafe: {
    start_param?: string
    startParam?: string
  } & Record<string, unknown>
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
