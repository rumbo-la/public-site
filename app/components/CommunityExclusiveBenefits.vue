<script setup lang="ts">
</script>
<template>
  <section class="section-exclusive-benefits">
    <div class="container xl:px-[0px]">
      <div class="section-title">
        <h3>{{ $t('exclusive_benefits.join_a_community_of_practitioners_with') }} <span>{{ $t('exclusive_benefits.exclusive_benefits') }}</span></h3>
      </div>
      <div class="card">
        <div class="card-item">
          <div class="h-6 mb-6"><IconNetwork class="text-primary" /></div>
          <h4>{{ $t('networking.title') }}</h4>
          <p>{{ $t('networking.description') }}</p>
        </div>
        <div class="card-item">
          <div class="h-6 mb-6"><IconArrowGrow class="text-primary" /></div>
          <h4>{{ $t('growth.title') }}</h4>
          <p>{{ $t('growth.description') }}</p>
        </div>
        <div class="card-item">
          <div class="h-6 mb-6"><IconGlobe class="text-primary" /></div>
          <h4>{{ $t('opportunities.title') }}</h4>
          <p>{{ $t('opportunities.description') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.section-exclusive-benefits{
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
      @apply font-dxgrafik text-[24px] leading-[36px] font-semibold text-black text-center mb-4;
      span{
        @apply text-primary;
      }
      @screen lg {
        @apply text-[34px] leading-[60px];
      }
    }
  }
  .card {
    @apply grid grid-cols-1 gap-6;
    @screen md {
      @apply grid grid-cols-3;
    }
    @screen lg {
      @apply grid grid-cols-3 gap-6;
    }
    &-item {
      @apply bg-[#FAF9FA] p-6 rounded-2xl text-black text-lg font-normal flex items-start flex-col;
      @screen lg {
        @apply px-12 py-12 min-h-[315px];
      }
      @screen xl {
        @apply px-12 py-[60px] min-h-[315px];
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