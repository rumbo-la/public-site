<script lang="ts" setup>
import { clients } from '~/constants/clients'

// The list is rendered twice so the marquee can loop seamlessly (translateX -50%).
const track = [...clients, ...clients]
</script>
<template>
  <section class="section-brands">
    <div class="container flex flex-col gap-6">
      <p class="text-center text-lg font-bold">{{ $t('section_client.title') }}</p>
      <div class="slider-wrapper">
        <div class="slider-track">
          <div
            v-for="(client, index) in track"
            :key="`CLIENT_${index}`"
            class="slider-item"
            :aria-hidden="index >= clients.length ? 'true' : undefined">
            <img class="client-logo" :src="`/images/clients/${client.file}.svg`" :alt="`Rumbo ${client.name}`">
          </div>
        </div>
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
  .slider-wrapper {
    @apply w-full overflow-hidden relative px-6 lg:px-0;
  }
  .slider-track {
    @apply flex items-center gap-4 md:gap-8 w-fit will-change-transform;
    animation: slide-infinite 20s linear infinite;
    &:hover {
      animation-play-state: paused;
    }
    @media (prefers-reduced-motion: reduce) {
      animation: none;
      @apply flex-wrap justify-center w-full;
    }
  }
  .slider-item {
    @apply flex items-center justify-center shrink-0 min-w-[80px] md:min-w-[120px] lg:min-w-[140px];
  }
  .client-logo {
    @apply h-[29px] lg:h-[45px] w-auto max-w-full;
  }
}
@keyframes slide-infinite {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
</style>
