<script lang="ts" setup>

</script>
<template>
  <section class="section-brands">
    <div class="container flex flex-col gap-6">
      <p class="text-center text-lg font-bold">{{ $t('section_client.title') }}</p>
      <div class="slider ">
        <!-- <button class="slider-control control-left" @click="handlePrevSlide"><IconChevronCircleLeft /></button> -->
        <!-- <div class="keen-slider"> -->
          <div class="keen-slider__slide"><img class="mx-auto w-auto h-[22px] lg:h-[45px]" src="/images/clients/kurios.svg" alt="Rumbo Kurios"></div>
          <div class="keen-slider__slide"><img class="mx-auto w-auto h-[22px] lg:h-[45px]" src="/images/clients/evolta.svg" alt="Rumbo Evolta"></div>
          <div class="keen-slider__slide"><img class="mx-auto w-auto h-[22px] lg:h-[45px]" src="/images/clients/limalinen.svg" alt="Rumbo Limalinen"></div>
          <div class="keen-slider__slide"><img class="mx-auto w-auto h-[22px] lg:h-[45px]" src="/images/clients/cienpies.svg" alt="Rumbo Cienpies"></div>
          <div class="keen-slider__slide"><img class="mx-auto w-auto h-[22px] lg:h-[45px]" src="/images/clients/efc.svg" alt="Rumbo EFC"></div>
        <!-- </div> -->
        <!-- <button class="slider-control control-right" @click="handleNextSlide"><IconChevronCircleRight /></button> -->
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.section-brands {
  @apply w-full flex flex-col items-center relative overflow-x-hidden bg-[#FAF9FA] text-black py-[31px] lg:py-12;
  p {
    @apply font-normal text-[16px] leading-[24px];
    @screen lg {
      @apply text-[16px] leading-[36px];
    }
  }
  .slider {
    @apply flex relative flex-wrap flex-row gap-6 justify-center items-center w-full px-6 lg:px-0;
    // &-control {
    //   @apply w-[30px] h-[30px] min-w-[30px] text-white inline-flex lg:!hidden;
    // }
  }
}
</style>