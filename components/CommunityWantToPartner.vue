<script lang="ts" setup>
const { typePartner } = useTypePartner()

</script>
<template>
  <section class="section-want-partner">
    <div class="container flex flex-col gap-12 lg:gap-[90px] xl:px-[90px]">
      <h3 class="section-want-partner__title">
        {{$t('want_partner.choose')}}<span>{{$t('want_partner.how_you_want_to_partner')}}</span> {{$t('want_partner.with_us')}}
      </h3>
      <div class="flex flex-col md:grid md:grid-cols-2 gap-10 xl:gap-6 px-3 lg:px-0">
        <div class="card" v-for="(item, index) in typePartner" :key="`CARD_SERVICE_${index}`">
          <div class="card-body">
            <component class="text-primary w-12 h-12 lg:w-[88px] lg:h-[88px]" :is="item.icon" />
            <h3>{{ item.title }}</h3>
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
            <NuxtLink :to="item.to" target="_blank" rel="noopener">{{ item.textLink }}</NuxtLink>  
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.section-want-partner{
  @apply pt-[60px] lg:pt-[120px] pb-[60px] lg:pb-[105px] overflow-hidden;
  &__title {
    @apply font-dxgrafik text-[24px] leading-[30px] font-semibold text-center text-black overflow-hidden;
    @apply w-full mx-auto;
    span {
      @apply text-primary;
    }
    @screen lg {
      @apply text-[34px] leading-[60px] w-[800px] mx-auto;
    }
  }
  .card {
    @apply overflow-hidden rounded-[24px] bg-[#FAFAFA] py-9 px-6 flex flex-col justify-between;
    @screen lg {
      @apply py-12 px-12 min-h-[660px];
    }
    @screen xl {
      @apply py-16 px-16 min-h-[660px];
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