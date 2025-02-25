import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ContactOptionType } from '~/types/contact';

export const useContactStore = defineStore('contactStore', () => {
  const contactModal = ref<boolean>(false)
  const contactOption = ref<ContactOptionType | null>(null)
  const firstName = ref<string>('')
  const lastName = ref<string>('')
  const email = ref<string>('')
  const prefixPhoneNumber = ref<string | null>('')
  const phoneNumber = ref<string | null>('')
  const productInterest = ref<string>('')
  const digitalDiscipline = ref<string>('')
  const message = ref<string>('')
  const acceptTerm = ref<boolean>(false)

  const setContactModal = (isShow: boolean) => {
    contactModal.value = isShow;
  };

  const setContactOption = (newContactOption: ContactOptionType | null) => {
    contactOption.value = newContactOption;
  };

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
    setContactOption,
    setContactModal,
  };
});