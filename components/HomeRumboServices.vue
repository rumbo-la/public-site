<script lang="ts" setup>
const { locale, t } = useI18n()

const { rumboServices } = useRumboService()

const titleFirst = computed(() => {
  return `${t('section_rumbo_service.we')} <span>${t('section_rumbo_service.source_vet')}</span> ${t('section_rumbo_service.and')} <span>${t('section_rumbo_service.manage')}</span> ${t('section_rumbo_service.the_best')}`
})
</script>
<template>
  <section class="section-rumbo-services">
    <div class="container flex flex-col gap-12 lg:gap-[90px] xl:px-[90px]">
      <h2 class="section-rumbo-services__title" :class="{
        '!h-[90px] md:!h-[60px] lg:!h-[120px]': locale === 'es',
        '!w-100': locale !== 'es',
      }">
        <div
          class="w-full"
          >{{$t('section_rumbo_service.we')}} <span>{{$t('section_rumbo_service.source_vet')}}</span> {{$t('section_rumbo_service.and')}} <span>{{$t('section_rumbo_service.manage')}}</span> {{$t('section_rumbo_service.the_best')}}</div>
        <div class="inline-flex items-center h-[30px] lg:h-[60px] overflow-hidden">
          <TypingAnimate /> 
          <div class="inline-block text-[20px] leading-[20px] lg:text-[34px] lg:leading-[37px] lg:h-[37px]">{{ $t('section_rumbo_service.on_your_behalf') }}</div>
        </div>
      </h2>
      <div class="flex flex-col md:grid md:grid-cols-2 gap-10 xl:gap-6 px-3 lg:px-0">
        <div class="card" v-for="(item, index) in rumboServices" :key="`CARD_SERVICE_${index}`">
          <div class="card-body">
            <img class="text-primary w-12 h-12 lg:w-[88px] lg:h-[88px]" :src="item.icon" alt="Rumbo" />
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <ul class="list-disc">
              <li
                class=""
                v-for="(feature, index) in item.features"
                :class="{
                  '!hidden': index === 3
                }"
                :key="`CARD_SERVICE_FEATURE_${index}`"
              >
              {{ feature }}</li>
            </ul>
          </div>
          <div class="card-action">
            <NuxtLink :to="item.to" class="">{{ item.textLink }}</NuxtLink>  
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.section-rumbo-services{
  @apply pt-[60px] lg:pt-[120px] pb-[60px] lg:pb-[105px] overflow-hidden;
  &__title {
    @apply font-dxgrafik text-[20px] leading-[30px] font-semibold text-center text-black h-[60px] overflow-hidden;
    @apply w-full mx-auto;
    span {
      @apply text-primary;
    }
    @screen lg {
      @apply text-[34px] leading-[60px] w-[990px] mx-auto h-[120px];
    }
  }
  .card {
    @apply overflow-hidden rounded-[24px] bg-[#FAFAFA] py-9 px-6 flex flex-col justify-between;
    @screen lg {
      @apply py-12 px-12 min-h-[705px];
    }
    @screen xl {
      @apply py-16 px-16 min-h-[705px];
    }
    &-body {
      @apply flex flex-col gap-4  text-black;
      @screen lg {
        @apply gap-6;
      }
      h3 {
        @apply font-dxgrafik text-[24px] leading-[28px] font-bold text-left ;
        @screen lg {
          @apply text-[30px] leading-[150%] w-full;
        }
      }
      p {
        @apply font-normal text-base ;
        @screen lg {
          @apply text-[20px] leading-[150%] w-full;
        }
      }
      ul {
        @apply flex-col gap-4 flex w-full pb-8 pl-8 text-black;
        li {
          @apply  text-[14px] leading-[21px] font-normal;
          @screen lg {
            @apply text-[20px] leading-[150%];
          }
        }
      }
    }
    &-action {
      a {
        @apply text-[16px] leading-[20px] font-semibold font-dxgrafik text-primary;
        @screen lg {
          @apply text-[20px] leading-[150%];
        }
      }
    }
  }
}
</style>