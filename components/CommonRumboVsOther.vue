<script setup lang="ts">
</script>
<template>
  <section class="section-digital-discipline">
    <div class="container">
      <div class="section">
        <div class="section-info">
          <h3>Rumbo <span>versus</span> {{ $t('rumbo_vs_other.others') }}</h3>
        </div>
        <RumboVsOtherDesktop class="!hidden lg:!flex" />
        <RumboVsOtherMobile class="!flex lg:!hidden" />
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.section-digital-discipline {
  @apply flex py-12 bg-white w-full px-[6px];
  @screen md {
    @apply py-[120px];
  }
  .section {
    &-info {
      @apply text-center w-full mx-auto mb-[68px];
      @screen md {
        @apply mb-[90px];
      }
      h3{
        @apply font-dxgrafik text-black text-[20px] leading-[30px] mb-0 font-semibold;
        span {
          @apply text-primary;
        }
        @screen md {
          @apply text-[34px] leading-[60px];
        }
      }
    }
    &-disciplines {
      @apply flex flex-col gap-10;
    }
    &-tabs {
      @apply py-0 flex flex-col gap-4 lg:gap-[10px] flex-nowrap justify-center;
      @screen lg {
        @apply flex-row;
      }
    }
    &-tab {
      @apply flex flex-row gap-2 items-center h-[52px] px-4;
      @apply text-black bg-transparent text-[18px] leading-[25px] font-bold rounded-lg mx-auto;
      &.active {
        @apply  bg-black text-white;
      }
      @screen md {
        @apply text-[20px] leading-[28px];
      }
    }
    &-specialties {
      @apply flex gap-4 flex-wrap lg:flex-nowrap justify-center;
    }
    &-specialty {
      @apply bg-[#F6F4FE] text-base h-[52px] px-6 font-normal flex items-center rounded-lg; 
      box-shadow: 0px 4px 6px -2px #00000008;
    }
  }
}
</style>