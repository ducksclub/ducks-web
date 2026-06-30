import type { User } from '~~/shared/types/user'

export type GetProfileResponse = User

export type UpdateProfilePayload = Partial<
  Pick<User, 'nickname' | 'phone' | 'avatarUrl'> & {
    avatarHash: string
  }
>

export type UpdateProfileResponse = User
