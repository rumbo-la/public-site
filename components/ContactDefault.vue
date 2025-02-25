<script lang="ts" setup>
import { ContactOptionType } from '~/types/contact';

const {
  contactOption,
  setContactOption
} = useContact()

const handleContactForm = () => {
  setContactOption(ContactOptionType.CONTACT)
}

const handleContactSchedule = () => {
  setContactOption(ContactOptionType.SCHEDULE)
}
const getWhatsappSendMessageUrl = ({ phone, message }: { phone?: string, message?: string}): string => {
  let whatsappSendMessageUrl = 'https://api.whatsapp.com/send'

  if (phone) {
    whatsappSendMessageUrl += `?phone=${phone}`
  }

  if (message) {
    whatsappSendMessageUrl += whatsappSendMessageUrl.includes('?') ? `&text=${message}` : `?text=${message}`
  }

  return whatsappSendMessageUrl
}
</script>
<template>
  <div class="flex flex-col gap-4 2xl:gap-6">
    <div class="joinus__form-title mb-10">
      <h3 >Selecciona una opción</h3>
      <p>Para una comunicación personalizada</p>
    </div>  
    <div class="flex flex-col gap-6 lg:gap-10 w-full lg:w-[420px] mx-auto">
      <UiButton variant="outlined" color="primary" class="!rounded-lg !h-[50px] !text-lg !font-normal" @click="handleContactForm">
        Contáctanos 
      </UiButton>
      <UiButton variant="outlined" color="primary" class="!rounded-lg !h-[50px] !text-lg !font-normal" @click="handleContactSchedule">
        Agendar una llamada 
      </UiButton>
      <a
        :href="getWhatsappSendMessageUrl({ phone: '51939940669', message: 'Hola, tengo interés en los productos de Rumbo. ¿Me podrían dar más información?'})"
        target="_blank"
        class="rounded-lg text-primary border border-primary h-[50px] flex items-center justify-center text-lg font-normal"
      >
        Escríbenos por whatsApp 
      </a>
    </div>
  </div>
</template>
<style lang="scss" scoped>
h3 {
  @apply text-[24px] leading-[28px] lg:text-[48px] lg:leading-[57px] text-black font-bold font-dxgrafik;
  @apply text-left lg:text-center;
  @apply mb-4 lg:mb-6;
}
p {
  @apply text-[16px] leading-[24px] lg:text-[18px] lg:leading-[28px] text-paragraph font-normal;
  @apply text-left lg:text-center;
}
</style>