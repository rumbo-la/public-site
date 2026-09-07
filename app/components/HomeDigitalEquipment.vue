<script setup lang="ts">


</script>
<template>
  <section class="section-digital-team">
    <div class="container xl:px-[90px]">
      <div class="section-title">
        <h3>{{ $t('home_digital_team.your') }} <span>{{ $t('home_digital_team.on_demand') }}</span> {{ $t('home_digital_team.digital_team') }}</h3>
        <p>{{ $t('home_digital_team.description') }}</p>
      </div>
      <div class="card">
        <div class="card-item">
          <div class="h-6 mb-6"><IconGem class="text-primary" /></div>
          <h4>{{ $t('home_digital_team.top_tier_digital_talent') }}</h4>
          <p>{{ $t('home_digital_team.top_tier_digital_talent_description') }}</p>
        </div>
        <div class="card-item">
          <div class="h-6 mb-6"><IconCrown class="text-primary" /></div>
          <h4>{{ $t('home_digital_team.led_by_practitioners') }}</h4>
          <p>{{ $t('home_digital_team.led_by_practitioners_description') }}</p>
        </div>
        <div class="card-item">
          <div class="h-6 mb-6"><IconShuffle class="text-primary" /></div>
          <h4>{{ $t('home_digital_team.flexible_by_design') }}</h4>
          <p>{{ $t('home_digital_team.flexible_by_design_description') }}</p>
        </div>
        <div class="card-item">
          <div class="h-6 mb-6"><IconTimeForward class="text-primary" /></div>
          <h4>{{ $t('home_digital_team.fast_affordable') }}</h4>
          <p>{{ $t('home_digital_team.fast_affordable_description') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.section-digital-team{
  @apply bg-white py-[60px] px-3;
  @screen lg {
    @apply pt-[120px] pb-[120px];
  }
  .section-title {
    @apply w-full mb-12 lg:mb-[90px];
    @screen lg {
      @apply w-[956px] mx-auto;
    }
    h3 {
      @apply text-[24px] leading-[36px] font-semibold text-black text-center mb-4;
      span{
        @apply text-primary;
      }
      @screen lg {
        @apply text-[34px] leading-[60px];
      }
    }
    p {
      @apply text-[16px] leading-[24px] font-normal text-black text-center;
      span{
        @apply text-primary;
      }
      @screen lg {
        @apply text-[20px] leading-[34px];
      }
    }
  }
  .card {
    @apply grid grid-cols-1 gap-6;
    @screen md {
      @apply grid grid-cols-2;
    }
    @screen lg {
      @apply grid grid-cols-2 gap-5;
    }
    &-item {
      @apply bg-[#FAF9FA] p-6 rounded-2xl text-black text-lg font-normal flex items-start flex-col;
      @screen lg {
        @apply px-12 pt-[60px] h-[315px];
      }
      h4 {
        @apply font-dxgrafik text-[20px] leading-[22px] lg:text-[30px] lg:leading-[33px] text-primary font-semibold;
        @apply mb-4;
      }
      p {
        @apply text-[16px] leading-[20px] lg:text-[20px] lg:leading-[32px] text-black font-normal;
      }
    }
  }
}
</style>