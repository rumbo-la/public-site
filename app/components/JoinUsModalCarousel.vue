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
  <div class="joinus-carousel__cards">
    <div ref="container" class="keen-slider">
      <div class="keen-slider__slide">
        <div class="joinus-carousel__card">
          <IconGroup class="text-primary" />
          <p><b>Acceso a comunidad Rumbo,</b> mentorías personalizadas, una amplía red de expertos, eventos y más.</p>
        </div>
      </div>
      <div class="keen-slider__slide">
        <div class="joinus-carousel__card">
          <IconSettingConfig class="text-primary" />
          <p><b>Compensación flexible,</b> configura tu remuneración ajustando salario y beneficios</p>
        </div>
      </div>
      <div class="keen-slider__slide">
        <div class="joinus-carousel__card">
          <IconMoneyHand class="text-primary" />
          <p>Recibe <b>bonos</b> por performance y referidos</p>
        </div>
      </div>
      <div class="keen-slider__slide">
        <div class="joinus-carousel__card">
          <IconMoneyBag class="text-primary" />
          <p><b>Salario competitivo +</b> planilla completa + EPS 100%</p>
        </div>
      </div>
      <div class="keen-slider__slide">
        <div class="joinus-carousel__card">
          <IconProjectOutlined class="text-primary" />
          <p><b>Retos ambiciosos</b> con proyectos locales e internacionales</p>
        </div>
      </div>
      <div class="keen-slider__slide">
        <div class="joinus-carousel__card">
          <IconClockHour class="text-primary" />
          <p>Modalidad y horarios de <b>trabajo flexibles</b></p>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <div v-if="slider" class="joinus-carousel__dots">
        <button
          v-for="(_slide, idx) in dotHelper"
          :key="idx"
          :class="{ dot: true, active: current === idx }"
          @click="slider.moveToIdx(idx)"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.joinus-carousel {
  &__cards{
    @apply w-full flex gap-7 overflow-hidden flex-col;
  }
  &__card {
    @apply flex flex-col gap-4 min-w-[175px];
    @apply py-5 px-4 bg-white text-black rounded-xl;
    p {
      @apply min-h-[70px];
      @apply text-sm;
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