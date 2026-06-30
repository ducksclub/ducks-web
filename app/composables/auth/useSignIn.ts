import type { AxiosError } from 'axios'
import { signInSchema, type SignInSchema } from '~/validation/auth.validation'

export const useSignIn = () => {
  const notify = useNotify()
  const telegram = useTelegramWebApp()
  const { signIn, signInWithTelegram } = useAuthSession()
  const { errors, validate } = useZodValidation<SignInSchema>(signInSchema)

  const pending = ref<boolean>(false)
  const isTelegramAuthAvailable = ref(false)
  const formData = ref<SignInSchema>({
    email: '',
    password: '',
    remember: false,
  })

  const submit = async () => {
    if (!validate(formData.value)) return

    pending.value = true

    try {
      await signIn({ email: formData.value.email, password: formData.value.password })
      await navigateTo('/')
    } catch (e) {
      const axiosError = e as AxiosError<ApiErrorResponse>
      const errorMessage = axiosError.response?.data?.error?.message || 'Неверный email или пароль'
      notify.error(errorMessage)
    } finally {
      pending.value = false
    }
  }

  const submitTelegram = async () => {
    const initData = telegram.getInitData()

    if (!initData) {
      notify.error('Вход через Telegram доступен только внутри Telegram Mini App')
      return
    }

    pending.value = true

    try {
      await signInWithTelegram({ initData })
      await navigateTo('/')
    } catch (e) {
      const axiosError = e as AxiosError<ApiErrorResponse>
      const errorMessage =
        axiosError.response?.data?.error?.message || 'Не удалось войти через Telegram'
      notify.error(errorMessage)
    } finally {
      pending.value = false
    }
  }

  onMounted(() => {
    isTelegramAuthAvailable.value = telegram.hasInitData()
  })

  return {
    errors,
    pending,
    formData,
    isTelegramAuthAvailable,
    submit,
    submitTelegram,
  }
}
