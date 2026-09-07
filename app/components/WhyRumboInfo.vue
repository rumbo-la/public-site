<script lang="ts" setup>
import { CALENDLY_URL } from '~/constants/calendly';
</script>
<template>
  <section id="home-info" class="home-info">
    <div class="section-staffing-flexible">
      <div class="container flex justify-between relative z-50 px-[30px] lg:px-3">
        <div class="w-full lg:w-[986px] mx-auto flex flex-col text-left md:text-center">
          <img class="w-[100px] h-[100px] mx-auto mb-12 hidden md:flex" src="/images/rumbo-icon-blue.svg" alt="Rumbo" >
          <h2 class="mb-4 lg:mb-8">{{ $t('why_rumbo.why_companies_choose_rumbo_to') }} <span>{{ $t('why_rumbo.build_digital_teams_on_demand') }}</span>{{ $t('why_rumbo.end') }}</h2>
          <p class="text-black text-base lg:text-[24px] lg:leading-[36px] font-normal mb-12 md:mb-[60px] lg:px-[73px]">{{ $t('why_rumbo.description') }}</p>
          <div class="flex w-full flex-row justify-center">
            <NuxtLink
              :to="CALENDLY_URL"
              target="_blank"
              rel="noopener"
              class="h-12 w-full md:w-[246px] bg-primary text-white text-base inline-flex items-center justify-center leading-[20px] font-bold !rounded-lg"
            >
              {{ $t('button.lets_talk') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.home-info {
  @apply w-full flex flex-col items-center relative md:h-screen overflow-x-hidden pt-[68px] lg:pt-[90px];
  .section {
    &-staffing-flexible {
      @apply w-full py-[60px] lg:py-0 flex items-center relative h-full;
      @apply flex justify-between;
      @apply bg-no-repeat;

      h2 {
        @apply font-dxgrafik font-semibold text-[24px] leading-[36px];
        span {
          @apply text-primary;
        }
        @screen lg {
          @apply font-semibold text-[56px] leading-[86px];
        }
      }
    }
  }
}
</style>