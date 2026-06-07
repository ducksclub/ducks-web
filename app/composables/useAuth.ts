export function useAuth() {
  const auth = useAuthStore()

  return {
    token: readonly(toRef(auth, 'token')),
    user: readonly(toRef(auth, 'user')),
    status: readonly(toRef(auth, 'status')),
    mode: readonly(toRef(auth, 'authMode')),
    error: readonly(toRef(auth, 'authError')),
    isLoadingUser: readonly(toRef(auth, 'isLoadingUser')),
    isAuthenticated: readonly(toRef(auth, 'isAuthenticated')),
    isAdmin: readonly(toRef(auth, 'isAdmin')),
    login: auth.login,
    loginViaTelegram: auth.loginViaTelegram,
    register: auth.register,
    updateProfile: auth.updateProfile,
    fetchMe: auth.fetchMe,
    initializeAuth: auth.initializeAuth,
    requireAuth: auth.requireAuth,
    logout: auth.logout,
    clearError: auth.clearAuthError,
  }
}
