<script setup lang="ts">

// const JoinUsStepOne = defineAsyncComponent(
//     () => import('./JoinUsStepOne.vue'),
//   );
const JoinUsStepTwo = defineAsyncComponent(
    () => import('./JoinUsStepTwo.vue'),
  );
const JoinUsStepThree = defineAsyncComponent(
    () => import('./JoinUsStepThree.vue'),
  );
const JoinUsStepFour = defineAsyncComponent(
    () => import('./JoinUsStepFour.vue'),
  );
const LegalModal = defineAsyncComponent(
    () => import('./PrivacyPolicyModal.vue'),
  );

const {
  steps,
  step,
  setStep,
  setApprovedStep,
  setJoinUsModal
} = useJoin()

const showLegalModal = ref<boolean>(false)

const subtitle = computed(() => {
  if (step.value === 1) return 'Completa tus datos personales'
  if (step.value === 2) return 'Completa la siguiente información sobre tu experiencia laboral'
  return 'Completa la siguiente información sobre tus preferencias'
})

const handleOpenLegalModal = () => {
  showLegalModal.value = true
}

const handleCloseLegalModal = () => {
  showLegalModal.value = false
}

const handleCloseModal = () => {
  setJoinUsModal(false)
  setStep(1)
  setApprovedStep(0)
}
</script>
<template>
  <div class="joinus-modal">
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
    <div class="fixed left-0 top-0 w-1/2 h-full bg-black hidden lg:block z-[15]">
        <img
          class="absolute -bottom-[40px] z-[-1] lg:bottom-0 right-[0px] w-[320px] lg:w-[240px] lg:z-10"
          src="/images/curve-primary.svg"
          alt="Rumbo"
        />
    </div>
    <!-- <div class="px-3 flex flex-col lg:flex-row lg:items-center lg:min-h-full lg:px-0 xl:container"> -->
      <div class="joinus__info">
        <div class="joinus__info-container">
          <div class="joinus__info-header">
            <h2 class="joinus__info-title">Únete a <span>Rumbo</span> y conoce lo que tenemos para ti</h2>
            <p class="joinus__info-subtitle">Sé parte de la comunidad Rumbo en sólo <b>3 minutos</b></p>
          </div>
          <div class="joinus__info-cards">
            <div class="joinus__info-card">
              <IconGroup class="text-primary" />
              <p><b>Acceso a comunidad Rumbo,</b> mentorías personalizadas, una amplía red de expertos, eventos y más.</p>
            </div>
            <div class="joinus__info-card">
              <IconSettingConfig class="text-primary" />
              <p><b>Compensación flexible,</b> configura tu remuneración ajustando salario y beneficios</p>
            </div>
            <div class="joinus__info-card">
              <IconMoneyHand class="text-primary" />
              <p>Recibe <b>bonos</b> por performance y referidos</p>
            </div>
            <div class="joinus__info-card">
              <IconMoneyBag class="text-primary" />
              <p><b>Salario competitivo +</b> planilla completa + EPS 100%</p>
            </div>
            <div class="joinus__info-card">
              <IconProjectOutlined class="text-primary" />
              <p><b>Retos ambiciosos</b> con proyectos locales e internacionales</p>
            </div>
            <div class="joinus__info-card">
              <IconClockHour class="text-primary" />
              <p>Modalidad y horarios de <b>trabajo flexibles</b></p>
            </div>
          </div>
          <div class="joinus__info-mobile">
            <JoinUsModalCarousel />
          </div>
        </div>
      </div>
      <div
        class="joinus__form"
        :class="{
          'form-step4': step === 4
        }"
      >
        <JoinUsStepFour v-if="step === 4"></JoinUsStepFour>
        <template v-if="step !== 4">
          <div class="joinus__form-steps">
            <JoinUsStep
              v-for="(item, index) in steps"
              :title="item.title"
              :approved="item.approved"
              :step="index + 1"
            ></JoinUsStep>
          </div>
          <div class="joinus__form-container">
            <div class="joinus__form-title">
              <h2>Queremos conocerte </h2>
              <p>{{ subtitle }}</p>
            </div>
            <div class="joinus__form-forms">
              <JoinUsStepOne v-if="step === 1" @click:legal-modal="handleOpenLegalModal"></JoinUsStepOne>
              <JoinUsStepTwo v-if="step === 2"></JoinUsStepTwo>
              <JoinUsStepThree v-if="step === 3"></JoinUsStepThree>
            </div>
          </div>
        </template>
        <img
          v-if="step === 4"
          class="absolute -bottom-[60px] z-[-1] lg:bottom-8 -left-[140px] w-[420px] lg:w-[911px] lg:z-10"
          src="/images/arror-right.png"
          alt="Rumbo"
        />
        <LegalModal v-if="showLegalModal" @click:legal-modal="handleCloseLegalModal" />
      </div>
    <!-- </div> -->
  </div>
