interface TelegramWebApp {
  initData: string
  initDataUnsafe: Record<string, any>
  version: string
  platform: string
  colorScheme: 'light' | 'dark'

  ready(): void
  expand(): void
  close(): void

  MainButton: {
    text: string
    show(): void
    hide(): void
    onClick(fn: () => void): void
  }
}

interface Window {
  Telegram: {
    WebApp: TelegramWebApp
  }
}
