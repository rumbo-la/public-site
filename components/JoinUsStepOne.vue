<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { rgxAlphaNum, rgxNumeric, rgxMaxLength, rgxLinkedin, rgxRequired, rgxEmail, rgxPassword } from "~/helpers/regex";
import { countryOfResidenceOptions } from '~/constants/joinus'
import { countries } from '~/constants/countries'
import { useAppStore } from "~/store/appStore";

const {
  step,
  firstName,
  lastName,
  email,
  prefixPhoneNumber,
  phoneNumber,
  country,
  linkedin,
  acceptTerm,
  setStep,
  setApprovedStep
} = useJoin()

const appStore = useAppStore()
const { userCountry, codePhoneCountry } = storeToRefs(appStore)

const validarFormulario = ref<boolean>(false)
const errorForm = computed(() => {
  const error = {
    firstName: !rgxRequired(firstName.value),
    lastName: !rgxRequired(lastName.value),
    email: !(rgxRequired(email.value) && rgxEmail(email.value)),
    linkedin: !(rgxRequired(linkedin.value) && rgxLinkedin(linkedin.value)),
    country: !rgxRequired(country.value),
    phoneNumber: !(rgxRequired(phoneNumber.value)
    && rgxNumeric(phoneNumber.value || '')),
  }
  return {
    ...error,
    invalid: Object.values(error).some((value) => value === true)
  }
})

const countryOptions = computed(() => {
  return countries.map((e) => {
    return {
      label: e.name,
      value: e.name,
    }
  })
})

const emit = defineEmits<{
  (e: 'click:legal-modal'): void
}>()

const handleChangeTerm = () => {
  acceptTerm.value = !acceptTerm.value
}

const handleOpenLegalModal = () => {
  emit('click:legal-modal')
}

const handleNextStep = () => {
  validarFormulario.value = false

  if (!acceptTerm.value) {
    validarFormulario.value = true
    return
  }
  if (errorForm.value.invalid) {
    validarFormulario.value = true
    return
  }

  setStep(2)
  setApprovedStep(0)
}

const handleInputPhoneNumber = (event: any) => {
  phoneNumber.value = event.target.value.replace(/[^0-9]/g, '');
}

onMounted(async () => {
  await nextTick();
  // setTimeout(() => {
    // const country = countries.find(c => c.abbreviation === userCountry.value)
    console.log(country)
    if (!prefixPhoneNumber.value && country) prefixPhoneNumber.value = codePhoneCountry.value
  // }, 500)
})
</script>
<template>
  <div class="flex flex-col gap-4 2xl:gap-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 2xl:gap-6">
      <UiTextField
        v-model="firstName"
        :active="!!firstName"
        label="Nombre"
        :has-error="errorForm.firstName && validarFormulario"
        hint="Campo obligatorio"
      ></UiTextField>
      <UiTextField
        v-model="lastName"
        :active="!!lastName"
        label="Apellido"
        :has-error="errorForm.lastName && validarFormulario"
        hint="Campo obligatorio"
      ></UiTextField>
    </div>
    <div class="w-full">
      <UiTextField
        v-model="email"
        :active="!!email"
        label="Correo electrónico"
        :has-error="errorForm.email && validarFormulario"
        :hint="!email ? 'Campo obligatorio' : 'Por favor, ingrese un correo electrónico válido.'"
      ></UiTextField>
    </div>
    <div class="w-full">
      <UiPhoneField
        v-model:prefix="prefixPhoneNumber"
        v-model:phone-number="phoneNumber"
        :active="!!phoneNumber"
        label="Celular"
        placeholder=""
        name="MOBILE"
        :has-error="errorForm.phoneNumber && validarFormulario"
        hint="Campo obligatorio"
        @input="handleInputPhoneNumber"
      ></UiPhoneField>
    </div>
    <!-- <div class="w-full">
      <UiTextField
        v-model="phoneNumber"
        :active="!!phoneNumber"
        placeholder="Ejem: +51 999999999"
        :has-error="errorForm.phoneNumber && validarFormulario"
        hint="Campo obligatorio"
      >
        <template #label>
          Celular
        </template>
      </UiTextField>
    </div> -->
    <div class="w-full">
      <UiSelect
        v-model="country"
        label="País de residencia"
        placeholdcer="Selecciona una opción"
        :options="countryOptions"
        :has-error="errorForm.country && validarFormulario"
        hint="Campo obligatorio"
      ></UiSelect>
    </div>
    <div class="w-full">
      <UiTextField
        v-model="linkedin"
        :active="!!linkedin"
        label="Linkedin"
        placeholder="www.linkedin.com/in/usuario"
        :has-error="errorForm.linkedin && validarFormulario"
        :hint="!linkedin ? 'Campo obligatorio' : 'Por favor, ingrese una dirección válida.'"
      >
        <template #prepend>
          <span>https://</span>
        </template>
      </UiTextField>
    </div>
    <div class="flex items-center">
      <input id="checked-checkbox" @change="handleChangeTerm" type="checkbox" value="true" class="w-[18px] h-[18px] text-primary bg-gray-100 border-black">
      <label
        for="checked-checkbox"
        class="ms-2 text-sm font-normal text-[#444]"
        :class="{
          'text-[#B42318]': !acceptTerm && validarFormulario
        }"
      >
        Acepto los <button
          class="bg-transparent underline text-black font-medium"
          @click="handleOpenLegalModal"
          :class="{
            'text-[#B42318]': !acceptTerm && validarFormulario
          }"
        >Términos, condiciones y política de privacidad y cookies</button>
      </label>
    </div>
  </div>
  <div class="mt-10 lg:mt-20 justify-center flex">
    <UiButton @click="handleNextStep" class="!rounded-3xl !min-w-[130px] !bg-primary hover:!bg-[#2C23B9] !h-[50px]" color="primary" variant="fill">
      <span class="text-lg">Continuar</span>
    </UiButton>
  </div>
</template>
<style lang="scss" scoped>
</style>