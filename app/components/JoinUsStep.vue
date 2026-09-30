<template>
  <div
    class="joinus-step"
    :class="{
      'active': currentStep === step,
      'approved': approved
    }"
  >
    <button
      type="button"
      class="joinus-step-btn"
      @click="handleSelectStep"
    >
      <div class="joinus-step-number">
        <IconCheck v-if="approved" />
        <span v-else>{{ step }}</span>
      </div>
      <div class="joinus-step-label">
        <p>{{ title }}</p>
        <p>1 min</p>
      </div>
    </button>
  </div>
</template>
<script setup lang="ts">
interface Props {
  title: string
  approved: boolean
  step: number
}

const props = defineProps<Props>()
const {
  steps,
  step: currentStep,
  setStep
} = useJoin()

const handleSelectStep = () => {
  if (steps.value[props.step - 1]?.approved) setStep(props.step)
}
</script>
<style lang="scss" scoped>
.joinus-step {
  &-btn{
    @apply flex gap-2;
  }
  &-number {
    @apply w-6 h-6 inline-flex justify-center items-center min-w-6;
    @apply text-black text-sm border border-black font-normal rounded-full;
  }
  &-label {
    @apply hidden flex-col gap-1 items-start text-left;
    @screen lg {
      @apply flex;
    }
    p:first-child {
      @apply text-black text-sm font-normal; 
    }
    p:last-child {
      @apply font-bold text-xs leading-[18px] hidden;
    }
  }
  &.active {
    .joinus-step {
      &-number {
        @apply bg-primary text-white border-0;
      }
      &-label {
        @apply flex;
        p:first-child {
          @apply text-primary text-sm font-bold; 
        }
        p:last-child {
          @apply block;
        }
      }
    }
  }
  &.approved {
    .joinus-step {
      &-number {
        @apply bg-primary text-white border-0;
      }
      &-label {
        p:first-child {
          @apply text-primary text-sm font-bold; 
        }
        p:last-child {
          @apply hidden;
        }
      }
    }
  }
}
</style>