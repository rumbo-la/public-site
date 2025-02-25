<script setup lang="ts">
const {
  firstName,
  lastName,
  email,
  phoneNumber,
  message,
  acceptTerm,
} = useContact()

const emit = defineEmits<{
  (e: 'click:legal-modal'): void
}>()

const calendlyUrl = 'https://calendly.com/hola-rumbo/reunion-de-entendimiento?primary_color=382edc';
const calendlyContainer = ref(null);

const handleChangeTerm = () => {
  acceptTerm.value = !acceptTerm.value
}

const handleOpenLegalModal = () => {
  emit('click:legal-modal')
}

const handleSubmit = () => {
  console.log('ewq')
}
onMounted(() => {
  // Cargar el script de Calendly dinámicamente cuando el componente esté montado
  const script = document.createElement('script');
  script.src = 'https://assets.calendly.com/assets/external/widget.js';
  script.async = true;
  
  // Añadir el script al documento
  document.body.appendChild(script);
});
</script>
<template>
  <div>
    <div class="form-title mb-0">
      <h3>Agenda una reunión</h3>
    </div>
    <div class="flex flex-col gap-4 2xl:gap-6">
      <!-- Principio del widget integrado de Calendly -->
      <div class="calendly-inline-widget h-[1200px] lg:h-[1080px]" ref="calendlyContainer" :data-url="calendlyUrl" style="min-width:320px;"></div>

      <!-- <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script> -->
      <!-- Final del widget integrado de Calendly -->
    </div>
  </div>
</template>
<style lang="scss" scoped>
.form-title {
  h3 {
    @apply font-dxgrafik text-[24px] leading-[28px] xl:text-[48px] xl:leading-[57px] text-black font-bold;
    @apply text-left;
    @apply mb-4 lg:mb-6;
  }
  p {
    @apply text-[16px] leading-[24px] xl:text-[18px] xl:leading-[28px] text-paragraph font-normal;
    @apply text-left;
  }
}
</style>