</template>
<style lang="scss" scoped>
.joinus-modal {
  @apply fixed flex flex-col top-0 left-0 w-full h-full z-[120] overflow-y-auto px-4 pt-10 pb-0 bg-white;
  @screen lg {
    @apply overflow-hidden flex-row px-0 pt-0 pb-0 overflow-y-auto;
  }
  .joinus {
    // @apply absolute top-0 left-0 w-full h-full ;
    &__info {
      @apply w-full bg-black relative justify-center gap-[28px] rounded-xl py-6 z-[16];
      @apply px-4;
      @screen lg {
        @apply w-1/2 relative h-full flex-1 rounded-none py-0 pl-0 bg-transparent pt-[120px];
        //  
      }
      @screen xl {
        // @apply gap-[86px];
        // @apply pr-[50px];
      }
      @screen 2xl {
        // @apply gap-[96px];
        // @apply pr-[50px];
      }
      &-container {
        @apply w-full flex flex-col gap-[28px] relative z-[15];
        @screen lg {
          @apply gap-[50px] mx-auto;
        }
        @screen xl {
          @apply w-[594px] gap-[70px] mx-auto;
        }
        @screen 2xl {
          @apply w-[620px] gap-[96px];
        }
      }
      &-header{ 
        @apply flex flex-col w-full gap-0 px-4;
        @screen lg {
          @apply px-0;
        }
        @screen xl {
        }
        @screen 2xl {
          @apply gap-6;
        }
      }
      &-title {
        @apply font-dxgrafik text-2xl leading-[28px] text-white mb-6;
        span {
          @apply px-2 rounded-lg bg-primary;
        }
        @screen xl {
          @apply text-[40px] leading-[48px];
        }
      }
      &-subtitle {
        @apply text-lg font-normal text-white;
        b {
          @apply font-semibold;
        }
      }
      &-cards{
        @apply w-full flex gap-4 hidden overflow-hidden;
        @screen lg {
          @apply grid grid-cols-2 gap-6;
        }
      }
      &-card {
        @apply flex flex-col gap-4 min-w-[285px];
        @apply py-6 px-4 bg-white text-black rounded-xl;
        @screen lg {
          @apply w-full min-w-min;
        }
        p {
          @apply min-h-[70px];
          @apply text-sm;
          @screen xl {
            @apply text-lg;
            @apply min-h-[81px];
          }
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
      @apply w-full  flex flex-col;
      @apply px-0 py-[40px];
      @screen lg {
        @apply w-1/2 relative flex-1 h-full bg-white z-[10];
        // 
      }
      @screen lg {
        @apply py-[60px];
      }
      @screen 2xl {
        @apply py-[90px];
      }
      &.form-step4 {
        @apply flex items-center pt-0 pb-20 flex-row mt-12 relative;
        @screen lg {
          // @apply mt-0 pb-0 absolute;
        }
      }
      &-container {
        @apply w-full flex flex-col;
        @screen lg {
          @apply w-[510px] mx-auto;
        }
      }
      &-steps {
        @apply flex gap-6 justify-center mb-[40px];
        @screen 2xl {
          @apply mb-[80px];
        }
      }
      &-title {
        @apply  flex mb-10 flex-col gap-4;
        @screen 2xl {
          @apply mb-[50px];
        }
        h2 {
          @apply font-dxgrafik font-semibold text-[32px] leading-[38px] text-black;
        }
        p {
          @apply text-lg font-normal text-[#666666];
        }
      }
      &-forms {
        @apply lg:pb-[60px];
      }
    }
  }
}
</style>