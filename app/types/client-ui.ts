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
