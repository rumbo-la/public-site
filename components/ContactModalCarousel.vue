<script lang="ts" setup>
import { useKeenSlider } from 'keen-slider/vue.es'
import 'keen-slider/keen-slider.min.css'
const current = ref(0)
const [container, slider] = useKeenSlider({
  loop: false,
  rtl: false,
  initial: current.value,
  breakpoints: {
    '(min-width: 610px)': {
      slides: { perView: 1, spacing: 12 },
    },
    '(min-width: 768px)': {
      slides: { perView: 2, spacing: 12 },
    },
    '(min-width: 992px)': {
      slides: { perView: 3, spacing: 12 },
    },
  },
  slideChanged: (s) => {
    current.value = s.track.details.rel
  },
  slides: {
    perView: 1,
    spacing: 12,
  },
});

const dotHelper = computed(() => {
  return slider.value ? [...Array(slider.value.track.details.maxIdx + 1).keys()] : []
})
</script>
<template>
  <div class=" contact-carousel__cards">
    <div ref="container" class="keen-slider">
      <div class="keen-slider__slide">
        <div class="contact-carousel__card">
          <IconGroupPersons class="text-primary max-h-10" />
          <div class="flex flex-col gap-4">
            <p class="card-title">Flexibilidad total</p>
            <p class="card-desc">Ajusta tus equipos a demanda con modelos de engagement flexibles.</p>
          </div>
        </div>
      </div>
      <div class="keen-slider__slide">
        <div class="contact-carousel__card">
          <IconHandStar class="text-primary max-h-10" />
          <div class="flex flex-col gap-4">
          <p class="card-title">Calidad única</p>
          <p class="card-desc">Proceso de evaluación único potenciado por tecnología y comunidad.</p>
          </div>
        </div>
      </div>
      <div class="keen-slider__slide">
        <div class="contact-carousel__card">
          <IconFastClock class="text-primary max-h-10" />
          <div class="flex flex-col gap-4">
            <p class="card-title">Los más rápidos del mercado</p>
            <p class="card-desc">Propuesta personalizada con talento validado en 72 horas.</p>
          </div>
        </div>
      </div>
      <div class="keen-slider__slide">
        <div class="contact-carousel__card">
          <IconMedal class="text-primary max-h-10" />
          <div class="flex flex-col gap-4">
            <p class="card-title">Acompañamiento de practitioner</p>
            <p class="card-desc">Profesionales con experiencia práctica en cada especialidad digital.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">

      <div v-if="slider" class="contact-carousel__dots">
        <button
          v-for="(_slide, idx) in dotHelper"
          @click="slider.moveToIdx(idx)"
          :class="{ dot: true, active: current === idx }"
          :key="idx"
        ></button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.contact-carousel {
  &__cards{
    @apply w-full flex gap-7 overflow-hidden flex-col;
  }
  &__card {
    @apply flex flex-col gap-4 min-w-[285px] min-h-[228px];
    @apply pt-6 px-8 bg-white text-black rounded-xl;
    .card-title {
      @apply text-[16px] leading-[22px] lg:text-[24px] lg:leading-[32px] text-black font-bold;
    }
    .card-desc {
      @apply text-[14px] leading-[21px] lg:text-[18px] lg:leading-[27px] text-paragraph font-normal;
    }
    &-icon {
      @apply w-12 h-12;
    }
  }
  &__dots {
    @apply flex gap-2 items-center;
    button {
      @apply h-[5px] w-5 bg-[#C7C7CC] rounded-2xl;
      &.active {
        @apply w-10 bg-primary;
      }
    }
  }
}
</style>