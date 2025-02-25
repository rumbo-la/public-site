import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { SelectOption } from '~/types/ui/select';

interface Step {
  title: string
  approved: boolean
}

export const useJoinStore = defineStore('joinStore', () => {
  const joinUsModal = ref<boolean>(false)
  const steps = ref<Step[]>([
    { title: 'Datos personales', approved: false },
    { title: 'Experiencia laboral', approved: false },
    { title: 'Preferencias', approved: false }
  ])
  const step = ref<number>(1)
  const approvedStep = ref<number>(0)
  const firstName = ref<string>('')
  const lastName = ref<string>('')
  const email = ref<string>('')
  const prefixPhoneNumber = ref<string | null>('')
  const phoneNumber = ref<string | null>('')
  const country = ref<string>('')
  const linkedin = ref<string>('')
  const acceptTerm = ref<boolean>(false)
  const digitalDiscipline = ref<string>('')
  const specialty = ref<string>('')
  const specialtyParent = ref<SelectOption[]>([])
  const yearsOfExperience = ref<string>('')
  const industriesOfExpertise = ref<string>('')
  const englishLevel = ref<string>('')
  const workScheme = ref<string>('')
  const workMode = ref<string>('')
  const industryPreference = ref<string>('')
  const preferredBenefits = ref<string>('')
  const learnAboutRumbo = ref<string>('')
  const rangeMin = ref<number>(1000)
  const rangeMax = ref<number>(21000)

  const setStep = (newStep: number) => {
    step.value = newStep;
  };

  const setApprovedStep = (newStep: number) => {
    // approvedStep.value = newStep;
    steps.value[newStep].approved = true
  };

  const setJoinUsModal = (isShow: boolean) => {
    joinUsModal.value = isShow;
  };

  return {
    steps,
    step,
    approvedStep,
    joinUsModal,
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
    setJoinUsModal,
    setStep,
    setApprovedStep,
  };
});