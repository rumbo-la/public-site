<script lang="ts" setup>
import { CALENDLY_URL } from '~/constants/calendly';

const { rumboServices } = useRumboService()

const recruitingServices = computed(() => rumboServices[1]!)

</script>
<template>
  <section class="section-staff-augmentation">
    <div class="section">
      <div class="container flex justify-between flex-col lg:flex-row-reverse items-center relative z-50 px-[24px] lg:px-0">
        <div class="section-img">
          <img src="/images/recruiting/bg-recruiting.webp" >
        </div>
        <div class="section-info">
          <h2 class="section-title">{{ recruitingServices.title }}</h2>
          <p class="section-subtitle">{{ recruitingServices.description }}</p>
          <ul class="list-disc">
            <li
              v-for="(feature, index) in recruitingServices.features"
              :key="`CARD_SERVICE_FEATURE_${index}`"
              class=""
            >
            {{ feature }}</li>
          </ul>
          <div class="flex flex-row items-center w-full">
            <div class="flex w-full lg:w-auto xl:flex-1">
              <NuxtLink
                :to="CALENDLY_URL"
                target="_blank"
                rel="noopener"
                class="h-12 w-full md:w-[246px] bg-primary text-white text-base inline-flex items-center justify-center leading-[20px] font-bold rounded-lg"
              >
                {{ $t('button.lets_talk') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.section-staff-augmentation {
  @apply w-full flex flex-col items-center relative pt-[70px] lg:pt-[89px] overflow-x-hidden;
  .section {
    @apply w-full py-[60px] lg:py-[90px] lg:px-[90px] flex items-center relative h-full;
    @apply flex justify-between;
    @apply bg-no-repeat;
    &-info {
      @apply w-full flex flex-col;
      @screen lg {
        @apply w-[520px];
      }
      @screen xl {
        @apply w-[616px];
      }
    }
    &-img {
      @apply w-full h-auto mx-auto mb-10;
      @screen md {
        @apply w-[600px] m-0;
      }
      @screen xl {
        @apply w-[800px];
      }
    }
    &-title {
      @apply font-dxgrafik font-semibold text-[30px] leading-[33px] mb-4;
      @screen lg {
        @apply text-[56px] leading-[86px] mb-6;
      }
    }

    &-subtitle {
      @apply font-normal text-[16px] leading-[23px] text-black mb-4;
      @screen lg {
        @apply text-[20px] leading-[150%] mb-6;
      }
    }
    ul {
      @apply flex flex-col gap-4 mb-[64px] pl-6;
      @screen md {
        @apply gap-4 mb-[60px];
      }
      li {
        @apply text-[14px] leading-[17px] font-normal;
        @screen lg {
          @apply text-[20px] leading-[150%];
        }
      }
    }
  }
}
</style>