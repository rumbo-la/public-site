
<script setup lang="ts">
import { rgxNumeric, rgxRequired, rgxEmail } from "~/helpers/regex";
import { productInterestOptions, digitalDisciplineOptions } from '~/constants/joinus'
import { countries } from '~/constants/countries'
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

const { userCountry } = useApp()

const loadingForm = ref<boolean>(false)
const submitError = ref<boolean>(false)
const honeypot = ref<string>('')
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

  if (!acceptTerm.value || errorForm.value.invalid) {
    validarFormulario.value = true
    loadingForm.value = false
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

  Object.entries(formObject).forEach(([key, value]) => formData.append(key, value))

  submitError.value = false
  if (honeypot.value) {
    // Looks like a bot: pretend it worked and drop the payload.
    loadingForm.value = false
    setContactOption(ContactOptionType.SUCCESS)
    return
  }
  try {
    const response = await fetch(scriptURL, { method: 'POST', body: formData })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    setContactOption(ContactOptionType.SUCCESS)
  } catch (error) {
    submitError.value = true
    console.error('Contact form submit failed', error)
  } finally {
    loadingForm.value = false
  }
}

onMounted(() => {
  const country = countries.find(c => c.abbreviation === userCountry.value)
  if (!prefixPhoneNumber.value && country) prefixPhoneNumber.value = country.code_phone
})
</script>
<template>
  <form class="form-post" method="post" action="" name="contactForm">
    <!-- Honeypot: hidden from people, bots tend to fill it. -->
    <input v-model="honeypot" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" class="absolute -left-[9999px] h-0 w-0 opacity-0" >
    <div class="form-title mb-10">
      <h3>{{ $t('contact.form.title') }}</h3>
      <p>{{ $t('contact.form.subtitle') }}</p>
    </div>
    <div class="flex flex-col gap-4 2xl:gap-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 2xl:gap-6">
        <UiTextField
          v-model="firstName"
          :active="!!firstName"
          name="NAME"
          :label="$t('contact.form.first_name')"
          :has-error="errorForm.firstName && validarFormulario"
          :hint="$t('contact.form.required')"
        />
        <UiTextField
          v-model="lastName"
          :active="!!lastName"
          name="SURNAME"
          :label="$t('contact.form.last_name')"
          :has-error="errorForm.lastName && validarFormulario"
          :hint="$t('contact.form.required')"
        />
      </div>
      <div class="w-full">
        <UiTextField
          v-model="email"
          :active="!!email"
          name="EMAIL"
          :label="$t('contact.form.email')"
          :has-error="errorForm.email && validarFormulario"
          :hint="!email ? $t('contact.form.required') : $t('contact.form.invalid_email')"
        />
      </div>
      <div class="w-full">
        <UiPhoneField
          v-model:prefix="prefixPhoneNumber"
          v-model:phone-number="phoneNumber"
          :active="!!phoneNumber"
          :label="$t('contact.form.phone')"
          placeholder=""
          name="MOBILE"
          :has-error="errorForm.phoneNumber && validarFormulario"
          :hint="$t('contact.form.required')"
        />
      </div>
      <div class="w-full">
        <UiSelect
          v-model="productInterest"
          :multiple="true"
          :options="productInterestOptions"
          :limit="productInterestOptions.length"
          :placeholder="$t('contact.form.select_option')"
          :has-error="errorForm.productInterest && validarFormulario"
          :hint="$t('contact.form.required')"
        >
          <template #label>
            {{ $t('contact.form.product_interest') }}
          </template>
        </UiSelect>
      </div>
      <div class="w-full">
        <UiSelect
          v-model="digitalDiscipline"
          :multiple="true"
          :options="digitalDisciplineOptions"
          :limit="digitalDisciplineOptions.length"
          :placeholder="$t('contact.form.select_option')"
          :has-error="errorForm.digitalDiscipline && validarFormulario"
          :hint="$t('contact.form.required')"
        >
          <template #label>
            {{ $t('contact.form.digital_discipline') }}
          </template>
        </UiSelect>
      </div>
      <div class="w-full">
        <UiTextarea
          v-model="message"
          :active="!!message"
          name="MESSAGE"
          :label="$t('contact.form.message')"
          :has-error="errorForm.message && validarFormulario"
          :hint="$t('contact.form.required')"
        />
      </div>
      <div class="flex items-center">
        <input id="checked-checkbox" type="checkbox" value="true" class="w-[18px] h-[18px] text-primary bg-gray-100 border-black" @change="handleChangeTerm">
        <label
          for="checked-checkbox"
          class="ms-2 text-sm font-normal text-[#444]"
          :class="{
            'text-[#B42318]': !acceptTerm && validarFormulario
          }"
        >
          {{ $t('contact.form.accept_terms') }} <button
type="button" class="bg-transparent underline text-black font-medium"
          :class="{
            'text-[#B42318]': !acceptTerm && validarFormulario
          }" @click="handleOpenLegalModal">{{ $t('contact.form.terms_link') }}</button>
        </label>
      </div>
    </div>
    <div class="mt-10 lg:mt-20 justify-center flex">
      <UiButton
        type="submit"
        class="!rounded-3xl !min-w-[130px] !bg-primary hover:!bg-[#2C23B9] !h-[50px]"
        color="primary"
        variant="fill"
        :loading="loadingForm"
        @click="handleSubmit"
      >
        <span class="text-lg">{{ $t('contact.form.submit') }}</span>
      </UiButton>
    </div>
    <p v-if="submitError" class="mt-4 text-center text-sm text-[#B42318]">
      {{ $t('contact.form.submit_error') }}
    </p>
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