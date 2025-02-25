
<script setup lang="ts">
import { rgxAlphaNum, rgxNumeric, rgxMaxLength, rgxMinLength, rgxRequired, rgxEmail, rgxPassword } from "~/helpers/regex";
import { storeToRefs } from 'pinia'
import { productInterestOptions, digitalDisciplineOptions } from '~/constants/joinus'
import { countries } from '~/constants/countries'
import { useAppStore } from "~/store/appStore";
import { ContactOptionType } from '~/types/contact';

const scriptURL = 'https://script.google.com/macros/s/AKfycbw3TBuFApzxgo1VcA-0SzlTitdKqTcF_52OKvyjPwQcFAFcL1B0r41-nSsZYp9YtGqiog/exec'

interface PayloadForm {
  NAME: string,
  SURNAME: string,
  EMAIL: string,
  PREFIX: string,
  MOBILE: string,
  PRODUCT: string,
  DISCIPLINE: string,
  MESSAGE: string
}

const {
  firstName,
  lastName,
  email,
  prefixPhoneNumber,
  phoneNumber,
  productInterest,
  digitalDiscipline,
  message,
  acceptTerm,
  setContactOption
} = useContact()

const emit = defineEmits<{
  (e: 'click:legal-modal'): void
  (e: 'update:legal-modal'): void
  (e: 'click:legal-modal'): void
}>()

const appStore = useAppStore()
const { userCountry } = storeToRefs(appStore)

const loadingForm = ref<boolean>(false)
const validarFormulario = ref<boolean>(false)
const errorForm = computed(() => {
  const error = {
    firstName: !rgxRequired(firstName.value),
    lastName: !rgxRequired(lastName.value),
    email: !(rgxRequired(email.value) && rgxEmail(email.value)),
    phoneNumber: !(rgxRequired(phoneNumber.value)
      && rgxNumeric(phoneNumber.value || '')),
    message: !rgxRequired(message.value),
    productInterest: !rgxRequired(productInterest.value),
    digitalDiscipline: !rgxRequired(digitalDiscipline.value),
  }
  return {
    ...error,
    invalid: Object.values(error).some((value) => value === true)
  }
})

watch(userCountry, (newValue: string | null) => {
  if (newValue) {
    const country = countries.find(c => c.abbreviation === newValue)
    if (!prefixPhoneNumber.value && country) prefixPhoneNumber.value = country.code_phone
  }
}, { immediate: true })

const handleChangeTerm = () => {
  acceptTerm.value = !acceptTerm.value
}

const handleOpenLegalModal = () => {
  emit('click:legal-modal')
}

const handleSubmit = async (e: MouseEvent) => {
  e.preventDefault()
  if (loadingForm.value) return
  loadingForm.value = true
  validarFormulario.value = false

  if (!acceptTerm.value) {
    validarFormulario.value = true
    return
  }
  if (errorForm.value.invalid) {
    validarFormulario.value = true
    return
  }

  const formObject: PayloadForm = {
    NAME: firstName.value,
    SURNAME: lastName.value,
    EMAIL: email.value,
    PREFIX: prefixPhoneNumber.value || '',
    MOBILE: phoneNumber.value || '',
    PRODUCT: productInterest.value || '',
    DISCIPLINE: digitalDiscipline.value,
    MESSAGE: message.value
  }
  const formData = new FormData();

  for (const key in formObject) {
    if (formObject.hasOwnProperty(key)) {
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
    setContactOption(ContactOptionType.SUCCESS)
  })
  .catch(error => {
    loadingForm.value = false
    console.error('Error!', error.message)
  })
}

