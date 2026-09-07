<script setup lang="ts">
import { faqs_en, faqs_es } from '~/constants/faq';
const { locale } = useI18n();

const currentFaq = ref<number>()
const faqs = computed(() => {
  return locale.value === 'es' ? faqs_es : faqs_en
})

const handleSelectFaq = (index: number) => {
  currentFaq.value = currentFaq.value === index ? undefined : index
}
</script>
<template>
  <section class="section-faq">
    <div class="container">
      <div class="section">
        <div class="section-info">
          <h3 class="section-title">{{ $t('faq.title') }}</h3>
        </div>
        <div class="faq">
          <div
            v-for="(item, index) in faqs"
            :key="`FAQ_${index}`"
            class="faq-item">
            <div class="faq-head" @click="handleSelectFaq(index)">
              <span>{{ item.title }}</span>
              <UiButton
                color="black"
                variant="text"
                class="w-6 !min-h-6 h-6 lg:w-12 lg:h-12"
              >
                <IconChevronDown
                  class="!w-6 !min-h-6 h-6 lg:!w-12 lg:!h-12"
                  :class="{
                    'rotate-180': currentFaq === index
                  }"
                />
              </UiButton>
            </div>
            <div v-if="currentFaq === index" class="faq-body">
              <div v-if="item.description" class="flex flex-col gap-4" v-html="item.description"/>
              <div v-if="item.steps" class="flex w-full">
                <ul class="list-decimal pl-6 flex flex-col gap-4">
                  <li v-for="(step, stepIndex) in item.steps" :key="`STEP_${index}_${stepIndex}`" v-html="step"/>
                </ul>
              </div>
              <div v-if="item.list" class="flex w-full">
                <ul class="list-disc pl-6 flex flex-col gap-4">
                  <li v-for="(itemList, stepIndex) in item.list" :key="`STEP_${index}_${stepIndex}`" v-html="itemList"/>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.section-faq {
  @apply bg-white text-black relative overflow-hidden;
  .section {
    @apply w-full flex flex-col justify-between py-12 relative z-[10];
    @screen lg {
      @apply items-center py-[120px] flex-col;
    }
    @screen xl {
      @apply w-[1200px] mx-auto;
    }
    &-info {
      @apply w-full flex flex-col items-center gap-5 mb-12;
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
  }
  .faq {
    @apply flex flex-col w-full lg:px-[90px];
    &-item {
      @apply w-full flex-col border-b border-black/20 overflow-hidden;
    }
    &-head {
      @apply flex justify-between items-center py-4 hover:cursor-pointer;
      @apply text-[14px] leading-[21px] font-semibold font-dxgrafik;
      @screen lg {
        @apply text-[30px] leading-[38px] py-[31px];
      }
    }
    &-body {
      @apply w-full pb-4;
      @apply text-[14px] leading-[21px];
      b {
        @apply font-bold;
      }
      @screen lg {
        @apply text-[24px] leading-[38px] py-[31px];
      }
    }
  }
}
</style>