<script setup lang="ts">
import { CALENDLY_URL } from '~/constants/calendly';

</script>
<template>
  <section class="section-different-staffing">
    <div class="container">
      <div class="section-title">
        <h3>{{ $t('home_start_managing.start_managing_your_digital_teams') }} <span>{{ $t('home_start_managing.with_flexibility') }}</span></h3>
        <p><span>{{ $t('home_start_managing.description') }}</span><span class="hidden md:inline-block">{{ $t('home_start_managing.description_desktop') }}</span></p>
      </div>
      <div class="w-full text-center mt-6 lg:mt-12">
        <NuxtLink
          :to="CALENDLY_URL"
          target="_blank"
          rel="noopener"
          class="h-12 w-full md:w-[246px] bg-primary text-white text-base inline-flex items-center justify-center leading-[20px] font-bold !rounded-lg"
        >
          {{ $t('button.schedule_a_call') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.section-different-staffing{
  @apply bg-[#FAF9FA] py-[24px] px-[6px];
  @screen lg {
    @apply py-[60px];
  }
  .section-title {
    @apply w-full;
    @screen lg {
      @apply w-[952px] mx-auto;
    }
    h3 {
      @apply font-dxgrafik text-[24px] leading-[36px] font-semibold text-black text-center mb-4;
      span{
        @apply text-primary;
      }
      @screen lg {
        @apply text-[34px] leading-[60px];
      }
    }
    p {
      @apply text-[16px] leading-[24px] font-normal text-black text-center;
      @screen lg {
        @apply text-[20px] leading-[34px] text-[#808080];
      }
    }
  }
}
</style>