onMounted(() => {
  const country = countries.find(c => c.abbreviation === userCountry.value)
  if (!prefixPhoneNumber.value && country) prefixPhoneNumber.value = country.code_phone
})
</script>
<template>
  <form class="form-post" method="post" action="" name="contactForm">
    <div class="form-title mb-10">
      <h3>Contáctanos</h3>
      <p>Y nos estaremos comunicando contigo lo más pronto posible </p>
    </div>
    <div class="flex flex-col gap-4 2xl:gap-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 2xl:gap-6">
        <UiTextField
          v-model="firstName"
          :active="!!firstName"
          name="NAME"
          label="Nombre"
          :has-error="errorForm.firstName && validarFormulario"
          hint="Campo obligatorio"
        ></UiTextField>
        <UiTextField
          v-model="lastName"
          :active="!!lastName"
          name="SURNAME"
          label="Apellido"
          :has-error="errorForm.lastName && validarFormulario"
          hint="Campo obligatorio"
        ></UiTextField>
      </div>
      <div class="w-full">
        <UiTextField
          v-model="email"
          :active="!!email"
          name="EMAIL"
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
        ></UiPhoneField>
      </div>
      <div class="w-full">
        <UiSelect
          v-model="productInterest"
          :multiple="true"
          :options="productInterestOptions"
          :limit="productInterestOptions.length"
          placeholder="Selecciona una opción"
          :has-error="errorForm.productInterest && validarFormulario"
          hint="Campo obligatorio"
        >
          <template #label>
            Producto de interés
          </template>
        </UiSelect>
      </div>
      <div class="w-full">
        <UiSelect
          v-model="digitalDiscipline"
          :multiple="true"
          :options="digitalDisciplineOptions"
          :limit="digitalDisciplineOptions.length"
          placeholder="Selecciona una opción"
          :has-error="errorForm.digitalDiscipline && validarFormulario"
          hint="Campo obligatorio"
        >
          <template #label>
            Disciplina digital
          </template>
        </UiSelect>
      </div>
      <div class="w-full">
        <UiTextarea
          v-model="message"
          :active="!!message"
          name="MESSAGE"
          label="Mensaje"
          :has-error="errorForm.message && validarFormulario"
          hint="Campo obligatorio"
        >
        </UiTextarea>
      </div>
      <!-- <div class="w-full flex flex-col">
        <div class="w-full flex flex-col">
          <label for="message" class="block mb-2 text-base font-medium text-black">Mensaje</label>
          <textarea
            v-model="message"
            id="message"
            name="MESSAGE"
            rows="4"
            class="block p-2.5 w-full !text-base text-black bg-white rounded-lg border border-[#aaa] focus:outline-none"
            :class="{
              '!border-primary': message,
              'border-[#B42318]': errorForm.message && validarFormulario
            }"
            placeholder="Escribe un mensaje..."
            hint="Campo obligatorio"
          ></textarea>
        </div>
        <div
          v-if="errorForm.message && validarFormulario"
          class="relative w-full block mt-1 text-[#B42318] text-xs"
        >
          Campo obligatorio
        </div>
      </div> -->
      <div class="flex items-center">
        <input id="checked-checkbox" @change="handleChangeTerm" type="checkbox" value="true" class="w-[18px] h-[18px] text-primary bg-gray-100 border-black">
        <label
          for="checked-checkbox"
          class="ms-2 text-sm font-normal text-[#444]"
          :class="{
            'text-[#B42318]': !acceptTerm && validarFormulario
          }"
        >
          Acepto los <button class="bg-transparent underline text-black font-medium" 
          :class="{
            'text-[#B42318]': !acceptTerm && validarFormulario
          }"@click="handleOpenLegalModal">Términos, condiciones y política de privacidad y cookies</button>
        </label>
      </div>
    </div>
    <div class="mt-10 lg:mt-20 justify-center flex">
      <UiButton
        type="submit"
        @click="handleSubmit"
        class="!rounded-3xl !min-w-[130px] !bg-primary hover:!bg-[#2C23B9] !h-[50px]"
        color="primary"
        variant="fill"
        :loading="loadingForm"
      >
        <span class="text-lg">Enviar</span>
      </UiButton>
    </div>
  </form>
</template>
<style lang="scss" scoped>
.form-post {
  @apply w-full xl:w-[510px] lg:mx-auto;
}
.form-title {
  @apply px-3 lg:px-0;
  h3 {
    @apply text-[24px] leading-[28px] xl:text-[48px] xl:leading-[57px] text-black font-bold;
    @apply text-left ;
    @apply mb-4 lg:mb-6;
  }
  p {
    @apply text-[16px] leading-[24px] xl:text-[18px] xl:leading-[28px] text-paragraph font-normal;
    @apply text-left;
  }
}
</style>