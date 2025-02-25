<template>
  <div class="flex flex-col gap-4 2xl:gap-6">
    <div class="w-full">
      <UiSelect
        v-model="workScheme"
        label="Esquema de trabajo"
        placeholder="Selecciona una opción"
        :options="workSchemeOptions"
        :multiple="true"
        :limit="workSchemeOptions.length"
        :has-error="errorForm.workScheme && validarFormulario"
        hint="Campo obligatorio"
      >
        <template #label>
          Esquema de trabajo
        </template>
      </UiSelect>
    </div>
    <div class="w-full">
      <UiSelect
        v-model="workMode"
        :multiple="true"
        :options="workModeOptions"
        :limit="3"
        placeholder="Selecciona una opción"
        :has-error="errorForm.workMode && validarFormulario"
        hint="Campo obligatorio"
      >
        <template #label>
          Modalidad de trabajo <span class="text-[#666666]">(máx. 3 opciones)</span>
        </template>
      </UiSelect>
    </div>
    <div class="w-full">
      <UiSelect
        v-model="industryPreference"
        :multiple="true"
        :options="industriesOfExpertiseOptions"
        :limit="3"
        placeholder="Selecciona una opción"
        :has-error="errorForm.industryPreference && validarFormulario"
        hint="Campo obligatorio"
      >
        <template #label>
          Industria de preferencia <span class="text-[#666666]">(máx. 3 opciones)</span>
        </template>
      </UiSelect>
    </div>
    <div class="w-full">
      <label
        class="block text-base font-medium text-black mb-1"
      >
        Rango salarial
      </label>
      <div class="w-full">
        <UiRange
          :step="500"
          :min="1000"
          :max="30000"
          v-model:minValue="rangeMin"
          v-model:maxValue="rangeMax"
        ></UiRange>
      </div>
    </div>
    <div class="w-full">
      <UiSelect
        v-model="preferredBenefits"
        :multiple="true"
        :options="preferredBenefitsOptions"
        :limit="3"
        placeholder="Selecciona una opción"
        :has-error="errorForm.preferredBenefits && validarFormulario"
        hint="Campo obligatorio"
      >
        <template #label>
          Beneficios preferidos <span class="text-[#666666]">(máx. 3 opciones)</span>
        </template>
      </UiSelect>
    </div>
    <div class="w-full">
      <UiSelect
        v-model="learnAboutRumbo"
        label="¿Cómo te enteraste de Rumbo?"
        placeholder="Selecciona una opción"
        :options="learnAboutRumboOptions"
        :has-error="errorForm.learnAboutRumbo && validarFormulario"
        hint="Campo obligatorio"
      ></UiSelect>
    </div>
  </div>
  <div class="mt-10 lg:mt-20 justify-center flex">
    <UiButton
      @click="handleNextStep"
      class="!rounded-3xl !min-w-[188px] !bg-primary hover:!bg-[#2C23B9] !h-[50px]"
      color="primary"
      variant="fill"
    >
      <span class="text-lg">Finalizar registro</span>
    </UiButton>
  </div>
</template>
<script setup lang="ts">
import { rgxRequired } from "~/helpers/regex";
import { workSchemeOptions, workModeOptions, preferredBenefitsOptions, learnAboutRumboOptions, industriesOfExpertiseOptions } from '~/constants/joinus'
import type { SelectOption } from '~/types/ui/select';

const scriptURL = 'https://script.google.com/macros/s/AKfycbw3TBuFApzxgo1VcA-0SzlTitdKqTcF_52OKvyjPwQcFAFcL1B0r41-nSsZYp9YtGqiog/exec'

interface PayloadForm {
  NAME: string,
  SURNAME: string,
  EMAIL: string,
  PREFIX: string,
  MOBILE: string,
  COUNTRY: string,
  LINKEDIN: string,
  PRACTICE: string,
  ROLE: string,
  TECH: string,
  EXPERIENCE: string,
  INDUSTRY_EXPERIENCE: string,
  ENGLISH: string,
  WORKING_SCHEME: string,
  WORKING_MODE: string,
  INDUDSTRY_PREFERENCE: string,
  RANGE_MIN: string,
  RANGE_MAX: string,
  BENEFIT: string,
  HOW_RUMBO: string
}

const {
  step,
  firstName,
  lastName,
  email,
  prefixPhoneNumber,
  phoneNumber,
  country,
  linkedin,
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
  setStep
} = useJoin()

const loadingForm = ref<boolean>(false)
const validarFormulario = ref<boolean>(false)
const errorForm = computed(() => {
  const error = {
    workScheme: !rgxRequired(workScheme.value),
    workMode: !rgxRequired(workMode.value),
    industryPreference: !rgxRequired(industryPreference.value),
    preferredBenefits: !rgxRequired(preferredBenefits.value),
    learnAboutRumbo: !rgxRequired(learnAboutRumbo.value)
  }
  return {
    ...error,
    invalid: Object.values(error).some((value) => value === true)
  }
})

const handleNextStep = () => {
  if (loadingForm.value) return
  loadingForm.value = true
  validarFormulario.value = false

  if (errorForm.value.invalid) {
    validarFormulario.value = true
    return
  }

  const tech = specialtyParent.value.flatMap(parent => parent.children)
    .filter(child => child?.active === true).map(e => e?.label).join(',');

  const formObject: PayloadForm = {
    NAME: firstName.value,
    SURNAME: lastName.value,
    EMAIL: email.value,
    PREFIX: prefixPhoneNumber.value || '',
    MOBILE: phoneNumber.value || '',
    COUNTRY: country.value,
    LINKEDIN: linkedin.value,
    PRACTICE: digitalDiscipline.value,
    ROLE: specialty.value,
    TECH: tech,
    EXPERIENCE: yearsOfExperience.value,
    INDUSTRY_EXPERIENCE: industriesOfExpertise.value,
    ENGLISH: englishLevel.value,
    WORKING_SCHEME: workScheme.value,
    WORKING_MODE: workMode.value,
    INDUDSTRY_PREFERENCE: industryPreference.value,
    RANGE_MIN: `${rangeMin.value}`,
    RANGE_MAX: `${rangeMax.value}`,
    BENEFIT: preferredBenefits.value,
    HOW_RUMBO: learnAboutRumbo.value
  }
  const formData = new FormData();

  for (const key in formObject) {
    if (formObject.hasOwnProperty(key)) {
      // @ts-ignore
      formData.append(key, formObject[key as keyof PayloadForm]);
    }
  }

  fetch(scriptURL, {
    method: 'POST',
    body: formData,
    // redirect: 'follow', 
  })
  .then(response => {
    loadingForm.value = false
    setStep(4)
  })
  .catch(error => {
    loadingForm.value = false
    console.error('Error!', error.message)
  })

}

onMounted(() => {
})
</script>
<style lang="scss" scoped>
</style>