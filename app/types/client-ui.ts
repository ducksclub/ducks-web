export const ClientUiTypes = {
  POKER: 'ПОКЕР',
  DEALER: 'ДИЛЕР',
  FLOOR: 'ФЛОР',
  ADMINISTRATOR: 'АДМИНИСТРАТОР',
  MANAGER: 'УПРАВЛЯЮЩИЙ',
} as const

export type ClientUiType = (typeof ClientUiTypes)[keyof typeof ClientUiTypes]

export type ClientUiSetting = {
  type: ClientUiType
}

export type UpdateClientUiPayload = ClientUiSetting

export type ClientUiRegistrationUser = {
  id: string
  nickname: string
  avatarUrl: string | null
}

export type ClientUiRegistration = {
  id: string
  type: ClientUiType
  createdAt: string
  user: ClientUiRegistrationUser
}

export type ClientUiRegistrationsResponse = {
  type: ClientUiType
  registrations: ClientUiRegistration[]
}

export type ClientUiRegistrationStatusResponse = {
  type: ClientUiType
  registration: ClientUiRegistration | null
}

export type CreateClientUiRegistrationResponse = {
  registration: ClientUiRegistration
  registrations: ClientUiRegistration[]
}

export type DeleteClientUiRegistrationResponse = {
  registration: null
  registrations: ClientUiRegistration[]
}
