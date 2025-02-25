<script setup lang="ts">
import { CALENDLY_URL } from '~/constants/calendly';

const { t } = useI18n()

const currentIndex = ref<number>(0)
const modalities = computed<string[]>(() => {
  return [t('specialists_managers.title'), t('executive_search.title')]
})

const handleUpdateIndex = (newIndex: number) => {
  currentIndex.value = newIndex
}

</script>
<template>
  <section class="section-staffing-modalities">
    <div class="container">
      <div class="section">
        <div class="section-info">
          <h5>{{ $t('recruiting_models.different_recruiting_models_to_give_you') }} <span>{{ $t('recruiting_models.flexibility') }}</span> {{ $t('recruiting_models.and') }} <span>{{ $t('recruiting_models.control') }}</span></h5>
        </div>
        <div class="section-disciplines">
          <div class="section-tabs mb-[90px]">
            <button
              class="section-tab"
              v-for="(item, index) in modalities"
              :key="`DISCIPLINE_${index}`"
              :class="{
                active: currentIndex === index
              }"
              @click="handleUpdateIndex(index)"
            >
              {{ item }}
            </button>
          </div>
          <div class="flex flex-col gap-6 xl:px-[90px]">
            <div class="modality-card" v-show="currentIndex === 0">
              <div class="modality-card__info">
                <div class="flex flex-col gap-4 md:gap-6">
                  <h5>{{ $t('specialists_managers.title') }}</h5>
                  <p>{{ $t('specialists_managers.description') }}</p>
                  <ul>
                    <li>{{ $t('specialists_managers.feature1') }}</li>
                    <li>{{ $t('specialists_managers.feature2') }}</li>
                    <li>{{ $t('specialists_managers.feature3') }}</li>
                    <li>{{ $t('specialists_managers.feature4') }}</li>
                  </ul>
                </div>
                <div class="flex flex-row justify-start">
                  <NuxtLink :to="CALENDLY_URL" target="_blank" rel="noopener">{{ $t('button.lets_talk') }}</NuxtLink>
                </div>
              </div>
              <div class="modality-card__img">
                <img src="/images/recruiting/bg-specialists-managers.png" alt="Rumbo Specialists & Managers" />
              </div>
            </div>
            <div class="modality-card" v-show="currentIndex === 1">
              <div class="modality-card__info">
                <div class="flex flex-col gap-4 md:gap-6">
                  <h5>{{ $t('executive_search.title') }}</h5>
                  <p>{{ $t('executive_search.description') }}</p>
                  <ul>
                    <li>{{ $t('executive_search.feature1') }}</li>
                    <li>{{ $t('executive_search.feature2') }}</li>
                    <li>{{ $t('executive_search.feature3') }}</li>
                    <li>{{ $t('executive_search.feature4') }}</li>
                  </ul>
                </div>
                <div class="flex flex-row justify-start">
                  <NuxtLink :to="CALENDLY_URL" target="_blank" rel="noopener">{{ $t('button.lets_talk') }}</NuxtLink>
                </div>
              </div>
              <div class="modality-card__img">
                <img src="/images/recruiting/bg-executive-search.png" alt="Rumbo Executive Search" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.section-staffing-modalities {
  @apply flex py-12 bg-white w-full;
  @screen md {
    @apply py-[120px];
  }
  .section {
    &-info {
      @apply text-center w-full mx-auto mb-12;
      @screen lg {
        @apply mb-[90px];
      }
      h5{
        @apply font-dxgrafik text-black text-[20px] leading-[30px] mb-0 font-semibold;
        span {
          @apply text-primary;
        }
        @screen lg {
          @apply text-[34px] leading-[60px];
        }
      }
    }
    &-disciplines {
      @apply flex flex-col gap-0;
    }
    &-tabs {
      @apply hidden;
      @screen lg {
        @apply flex flex-row gap-[36px] justify-center;
      }
    }
    &-tab {
      @apply flex flex-row gap-2 items-center h-[74px] px-4;
      @apply text-black bg-[#FAF9FA] border-[3px] border-[#FAF9FA] text-[18px] leading-[25px] font-bold rounded-lg;
      &.active {
        @apply text-primary bg-white border-[3px] border-primary;
      }
      @screen md {
        @apply text-[24px] leading-[26px] px-6;
      }
    }
  }
  .modality-card {
    @apply py-8 px-6 bg-[#FAF9FA] rounded-2xl flex flex-col-reverse justify-between;
    @media (max-width: 767px) {
      display: flex !important;
    }
    @screen md {
      @apply gap-[60px] flex-row;
    }
    @screen xl {
      @apply p-12 gap-[100px] min-h-[565px];
    }
    &__info {
      @apply flex flex-col justify-between;
      h5 {
        @apply text-black text-[30px] leading-[33px] mb-0 font-semibold;
        @screen xl {
          @apply text-[48px] leading-[150%];
        }
      }
      p {
        @apply text-black text-[16px] leading-[23px] mb-0 font-normal;
        @screen xl {
          @apply text-[20px] leading-[150%];
        }
      }
      ul {
        @apply list-disc flex flex-col pl-6 gap-4;
        li {
          @apply text-black text-[16px] leading-[23px] mb-0 font-normal;
          @screen xl {
            @apply text-[20px] leading-[150%];
          }
        }
      }
      a {
        @apply text-primary bg-transparent border-0 ring-0 mt-9;
        @apply text-[16px] leading-[20px] font-bold;
        @screen xl {
          @apply text-[20px] leading-[150%] mt-0;
        }
      }
    }
    &__img {
      @apply w-[290px] h-[290px] min-w-[290px] mx-auto mb-9;
      @screen md {
        @apply w-[375px] h-[375px] min-w-[375px] mb-0;
      }
    }
  }
}
</style>