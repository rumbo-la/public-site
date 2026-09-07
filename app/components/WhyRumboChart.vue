<script setup lang="ts">
const { locale } = useI18n()
</script>
<template>
  <section class="section-chart">
    <div class="container px-0">
      <div class="section-title">
        <h3>{{ $t('unique_process.a') }} <span>{{ $t('unique_process.source') }}</span> {{ $t('unique_process.and') }} <span>{{ $t('unique_process.vet') }}</span> {{ $t('unique_process.the_best_talent') }}</h3>
      </div>
      <div v-if="locale === 'en'" class="rumbo-charts">
        <img class="img-responsive" src="/images/why-rumbo/bg-expert-rumbo-responsive-en.png" alt="Rumbo" >
        <img class="img-desktop" src="/images/why-rumbo/bg-expert-rumbo-desktop-en.png" alt="Rumbo" >
      </div>
      <div v-else class="rumbo-charts">
        <img class="img-responsive" src="/images/why-rumbo/bg-expert-rumbo-responsive-es.png" alt="Rumbo" >
        <img class="img-desktop" src="/images/why-rumbo/bg-expert-rumbo-desktop-es.png" alt="Rumbo" >
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.section-chart{
  @apply bg-white py-[60px] px-0;
  @screen lg {
    @apply pt-[120px] pb-[120px];
  }
  .rumbo-charts {
    @apply flex mx-auto relative;
    @screen 2xl {
      @apply w-[1305px] h-[568px];
    }
    .img-responsive {
      @apply max-w-full lg:hidden mx-auto;
    }
    .img-desktop {
      @apply max-w-full hidden lg:flex w-full;
    }
  }
  .card {
    @apply flex mx-auto relative;
    @screen 2xl {
      @apply w-[1305px] h-[568px];
    }
    .chart-img {
      @apply absolute top-[20px] left-0;
      @screen 2xl {
        @apply w-[987px] top-[78px];
      }
    }
    .chart-info {
      @apply flex items-end justify-start;
      .info {
        @apply flex justify-end px-[23px] flex-col;
        p {
          &:first-child{
            @apply text-[20px] leading-[30px] font-bold min-h-[60px] mb-2;
          }
          &:last-child {
            @apply text-[14px] leading-[21px] font-normal;
          }
        }
        &:nth-child(1) {
          @apply max-w-[243px] h-[484px] border-l-2 border-dashed border-black/20;
          @screen 2xl {
            @apply max-w-[243px] h-[484px] border-l-2 border-dashed border-black/20;
          }
        }
        &:nth-child(2) {
          @apply max-w-[246px] h-[334px] border-l-2 border-dashed border-black/20;
          @screen 2xl {
            @apply max-w-[246px] h-[334px] border-l-2 border-dashed border-black/20;
          }
        }
        &:nth-child(3) {
          @apply max-w-[244px] h-[218px] border-l-2 border-dashed border-black/20;
          @screen 2xl {
            @apply max-w-[244px] h-[218px] border-l-2 border-dashed border-black/20 -mb-[22px];
          }
        }
        &:nth-child(4) {
          @apply max-w-[244px] h-[155px] border-l-2 border-dashed border-black/20;
          @screen 2xl {
            @apply max-w-[244px] h-[155px] border-l-2 border-dashed border-black/20;
          }
        }
      }
    }
  }
  .section-title {
    @apply w-full mb-12 lg:mb-[90px] px-6;
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
}
</style>