<script setup lang="ts">
import { useKeenSlider } from 'keen-slider/vue.es'
import { ContactOptionType } from '~/types/contact';
import 'keen-slider/keen-slider.min.css'

const {
  contactOption,
  setContactModal,
  setContactOption
} = useContact()
const JoinUsStepFour = defineAsyncComponent(
    () => import('./JoinUsStepFour.vue'),
  );
const LegalModal = defineAsyncComponent(
    () => import('./PrivacyPolicyModal.vue'),
  );

const current = ref(0)
const [container, slider] = useKeenSlider({
  loop: true,
  rtl: true,
  initial: current.value,
  slideChanged: (s) => {
    current.value = s.track.details.rel
  },
  slides: {
    perView: 1,
    spacing: 0,
  },
});

const dotHelper = computed(() => {
  return slider.value ? [...Array(slider.value.track.details.slides.length).keys()] : []
})

const showLegalModal = ref<boolean>(false)

const handleOpenLegalModal = () => {
  showLegalModal.value = true
}

const handleCloseLegalModal = () => {
  showLegalModal.value = false
}

const handleCloseModal = () => {
  setContactModal(false)
  setContactOption(null)
}
</script>
<template>
  <div class="contact-modal">
    <UiButton
      @click="handleCloseModal"
      variant="text"
      color="primary"
      class="!w-6 !h-6 !max-h-6 absolute z-[125] top-2 right-3 md:top-5 md:right-5 text-black">
      <IconClose class="text-black" />
    </UiButton>
    <div class="bg-[#F2F2F7] rounded-full h-[62px] py-2 px-4 mb-4 container flex lg:hidden justify-between items-center ">
      <div class="flex flex-row items-center gap-1">
        <div class="w-[164px]">
          <img class="w-full" src="/logo-rumbo.svg" alt="Rumbo" />
        </div>
      </div>
    </div>
    <div class="fixed left-0 top-0 w-1/2 h-full bg-black hidden lg:block">
      <img
        class="absolute -bottom-[40px] z-[-1] lg:bottom-0 right-[0px] w-[320px] lg:w-[240px] lg:z-10"
        src="/images/curve-primary.svg"
        alt="Rumbo"
      />
    </div>
    <!-- <div class="px-3 flex flex-col lg:flex-row lg:items-center lg:min-h-full lg:px-0 xl:container"> -->
      <div class="contact__info">
        <div class="contact__info-container">
          <div class="contact__info-header">
            <h2 class="contact__info-title">Una solución de<br /><span>staffing diferente</span></h2>
            <p class="contact__info-subtitle">Arma un equipo desde cero, amplía tu equipo actual o cubre una brecha de expertise.</p>
          </div>
          <div class="contact__info-cards">
            <div class="contact__info-card">
              <IconGroupPersons class="text-primary max-h-10" />
              <div class="flex flex-col gap-4">
                <p class="card-title">Flexibilidad total</p>
                <p class="card-desc">Ajusta tus equipos a demanda con modelos de engagement flexibles.</p>
              </div>
            </div>
            <div class="contact__info-card">
              <IconHandStar class="text-primary max-h-10" />
              <div class="flex flex-col gap-4">
              <p class="card-title">Calidad única</p>
              <p class="card-desc">Proceso de evaluación único potenciado por tecnología y comunidad.</p>
              </div>
            </div>
            <div class="contact__info-card">
              <IconFastClock class="text-primary max-h-10" />
              <div class="flex flex-col gap-4">
                <p class="card-title">Los más rápidos del mercado</p>
                <p class="card-desc">Propuesta personalizada con talento validado en 72 horas.</p>
              </div>
            </div>
            <div class="contact__info-card">
              <IconMedal class="text-primary max-h-10" />
              <div class="flex flex-col gap-4">
                <p class="card-title">Acompañamiento de practitioner</p>
                <p class="card-desc">Profesionales con experiencia práctica en cada especialidad digital.</p>
              </div>
            </div>
          </div>
          <div class="contact__info-mobile">
            <ContactModalCarousel />
          </div>
        </div>
      </div>
      <div
        class="contact__form"
        :class="{
          'contact-defualt': contactOption === null
        }"
      >
        <ContactDefault v-if="!contactOption"></ContactDefault>
        <ContactForm v-if="contactOption === ContactOptionType.CONTACT" @click:legal-modal="handleOpenLegalModal"></ContactForm>
        <ContactSchedule v-if="contactOption === ContactOptionType.SCHEDULE"></ContactSchedule>
        <ContactSuccess v-if="contactOption === ContactOptionType.SUCCESS"></ContactSuccess>
        <LegalModal v-if="showLegalModal" @click:legal-modal="handleCloseLegalModal" />
      </div>
    <!-- </div> -->
  </div>
