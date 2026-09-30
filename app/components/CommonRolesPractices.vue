<script setup lang="ts">
import { disciplines } from '~/constants/disciplines'

interface Props {
  isFractional?: boolean
}

const props = defineProps<Props>()


const currentIndex = ref<number>(0)

const disciplinesChildren = computed(() => {
  const discipline = disciplines[currentIndex.value]
  if (!discipline) return []
  return props.isFractional ? discipline.childrenFractional : discipline.children
})

const handleUpdateIndex = (newIndex: number) => {
  currentIndex.value = newIndex
}

</script>
<template>
  <section class="section-digital-discipline">
    <div class="container">
      <div class="section">
        <div class="section-info">
          <h3>{{ $t('roles_disciplines.top_talent_in') }} <span>{{ $t('roles_disciplines.different_roles') }}</span> {{ $t('roles_disciplines.and') }} <span>{{ $t('roles_disciplines.practices') }}</span></h3>
        </div>
        <div class="section-disciplines">
          <div class="section-tabs">
            <button
              v-for="(item, index) in disciplines"
              :key="`DISCIPLINE_${index}`"
              class="section-tab"
              :class="{
                active: currentIndex === index
              }"
              @click="handleUpdateIndex(index)"
            >
              <component :is="item.icon"/>
              {{ item.title }}
            </button>
          </div>
          <div class="section-specialties">
            <div
              v-for="(item, index) in disciplinesChildren"
              :key="`SPECIALTY_${index}`"
              class="section-specialty"
            >
              {{ item }}
            </div>
          </div>
        </div>
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
      @screen lg {
        @apply mx-0;
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