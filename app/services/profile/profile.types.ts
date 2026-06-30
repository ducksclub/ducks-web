import type { User } from '~/types/user.types'

export type GetProfileResponse = User

export type UpdateProfilePayload = Partial<
  Pick<User, 'nickname' | 'phone' | 'avatarUrl'> & {
    avatarHash: string
  }
>
export type UpdateProfileResponse = User
