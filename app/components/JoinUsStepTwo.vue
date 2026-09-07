<template>
  <div class="flex flex-col gap-4 2xl:gap-6">
    <div class="w-full">
      <UiSelect
        v-model="digitalDiscipline"
        label="Disciplina digital"
        placeholder="Selecciona una opción"
        :options="digitalDisciplineOptions"
        :has-error="errorForm.digitalDiscipline && validarFormulario"
        hint="Campo obligatorio"
        @update:model-value="handleSelectDigitalDiscipline"
      />
    </div>
    <div class="w-full">
      <UiSelect
        ref="refSpecialty"
        v-model="specialty"
        :multiple="true"
        :options="specialtyOptions"
        :disabled="!digitalDiscipline"
        :limit="3"
        placeholder="Selecciona una opción"
        :has-error="errorForm.specialty && validarFormulario"
        hint="Campo obligatorio"
        @update:model-value="handleUpdateSpecialty"
      >
        <template #label>
          Especialidad <span class="text-[#666666]">(máx. 3 opciones)</span>
        </template>
      </UiSelect>
    </div>
    <div v-if="specialty && digitalDiscipline === 'Engineering'" class="flex flex-col px-[10px]">
      <p class="text-base font-normal text-black mb-2">Manejo de framework, lenguaje o plataforma</p>
      <div class="flex flex-col gap-4 px-4">
        <div
          v-for="(item, index) in selectedSpecialty"
          :key="`SELECTED_SPECIALTY_${index}`"
          class="flex flex-col gap-2"
        >
          <p class="text-base font-bold text-black">{{ item.label }}</p>
          <div class="flex gap-2 flex-wrap">
            <div
              v-for="(child, indexChild) in item.children"
              :key="`SELECTED_SPECIALTY_${index}_CHILDREN_${indexChild}_${keySpecialty}`"
              class="border border-primary text-primary px-2 py-1 text-base font-normal rounded-3xl hover:cursor-pointer"
              :class="{
                'bg-primary text-white': child.active,
                'bg-white text-primary': !child.active
              }"
              @click="child.active = !child.active"
            >
              {{ child.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full">
      <UiSelect
        v-model="yearsOfExperience"
        label="Años de experiencia"
        placeholder="Selecciona una opción"
        :options="yearsOfExperienceOptions"
        :has-error="errorForm.yearsOfExperience && validarFormulario"
        hint="Campo obligatorio"
      />
    </div>
    <div class="w-full">
      <UiSelect
        v-model="industriesOfExpertise"
        :multiple="true"
        :options="industriesOfExpertiseOptions"
        :limit="3"
        placeholder="Selecciona una opción"
        :has-error="errorForm.industriesOfExpertise && validarFormulario"
        hint="Campo obligatorio"
      >
        <template #label>
          Industrias de experiencia <span class="text-[#666666]">(máx. 3 opciones)</span>
        </template>
      </UiSelect>
    </div>
    <div class="w-full flex flex-col gap-4">
      <p class="text-base font-normal text-black">Nivel de inglés</p>
      <div class="flex gap-[14px]">
        <div
          v-for="(lvl, lvlIndex) in englishLevels"
          :key="`RADIO_BUTTON_ENGLISH_LEVEL_${lvlIndex}`"
          class="flex items-center cursor-pointer gap-3"
          @click="englishLevel = lvl"
        >
          <div
            class="w-6 h-6 flex justify-center items-center border-2 rounded-full border-gray-400"
            :class="{
              'bg-primary !border-primary ': englishLevel === lvl && !(errorForm.englishLevel && validarFormulario),
              ' !border-[#B42318] ': errorForm.englishLevel && validarFormulario
            }"
          >
            <svg
              v-if="englishLevel === lvl"
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="6" />
            </svg>
          </div>
          <span class="text-base font-normal text-black">{{ lvl }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-10 lg:mt-20 justify-center flex">
    <UiButton class="!rounded-3xl !min-w-[130px] !bg-primary hover:!bg-[#2C23B9] !h-[50px]" color="primary" variant="fill" @click="handleNextStep">
      <span class="text-lg">Continuar</span>
    </UiButton>
  </div>
</template>
<script setup lang="ts">
import { rgxRequired } from "~/helpers/regex";
import { digitalDisciplineOptions, yearsOfExperienceOptions, industriesOfExpertiseOptions } from '~/constants/joinus'
import type { SelectOption } from '~/types/ui/select';

const {
  digitalDiscipline,
  specialty,
  specialtyParent,
  yearsOfExperience,
  industriesOfExpertise,
  englishLevel,
  setStep,
  setApprovedStep
} = useJoin()
const specialtyOptions = ref<SelectOption[]>([])
const selectedSpecialty = ref<SelectOption[]>([])
const refSpecialty = ref()
const keySpecialty = ref<number>(0)
const englishLevels = ['Nativo', 'Avanzado', 'Intermedio', 'Básico']

// const handleChangeTerm = () => {
//   acceptTerm.value = !acceptTerm.value
// }

const validarFormulario = ref<boolean>(false)
const errorForm = computed(() => {
  const error = {
    digitalDiscipline: !rgxRequired(digitalDiscipline.value),
    specialty: !rgxRequired(specialty.value),
    specialtyParent: specialtyParent.value.length === 0,
    yearsOfExperience: !rgxRequired(yearsOfExperience.value),
    industriesOfExpertise: !rgxRequired(industriesOfExpertise.value),
    englishLevel: !rgxRequired(englishLevel.value)
  }
  return {
    ...error,
    invalid: Object.values(error).some((value) => value === true)
  }
})

const handleSelectDigitalDiscipline = (value: string) => {
  specialty.value = ''
  refSpecialty.value?.clearSelected()
  const specialtyList = digitalDisciplineOptions.find(e => e.value === value)?.specialty || []
  specialtyOptions.value = JSON.parse(JSON.stringify(specialtyList))
}

const handleUpdateSpecialty = (value: string) => {
  const specialtyArr = value.split(', ')
  if (specialtyArr.length) {
    selectedSpecialty.value = specialtyOptions.value.filter(e => specialtyArr.includes(e.label))
    specialtyParent.value = selectedSpecialty.value
    keySpecialty.value += 1
  }
}

const handleNextStep = () => {
  specialtyParent.value = selectedSpecialty.value

  validarFormulario.value = false

  if (errorForm.value.invalid) {
    validarFormulario.value = true
    return
  }

  setStep(3)
  setApprovedStep(1)
}

onMounted(() => {
  if (specialtyParent.value.length) selectedSpecialty.value = specialtyParent.value
})
</script>
<style lang="scss" scoped>
</style>