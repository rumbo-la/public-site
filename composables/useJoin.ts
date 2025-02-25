import { storeToRefs } from 'pinia';
import { toggleBodyModal } from '~/helpers/modal';
import { useJoinStore } from '~/store/joinStore'

export const useJoin =  () => {
  const joinStore = useJoinStore();
  const {
    steps,
    step,
    approvedStep,
    firstName,
    lastName,
    email,
    prefixPhoneNumber,
    phoneNumber,
    country,
    linkedin,
    acceptTerm,
    digitalDiscipline,
    specialty,
    specialtyParent,
    yearsOfExperience,
    industriesOfExpertise,
    englishLevel,
    rangeMin,
    rangeMax,
    workScheme,
    workMode,
    industryPreference,
    preferredBenefits,
    learnAboutRumbo,
    joinUsModal
  } = storeToRefs(joinStore)

  const setJoinUsModal = (newValue: boolean) => {
    toggleBodyModal()
    joinStore.setJoinUsModal(newValue)
  }

  return {
    steps,
    step,
    approvedStep,
    firstName,
    lastName,
    email,
    prefixPhoneNumber,
    phoneNumber,
    country,
    linkedin,
    acceptTerm,
    digitalDiscipline,
    specialty,
    specialtyParent,
    yearsOfExperience,
    industriesOfExpertise,
    englishLevel,
    workScheme,
    workMode,
    rangeMin,
    rangeMax,
    industryPreference,
    preferredBenefits,
    learnAboutRumbo,
    joinUsModal,
    setStep: joinStore.setStep,
    setApprovedStep: joinStore.setApprovedStep,
    setJoinUsModal,
  }
}