</template>
<style lang="scss" scoped>
.contact-modal {
  @apply fixed top-0 left-0 w-full h-full z-[120] overflow-y-auto px-4 pt-10 pb-0 bg-white;
  @screen lg {
    @apply overflow-hidden px-0 pt-0 pb-0 overflow-y-auto;
  }
  .contact {
    // @apply absolute top-0 left-0 w-full h-full ;
    &__info {
      @apply w-full bg-black flex relative justify-center gap-[28px] rounded-xl py-6;
      @apply px-4;
      @screen lg {
        @apply w-1/2  absolute top-0 left-0 h-full rounded-none py-0 pl-0 bg-transparent pt-[120px];
        //
      }
      @screen xl {
        @apply pr-8 ;
        // absolute top-0 left-0
      }
      @screen xl {
        @apply pr-8;
      }
      &-container {
        @apply w-full flex flex-col gap-[28px];
        @screen lg {
          @apply w-[629px] gap-[34px];
        }
      }
      &-header{ 
        @apply flex flex-col w-full gap-0 px-4;
        @screen lg {
          @apply px-0
        }
        @screen 2xl {
          @apply gap-6;
        }
      }
      &-title {
        @apply font-dxgrafik text-2xl leading-[28px] text-white mb-6 font-semibold;
        span {
          @apply px-2 rounded-lg bg-primary;
        }
        @screen xl {
          @apply text-[40px] leading-[60px];
        }
      }
      &-subtitle {
        @apply text-lg font-normal text-white;
        b {
          @apply font-semibold;
        }
      }
      &-cards{
        @apply w-full hidden gap-6 overflow-hidden;
        @screen md {
          @apply pb-10;
        }
        @screen lg {
          @apply grid grid-cols-2 gap-6 overflow-visible;
        }
      }
      &-card {
        @apply flex flex-col gap-4 min-w-[285px];
        @apply py-6 px-8 bg-white text-black rounded-xl;
        @screen lg {
          @apply w-full min-w-min min-h-[260px] pt-[30px];
        }
        @screen xl {
          @apply min-h-[304px] pt-[41px];
        }
        .card-title {
          @apply text-[16px] leading-[22px] xl:text-[24px] xl:leading-[32px] text-black font-bold;
        }
        .card-desc {
          @apply text-[14px] leading-[21px] xl:text-[18px] xl:leading-[27px] text-paragraph font-normal;
        }
        &-icon {
          @apply w-12 h-12;
        }
      }
      &-mobile {
        @apply flex lg:hidden;
      }
    }
    &__form {
      @apply w-full flex flex-col;
      @apply px-0 py-[40px];
      @screen lg {
        @apply w-1/2 absolute top-0 right-0 overflow-y-auto overflow-x-hidden bg-white;
        // 
      }
      &.contact-defualt {
        @apply  h-full;
      }
      @screen lg {
        @apply px-[42px] py-[60px] justify-center;
      }
      @screen 2xl {
        @apply py-[90px];
      }
      &.form-step4 {
        @apply flex items-center pt-0 pb-20 flex-row mt-12 relative;
        @screen lg {
          @apply mt-0 pb-0 absolute;
        }
      }
      &-steps {
        @apply flex gap-6 justify-center mb-[40px];
        @screen 2xl {
          @apply mb-[80px];
        }
      }
      &-title {
        @apply flex mb-10 flex-col gap-4;
        @screen 2xl {
          @apply mb-[50px];
        }
        h2 {
          @apply font-semibold text-[32px] leading-[38px] text-black;
        }
        p {
          @apply text-lg font-normal text-[#666666];
        }
      }
      &-forms {

      }
    }
  }
}
</style>