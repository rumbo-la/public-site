<script setup lang="ts">
const currentVs = ref<number>()

const handleSelect = (index: number) => {
  currentVs.value = currentVs.value === index ? undefined : index
}

onMounted(() => {
  currentVs.value = 0
})
</script>
<template>
  <div class="rumbo-other">
    <div
      class="rumbo-other-item">
      <div class="rumbo-other-head" @click="handleSelect(0)">
        <span>{{ $t('rumbo_vs_other.quality') }}</span>
        <UiButton
          color="black"
          variant="text"
          class="w-6 !min-h-6 h-6 lg:w-12 lg:h-12"
        >
          <IconChevronDown
            class="!w-6 !min-h-6 h-6 lg:!w-12 lg:!h-12"
            :class="{
              'rotate-180': currentVs === 0
            }"
          />
        </UiButton>
      </div>
      <div class="rumbo-other-body" v-if="currentVs === 0">
        <div class="flex flex-col gap-6">
          <div class="card">
            <img class="w-auto h-[42px]" src="/logo-rumbo.svg" alt="Rumbo" />
            <div class="flex flex-col gap-6">
              <p>{{ $t('rumbo.quality_text1') }}</p>
              <p>{{ $t('rumbo.quality_text2') }}</p>
            </div>
          </div>
          <p class="text-[18px] leading-[27px] font-medium"><b>{{ $t('traditional_staffing.title') }}</b></p>
          <p>{{ $t('traditional_staffing.quality_text1') }}</p>
          <p>{{ $t('traditional_staffing.quality_text2') }}</p>
          <div class="border-[#E2E2E2] h-px w-full"></div>
          <p class="text-[18px] leading-[27px] font-medium"><b>{{ $t('internal_staffing.title') }}</b></p>
          <p>{{ $t('internal_staffing.quality_text1') }}</p>
          <p>{{ $t('internal_staffing.quality_text2') }}</p>
        </div>
      </div>
    </div>
    <div
      class="rumbo-other-item">
      <div class="rumbo-other-head" @click="handleSelect(1)">
        <span>{{ $t('rumbo_vs_other.cost') }}</span>
        <UiButton
          color="black"
          variant="text"
          class="w-6 !min-h-6 h-6 lg:w-12 lg:h-12"
        >
          <IconChevronDown
            class="!w-6 !min-h-6 h-6 lg:!w-12 lg:!h-12"
            :class="{
              'rotate-180': currentVs === 1
            }"
          />
        </UiButton>
      </div>
      <div class="rumbo-other-body" v-if="currentVs === 1">
        <div class="flex flex-col gap-6">
          <div class="card">
            <img class="w-auto h-[42px]" src="/logo-rumbo.svg" alt="Rumbo" />
            <div class="flex flex-col gap-6">
              <p>{{ $t('rumbo.cost_text1') }}</p>
            </div>
          </div>
          <p class="text-[18px] leading-[27px] font-medium"><b>{{ $t('traditional_staffing.title') }}</b></p>
          <p>{{ $t('traditional_staffing.cost_text1') }}</p>
          <div class="border-[#E2E2E2] h-px w-full"></div>
          <p class="text-[18px] leading-[27px] font-medium"><b>{{ $t('internal_staffing.title') }}</b></p>
          <p>{{ $t('internal_staffing.cost_text1') }}</p>
        </div>
      </div>
    </div>
    <div
      class="rumbo-other-item">
      <div class="rumbo-other-head" @click="handleSelect(2)">
        <span>{{ $t('rumbo_vs_other.flexibility') }}</span>
        <UiButton
          color="black"
          variant="text"
          class="w-6 !min-h-6 h-6 lg:w-12 lg:h-12"
        >
          <IconChevronDown
            class="!w-6 !min-h-6 h-6 lg:!w-12 lg:!h-12"
            :class="{
              'rotate-180': currentVs === 2
            }"
          />
        </UiButton>
      </div>
      <div class="rumbo-other-body" v-if="currentVs === 2">
        <div class="flex flex-col gap-6">
          <div class="card">
            <img class="w-auto h-[42px]" src="/logo-rumbo.svg" alt="Rumbo" />
            <div class="flex flex-col gap-6">
              <p>{{ $t('rumbo.flexibility_text1') }}</p>
              <p>{{ $t('rumbo.flexibility_text2') }}</p>
            </div>
          </div>
          <p class="text-[18px] leading-[27px] font-medium"><b>{{ $t('traditional_staffing.title') }}</b></p>
          <p>{{ $t('traditional_staffing.flexibility_text1') }}</p>
          <p>{{ $t('traditional_staffing.flexibility_text2') }}</p>
          <div class="border-[#E2E2E2] h-px w-full"></div>
          <p class="text-[18px] leading-[27px] font-medium"><b>{{ $t('internal_staffing.title') }}</b></p>
          <p>{{ $t('internal_staffing.flexibility_text1') }}</p>
          <p>{{ $t('internal_staffing.flexibility_text2') }}</p>
        </div>
      </div>
    </div>
    <div
      class="rumbo-other-item">
      <div class="rumbo-other-head" @click="handleSelect(3)">
        <span>{{ $t('rumbo_vs_other.speed') }}</span>
        <UiButton
          color="black"
          variant="text"
          class="w-6 !min-h-6 h-6 lg:w-12 lg:h-12"
        >
          <IconChevronDown
            class="!w-6 !min-h-6 h-6 lg:!w-12 lg:!h-12"
            :class="{
              'rotate-180': currentVs === 3
            }"
          />
        </UiButton>
      </div>
      <div class="rumbo-other-body" v-if="currentVs === 3">
        <div class="flex flex-col gap-6">
          <div class="card">
            <img class="w-auto h-[42px]" src="/logo-rumbo.svg" alt="Rumbo" />
            <div class="flex flex-col gap-6">
              <p>{{ $t('rumbo.speed_text1') }}</p>
            </div>
          </div>
          <p class="text-[18px] leading-[27px] font-medium"><b>{{ $t('traditional_staffing.title') }}</b></p>
          <p>{{ $t('traditional_staffing.speed_text1') }}</p>
          <div class="border-[#E2E2E2] h-px w-full"></div>
          <p class="text-[18px] leading-[27px] font-medium"><b>{{ $t('internal_staffing.title') }}</b></p>
          <p>{{ $t('internal_staffing.speed_text1') }}</p>
        </div>
      </div>
    </div>
    <div
      class="rumbo-other-item">
      <div class="rumbo-other-head" @click="handleSelect(4)">
        <span>{{ $t('rumbo_vs_other.expertise') }}</span>
        <UiButton
          color="black"
          variant="text"
          class="w-6 !min-h-6 h-6 lg:w-12 lg:h-12"
        >
          <IconChevronDown
            class="!w-6 !min-h-6 h-6 lg:!w-12 lg:!h-12"
            :class="{
              'rotate-180': currentVs === 4
            }"
          />
        </UiButton>
      </div>
      <div class="rumbo-other-body" v-if="currentVs === 4">
        <div class="flex flex-col gap-6">
          <div class="card">
            <img class="w-auto h-[42px]" src="/logo-rumbo.svg" alt="Rumbo" />
            <div class="flex flex-col gap-6">
              <p>{{ $t('rumbo.expertise_text1') }}</p>
            </div>
          </div>
          <p class="text-[18px] leading-[27px] font-medium"><b>{{ $t('traditional_staffing.title') }}</b></p>
          <p>{{ $t('traditional_staffing.expertise_text1') }}</p>
          <div class="border-[#E2E2E2] h-px w-full"></div>
          <p class="text-[18px] leading-[27px] font-medium"><b>{{ $t('internal_staffing.title') }}</b></p>
          <p>{{ $t('internal_staffing.expertise_text1') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.rumbo-other {
  @apply flex flex-col w-full;
  &-item {
    @apply w-full flex-col border-b border-black/20 lg:border-black overflow-hidden;
  }
  &-head {
    @apply flex justify-between items-center py-3;
    @apply text-[20px] leading-[30px] font-medium;
  }
  &-body {
    @apply w-full pb-4 text-center;
    @apply text-[14px] leading-[21px];
    b {
      @apply font-medium;
    }
    @screen lg {
      @apply text-[24px] leading-[38px] py-[31px];
    }
    .card {
      @apply flex flex-col px-8 gap-6 py-5 border border-[#E2E2E2] bg-[#FAF9FA] rounded-3xl;
      @apply text-[16px] leading-[24px];
    }
  }
}
</style>