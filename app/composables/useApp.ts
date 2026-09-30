import { countries } from '~/constants/countries'

interface AppState {
  userCountry: string
}

export const useApp = () => {
  const state = useState<AppState>('app', () => ({ userCountry: '' }))
  const { userCountry } = toRefs(state.value)

  const codePhoneCountry = computed(
    () => countries.find((c) => c.abbreviation === userCountry.value)?.code_phone || '',
  )

  const setUserCountry = (value: string) => {
    userCountry.value = value
  }

  return { userCountry, codePhoneCountry, setUserCountry }
}
