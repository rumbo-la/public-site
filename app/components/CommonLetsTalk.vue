<script setup lang="ts">
import { CALENDLY_URL } from '~/constants/calendly';
</script>
<template>
  <section class="section-lets-talk">
    <div class="container">
      <div class="section">
        <div class="section-info">
          <h3 class="section-title">{{ $t('lets_talk.your_time_is_valuable_to_us') }}<span v-html="$t('lets_talk.lets_schedule_a')"/><br><span>{{ $t('lets_talk.30_minute_discussion') }}</span></h3>
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
    </div>
  </section>
</template>
<style lang="scss" scoped>
.section-lets-talk{
  @apply bg-white text-black relative overflow-hidden px-[6px];
  .section {
    @apply w-full flex flex-col-reverse justify-between py-12 relative z-[10];
    @screen lg {
      @apply items-center py-[120px] flex-row;
    }
    &-info {
      @apply w-full flex flex-col items-center gap-5;
      @screen lg {
        @apply items-center gap-6;
      }
    }
    &-title {
      @apply font-dxgrafik text-[20px] leading-[30px] font-semibold text-center;
      span {
        @apply text-primary;
      }
      @screen lg {
        @apply text-[34px] leading-[60px];
      }
    }
    &:deep(.app-btn) {
      @apply w-[246px] h-[46px] text-base font-bold;
    }
  }
}
</style>