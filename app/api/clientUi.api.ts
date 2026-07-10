import type {
  ClientUiRegistrationStatusResponse,
  ClientUiRegistrationsResponse,
  ClientUiSetting,
  ClientUiType,
  CreateClientUiRegistrationResponse,
  DeleteClientUiRegistrationResponse,
  UpdateClientUiPayload,
} from '~/types/client-ui'

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

  const getClientUiRegistrations = (type: ClientUiType) => {
    return api.request<ClientUiRegistrationsResponse>('/client-ui/registrations', {
      method: 'GET',
      query: { type },
    })
  }

  const getMyClientUiRegistration = (type: ClientUiType) => {
    return api.request<ClientUiRegistrationStatusResponse>('/client-ui/registrations/me', {
      method: 'GET',
      query: { type },
    })
  }

  const registerForClientUi = (type: ClientUiType) => {
    return api.request<CreateClientUiRegistrationResponse>('/client-ui/registrations', {
      method: 'POST',
      body: { type },
    })
  }

  const unregisterFromClientUi = (type: ClientUiType) => {
    return api.request<DeleteClientUiRegistrationResponse>('/client-ui/registrations', {
      method: 'DELETE',
      body: { type },
    })
  }

  return {
    getClientUi,
    updateClientUi,
    getClientUiRegistrations,
    getMyClientUiRegistration,
    registerForClientUi,
    unregisterFromClientUi,
  }
}
