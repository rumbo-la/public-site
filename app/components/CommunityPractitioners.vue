<script lang="ts" setup>
import { useKeenSlider } from 'keen-slider/vue.es'
import 'keen-slider/keen-slider.min.css'
import { experts } from '~/constants/experts'

const current = ref(0)
const [container, slider] = useKeenSlider({
  loop: true,
  mode: "free",
  rtl: false,
  initial: current.value,
  breakpoints: {
    '(min-width: 610px)': {
      slides: { perView: 2, spacing: 5 },
    },
    '(min-width: 768px)': {
      slides: { perView: 2, spacing: 5 },
    },
    '(min-width: 992px)': {
      slides: { perView: 2, spacing: 24 },
    },
    '(min-width: 1024px)': {
      slides: { perView: 3, spacing: 24 },
    },
    '(min-width: 1280px)': {
      slides: { perView: 4, spacing: 24 },
    },
  },
  slideChanged: (s) => {
    current.value = s.track.details.rel
  },
  slides: {
    perView: 1,
    spacing: 0,
  },
});

const handlePrevSlide = () => {
  slider.value?.prev()
}

const handleNextSlide = () => {
  slider.value?.next()
}
</script>
<template>
  <section class="section-experts">
    <div class="container">
      <div class="section">
        <div class="section-info">
          <h5>{{ $t('experienced_practitioners.a_community_of') }} <span>{{ $t('experienced_practitioners.experienced_practitioners') }}</span> {{ $t('experienced_practitioners.from') }} <span>{{ $t('experienced_practitioners.top_companies') }}</span></h5>
        </div>
        <div class="section-cards">
          <div  class="slider">
            <div ref="container" class="keen-slider">
              <div v-for="(item, index) in experts" :key="`EXPERT_${index}`" class="keen-slider__slide">
                <div class="slider__wrapper">
                  <div class="slider__img">
                    <img :src="`/images/community/experts/${item.profile}.webp`" :alt="`Rumbo ${item.name} ${item.lastName}`" >
                  </div>
                  <div class="slider__info">
                    <p class="p-name">{{ `${item.name} ${item.lastName}` }}</p>
                    <p class="p-position">{{ item.role }}</p>
                    <div class="slider__logos">
                      <div v-for="(logo, indexLogo) in item.logos" :key="`EXPERT_${index}_LOGO_${indexLogo}`" class="slider__logos-item">
                        <img :src="`/images/community/experts/${logo}.svg`" alt="Rumbo">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="slider__actions">
            <!-- <div v-if="slider" class="slider__dots">
              <button
                v-for="(_slide, idx) in dotHelper"
                @click="slider.moveToIdx(idx)"
                :class="{ dot: true, active: current === idx }"
                :key="idx"
              ></button>
            </div> -->
            <div v-if="slider" class="flex justify-between lg:justify-center gap-6">
                <!-- :class="{
                  'text-primary': current > 0,
                  'text-paragraph cursor-not-allowed': current === 0
                }" -->
              <button
                class="slider__control text-black"
                :disabled="current === 0"
                aria-label="Next experts"
                @click="handlePrevSlide"
              ><IconChevronCircleLeft2 class="w-[54px] h-[54px]" /></button>
              <button
                class="slider__control"
                :disabled="current === slider.track.details.maxIdx"
                aria-label="Previous experts"
                @click="handleNextSlide"
              ><IconChevronCircleRight2 class="w-[54px] h-[54px]" /></button>
              <!-- :class="{
                  'text-primary': current < slider.track.details.maxIdx,
                  'text-paragraph cursor-not-allowed': current === slider.track.details.maxIdx
                }" -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.section-experts {
  @apply w-full flex flex-col items-center relative overflow-x-hidden py-[60px];
  @apply bg-white;
  @screen lg {
    @apply py-20;
  }
  .section {
    @apply flex flex-col items-center;
    &-info {
      @apply font-dxgrafik text-[24px] leading-[36px] font-semibold text-center text-black;
      @apply w-full mx-auto mb-12;
      span {
        @apply text-primary;
      }
      @screen lg {
        @apply text-[34px] leading-[60px] w-[750px] mx-auto mb-[90px];
      }
    }
    &-cards {
      @apply flex flex-col mx-auto gap-[48px] w-full;
      @screen sm {
        @apply w-full;
      }
      @screen 2xl {
        @apply w-[1296px];
      }
      .slider {
        @apply flex relative flex-row justify-between items-center w-full;
        &__img {
          @apply w-full h-auto  mb-6 mx-auto;
          img {
            @apply max-w-full h-full mx-auto;
          }
        }
        &__info {
          @apply w-full text-left;
          .p-name {
            @apply text-black text-[28px] leading-[36px] font-medium mb-1;
            letter-spacing: -0.24px;
          }
          .p-position {
            @apply text-black text-[16px] leading-[24px] font-normal mb-4;
            letter-spacing: -0.24px;
          }
        }
        &__logos {
          @apply h-[24px] flex items-center justify-start gap-3;
          &-item {
            @apply max-h-6;
            img {
              @apply max-h-6;
            }
          }
        }
        &__actions {
          @apply flex justify-center w-full;
        }
        &__dots{
          @apply flex gap-2 items-center;
          button {
            @apply h-[5px] w-5 bg-[#C7C7CC] rounded-2xl;
            &.active {
              @apply w-10 bg-primary;
            }
          }
        }
        &__control {
          @apply w-14 h-14 flex ;
        }
      }
      .card {
        @apply flex flex-col w-full max-w-[345px] mx-auto;
        @screen lg {
          @apply gap-8 w-[336px];
        }
      }
    }
  }
}
</style>