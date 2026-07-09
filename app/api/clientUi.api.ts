import type { ClientUiSetting, UpdateClientUiPayload } from '~/types/client-ui'

export function useClientUiApi() {
  const api = useApi()

  const getClientUi = () => {
    return api.request<ClientUiSetting>('/client-ui', {
      method: 'GET',
      auth: false,
    })
  }

  const updateClientUi = (payload: UpdateClientUiPayload) => {
    return api.request<ClientUiSetting>('/client-ui', {
      method: 'PATCH',
      body: payload,
    })
  }

  return {
    getClientUi,
    updateClientUi,
  }
}
