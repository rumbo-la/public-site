import { toggleBodyModal } from '~/helpers/modal'
import type { SelectOption } from '~/types/ui/select'

interface Step {
  title: string
  approved: boolean
}

interface JoinState {
  joinUsModal: boolean
  steps: Step[]
  step: number
  approvedStep: number
  firstName: string
  lastName: string
  email: string
  prefixPhoneNumber: string | null
  phoneNumber: string | null
  country: string
  linkedin: string
  acceptTerm: boolean
  digitalDiscipline: string
  specialty: string
  specialtyParent: SelectOption[]
  yearsOfExperience: string
  industriesOfExpertise: string
  englishLevel: string
  workScheme: string
  workMode: string
  industryPreference: string
  preferredBenefits: string
  learnAboutRumbo: string
  rangeMin: number
  rangeMax: number
}

const initialSteps = (): Step[] => [
  { title: 'Datos personales', approved: false },
  { title: 'Experiencia laboral', approved: false },
  { title: 'Preferencias', approved: false },
]

const initialState = (): JoinState => ({
  joinUsModal: false,
  steps: initialSteps(),
  step: 1,
  approvedStep: 0,
  firstName: '',
  lastName: '',
  email: '',
  prefixPhoneNumber: '',
  phoneNumber: '',
  country: '',
  linkedin: '',
  acceptTerm: false,
  digitalDiscipline: '',
  specialty: '',
  specialtyParent: [],
  yearsOfExperience: '',
  industriesOfExpertise: '',
  englishLevel: '',
  workScheme: '',
  workMode: '',
  industryPreference: '',
  preferredBenefits: '',
  learnAboutRumbo: '',
  rangeMin: 1000,
  rangeMax: 21000,
})

export const useJoin = () => {
  const state = useState<JoinState>('join', initialState)
  const refs = toRefs(state.value)

  const setStep = (newStep: number) => {
    refs.step.value = newStep
  }

  /** Marks the step at `index` (0-based) as completed. */
  const setApprovedStep = (index: number) => {
    const target = refs.steps.value[index]
    if (target) target.approved = true
  }

  const resetSteps = () => {
    refs.steps.value = initialSteps()
    refs.step.value = 1
  }

  const setJoinUsModal = (isShow: boolean) => {
    toggleBodyModal()
    refs.joinUsModal.value = isShow
  }

  return {
    ...refs,
    setStep,
    setApprovedStep,
    resetSteps,
    setJoinUsModal,
  }
}
