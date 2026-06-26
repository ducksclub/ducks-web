import type { AuthUser } from '~/features/auth/auth.types'

export type ProfileResponse = AuthUser

export type UpdateProfilePayload = {
  phone?: string
  nickname?: string
  avatarUrl?: string
  avatarHash?: string
}
