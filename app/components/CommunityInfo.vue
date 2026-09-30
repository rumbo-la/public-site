<script lang="ts" setup>

</script>
<template>
  <section class="section-community-info">
    <div class="section">
      <div class="container flex justify-between flex-col lg:flex-row-reverse items-center relative z-50 px-[24px] lg:px-0">
        <div class="section-img">
          <img src="/images/community/bg-community.webp" >
        </div>
        <div class="section-info">
          <h2 class="section-title" v-html="$t('community.title')"/>
          <p class="section-subtitle">{{ $t('community.description') }}</p>
          <div class="flex flex-row items-center w-full">
            <div class="flex w-full lg:w-auto xl:flex-1">
              <NuxtLink
                to="https://form.feathery.io/to/xbitoY"
                target="_blank"
                rel="noopener"
                class="h-12 w-full md:w-[246px] bg-primary text-white text-base inline-flex items-center justify-center leading-[20px] font-bold rounded-lg"
              >
                 {{ $t('button.apply_now') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.section-community-info {
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
      @apply font-normal text-[16px] leading-[23px] text-black mb-12;
      @screen lg {
        @apply text-[20px] leading-[150%] mb-[60px];
      }
    }
  }
}
</style>