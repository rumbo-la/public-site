import { storeToRefs } from 'pinia';
import { useContactStore } from '~/store/contactStore'
import { toggleBodyModal } from '~/helpers/modal'

export const useContact =  () => {
  const contactStore = useContactStore();
  const {
    contactModal,
    contactOption,
    firstName,
    lastName,
    email,
    prefixPhoneNumber,
    phoneNumber,
    productInterest,
    digitalDiscipline,
    message,
    acceptTerm,
  } = storeToRefs(contactStore)

  const setContactModal = (newValue: boolean) => {
    toggleBodyModal()
    contactStore.setContactModal(newValue)
  }

  return {
    contactModal,
    contactOption,
    firstName,
    lastName,
    email,
    prefixPhoneNumber,
    phoneNumber,
    productInterest,
    digitalDiscipline,
    message,
    acceptTerm,
    setContactModal,
    setContactOption: contactStore.setContactOption,
  }
}