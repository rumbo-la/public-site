<script setup lang="ts">
import { useJoin } from '~/composables/useJoin';

const { joinUsModal, setJoinUsModal } = useJoin()

interface Props {
  isCommunity?: boolean
}

defineProps<Props>()

const handleOpenJoinUs = () => {
  setJoinUsModal(true)
}
</script>
<template>
  <section class="section-looking-for-you">
    <div class="container xl:px-[90px]">
      <div class="section">
        <div class="section-info">
          <h3 class="section-title" v-html="$t('were_hiring.title')"></h3>
          <p class="section-subtitle">{{ $t('were_hiring.description') }}</p>
          <div class="section-actions">
            <NuxtLink
              v-if="isCommunity"
              href="https://form.feathery.io/to/xbitoY"
              target="_blank"
              rel="noopener"
              class="h-12 w-full md:w-[308px] bg-white text-black text-base inline-flex items-center justify-center leading-[20px] font-bold !rounded-lg"
            >
              {{ $t('button.apply_now') }}
            </NuxtLink>
            <NuxtLinkLocale
              v-else
              to="/community"
              class="h-12 w-full md:w-[308px] bg-white text-black text-base inline-flex items-center justify-center leading-[20px] font-bold !rounded-lg"
            >
              {{ $t('button.explore_the_community') }}
            </NuxtLinkLocale>
          </div>
        </div>
        <div class="section-play">
          <img src="/images/img-looking-for-you.png" alt="Rumbo" />
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.section-looking-for-you{
  @apply bg-primary text-white relative overflow-hidden px-3;
  background: {
    image: url('/images/bg-looking-for-you.jpg');
    repeat: no-repeat;
    size: cover;
  };
  .section {
    @apply w-full flex flex-col-reverse justify-between py-[30px] relative z-[10];
    @screen lg {
      @apply items-center py-12 flex-row;
    }
    &-info {
      @apply w-full flex flex-col items-center gap-5;
      @screen lg {
        @apply w-[550px] items-center gap-6;
      }
    }
    &-title {
      @apply font-dxgrafik text-2xl leading-[28px] font-semibold w-full text-center;
      @screen lg {
        @apply text-[48px] leading-[57px] text-left;
      }
    }
    &-subtitle {
      @apply text-base font-normal text-center;
      @screen lg {
        @apply text-[18px] leading-[27px] text-left;
      }
    }
    &-actions {
      @apply flex justify-center w-full mt-7;
      @screen lg {
        @apply justify-start mt-0;
      }
      &:deep(.app-btn) {
        @apply w-[308px] h-[46px] text-base font-bold;
      }
    }
    &-play {
      @apply w-auto min-h-[175px] flex items-center justify-center rounded-[18px] mb-[30px];
      @screen sm {
        @apply w-[327px] h-auto mx-auto;
      }
      @screen lg {
        @apply w-auto h-[304px] mb-0 mx-0;
      }
      img {
        @apply rounded-[18px];
        width: 100%;
        height: auto;
        @screen lg {
          aspect-ratio: 16 / 9;
          object-fit: cover;
        }
      }
    }
  }
}
</style>