import { toggleBodyModal } from '~/helpers/modal'
import type { ContactOptionType } from '~/types/contact'

interface ContactState {
  contactModal: boolean
  contactOption: ContactOptionType | null
  firstName: string
  lastName: string
  email: string
  prefixPhoneNumber: string | null
  phoneNumber: string | null
  productInterest: string
  digitalDiscipline: string
  message: string
  acceptTerm: boolean
}

const initialState = (): ContactState => ({
  contactModal: false,
  contactOption: null,
  firstName: '',
  lastName: '',
  email: '',
  prefixPhoneNumber: '',
  phoneNumber: '',
  productInterest: '',
  digitalDiscipline: '',
  message: '',
  acceptTerm: false,
})

export const useContact = () => {
  const state = useState<ContactState>('contact', initialState)
  const refs = toRefs(state.value)

  const setContactModal = (isShow: boolean) => {
    toggleBodyModal()
    refs.contactModal.value = isShow
  }

  const setContactOption = (option: ContactOptionType | null) => {
    refs.contactOption.value = option
  }

  return {
    ...refs,
    setContactModal,
    setContactOption,
  }
}
