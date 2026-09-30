<script setup lang="ts"></script>
<template>
  <div class="rumbo-other">
    <div class="rumbo-other__titles">
      <div class=" pt-[138px]">
        {{ $t('rumbo_vs_other.quality') }}
      </div>
      <div class="">
        {{ $t('rumbo_vs_other.cost') }}
      </div>
      <div class="">
        {{ $t('rumbo_vs_other.flexibility') }}
      </div>
      <div class="">
        {{ $t('rumbo_vs_other.speed') }}
      </div>
      <div class="">
        {{ $t('rumbo_vs_other.expertise') }}
      </div>
    </div>
    <div class="rumbo-other__rumbo">
      <div class="flex flex-col px-9">
        <img class="w-auto mb-12 h-[51px]" src="/logo-rumbo.svg" alt="Rumbo" >
        <div class="flex flex-col gap-9">
          <p>{{ $t('rumbo.quality_text1') }}</p>
          <p>{{ $t('rumbo.quality_text2') }}</p>
        </div>
      </div>
      <div>
        {{ $t('rumbo.cost_text1') }}
      </div>
      <div>
        <div class="flex flex-col gap-9">
          <p>{{ $t('rumbo.flexibility_text1') }}</p>
          <p>{{ $t('rumbo.flexibility_text2') }}</p>
        </div>
      </div>
      <div>
        {{ $t('rumbo.speed_text1') }}
      </div>
      <div>
        {{ $t('rumbo.expertise_text1') }}
      </div>
    </div>
    <div class="rumbo-other__traditional-staffing">
      <div class="flex flex-col px-0">
        <p class="mb-12 font-medium text-black text-[18px] leading-[27px]">{{ $t('traditional_staffing.title') }}</p>
        <div class="flex flex-col gap-9 px-0">
          <p>{{ $t('traditional_staffing.quality_text1') }}</p>
          <p>{{ $t('traditional_staffing.quality_text2') }}</p>
        </div>
      </div>
      <div>{{ $t('traditional_staffing.cost_text1') }}</div>
      <div>
        <div class="flex flex-col gap-9">
          <p>{{ $t('traditional_staffing.flexibility_text1') }}</p>
          <p>{{ $t('traditional_staffing.flexibility_text2') }}</p>
        </div>
      </div>
      <div>{{ $t('traditional_staffing.speed_text1') }}</div>
      <div>{{ $t('traditional_staffing.expertise_text1') }}</div>
    </div>
    <div class="rumbo-other__internal-staffing">
      <div class="flex flex-col px-0">
        <p class="mb-12 font-medium text-black text-[18px] leading-[27px]">{{ $t('internal_staffing.title') }}</p>
        <div class="flex flex-col gap-9 px-0">
          <p>{{ $t('internal_staffing.quality_text1') }}</p>
          <p>{{ $t('internal_staffing.quality_text2') }}</p>
        </div>
      </div>
      <div>{{ $t('internal_staffing.cost_text1') }}</div>
      <div>
        <div class="flex flex-col gap-9">
          <p>{{ $t('internal_staffing.flexibility_text1') }}</p>
          <p>{{ $t('internal_staffing.flexibility_text2') }}</p>
        </div>
      </div>
      <div>{{ $t('internal_staffing.speed_text1') }}</div>
      <div>{{ $t('internal_staffing.expertise_text1') }}</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.rumbo-other {
  @apply text-black w-full mx-auto flex;
  @screen xl {
    @apply w-[1128px];
  }
  &__titles {
    > div {
      @apply flex items-center justify-center w-full text-[24px] leading-[36px] min-h-[120px] font-bold min-w-[180px];
      @screen xl {
        @apply min-w-[180px];
      }
      @screen 2xl {
        @apply min-w-[204px];
      }
      &:first-child {
        @apply min-h-[306px];
      }
      &:nth-child(3) {
        @apply min-h-[207px];
      }
      & + div {
        @apply border-t border-[#E2E2E2];
      }
    }
  }
  &__rumbo {
    > div {
      @apply flex items-center justify-center w-full bg-[#FAF9FA] text-[16px] leading-[24px] min-w-[280px] px-5 text-center;
      @apply border-l border-r border-[#E2E2E2];
      @screen xl {
        @apply min-w-[280px] px-5;
      }
      @screen 2xl {
        @apply min-w-[332px] px-9;
      }
      & + div {
        @apply border-t border-[#E2E2E2];
      }
      &:first-child {
        @apply border-t border-l border-r border-[#E2E2E2] rounded-t-3xl min-h-[306px];
      }
      &:nth-child(2) {
        @apply min-h-[120px];
      }
      &:nth-child(3) {
        @apply min-h-[207px];
      }
      &:nth-child(4) {
        @apply min-h-[120px];
      }
      &:nth-child(5) {
        @apply min-h-[132px];
      }
      // &:first-child {
      //   @apply border-l border-r border-[#E2E2E2];
      // }
      &:last-child {
        @apply border-l border-r border-b border-[#E2E2E2] rounded-b-3xl;
      }
    }
  }
  &__traditional-staffing {
    @apply text-[#808080] min-w-[270px];
    @screen xl {
      @apply min-w-[270px];
    }
    @screen 2xl {
      @apply min-w-[314px];
    }
    > div {
      @apply flex items-center justify-center w-full text-[14px] leading-[21px] min-h-[120px] text-center pl-6 pr-3;
      @screen xl {
        @apply pl-6 pr-3;
      }
      @screen 2xl {
        @apply pl-9 pr-[18px];
      }
      &:first-child {
        @apply min-h-[306px];
      }
      &:nth-child(3) {
        @apply min-h-[207px];
      }
      & + div {
        @apply border-t border-[#E2E2E2];
      }
    }
  }
  &__internal-staffing {
    @apply text-[#808080] min-w-[190px];
    @screen xl {
      @apply min-w-[190px];
    }
    @screen 2xl {
      @apply min-w-[204px];
    }
    > div {
      @apply flex items-center justify-center w-full text-[14px] leading-[21px] min-h-[120px] text-center pr-0 pl-3;
      @screen xl {
        @apply pl-3;
      }
      @screen 2xl {
        @apply pl-[18px];
      }
      &:first-child {
        @apply min-h-[306px];
      }
      &:nth-child(3) {
        @apply min-h-[207px];
      }
      & + div {
        @apply border-t border-[#E2E2E2];
      }
    }
  }
}
</style>