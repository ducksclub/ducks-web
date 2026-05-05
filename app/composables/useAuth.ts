export const useAuth = () => {
  const login = async (data: { identifier: string; password: string; remember: boolean }) => {
    console.log('Login request:', data)

    // TODO: API call
    return navigateTo('/events')
  }

  return { login }
}
