export const ContentType = {
  FAQ: 'faq',
  RULES: 'rules',
  ABOUT: 'about',
  POKER_LEVELS: 'poker-levels',
} as const

export type ContentType = (typeof ContentType)[keyof typeof ContentType]

export type Content = {
  id: string
  key: ContentType
  title: string
  body: string
  updatedAt: string
  createdAt: string
}

export type GetContentByIdParams = {
  id: string
}

export type GetContentByIdResponse = Content

export type GetContentsParams = {
  key: ContentType
}

export type GetContentsResponse = Content[]

export type UpdateContentParams = {
  id: string
}

export type UpdateContentPayload = Pick<Content, 'key' | 'title' | 'body'>

export type UpdateContentResponse = {}
