<script setup lang="ts">
import { TW_CONFIG_PREFIX } from '~~/tailwind/constants';

interface Props {
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit';
  variant?: 'light' | 'outlined' | 'fill' | 'text',
  size?: 'xs' | 'sm' | 'md' | 'lg',
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: 'paragraph',
  size: 'sm',
  variant: 'fill',
  type: 'button'
}) 


const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()


const btnRef = ref<HTMLElement | null>(null);

const colorName = computed(() => {
  return props.color.split('-')[0]
})

const colorNormal = computed(() => {
  return `var(--${TW_CONFIG_PREFIX}color-${props.color})`
})

const colorHoverOutlineText = computed(() => {
  return `var(--${TW_CONFIG_PREFIX}color-${colorName.value}-20)`
})

const handleClick = (e: MouseEvent) => {
  emit('click', e)
}

</script>
<template>
  <button
    ref="btnRef"
    class="app-btn"
    :type="type"
    :disabled="disabled"
    :class="{
      [`app-btn--${variant}`]: true,
      [`app-btn--${size}`]: true,
    }"
    @click="handleClick"
  >
    <div class="flex gap-1 items-center">
      <svg
        v-if="loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
      </svg>
      <slot/>
    </div>
  </button>
</template>
<style lang="scss" scoped>
.app-btn {
  @apply text-white font-medium rounded focus:outline-none;
  @apply flex justify-center items-center;
  &:disabled {
    @apply cursor-not-allowed opacity-[50%];
  }
  // VARIANT
  &.app-btn--outlined {
    border: 1px solid v-bind(colorNormal);
    color: v-bind(colorNormal);
    &:hover {
      background-color: v-bind(colorHoverOutlineText);
    }
  }

  &.app-btn--fill {
    background-color: v-bind(colorNormal);
    @apply text-white;
  }

  &.app-btn--text {
    color: v-bind(colorNormal);
    &:hover {
      background-color: v-bind(colorHoverOutlineText);
    }
  }

  &.app-btn--light {
    color: v-bind(colorNormal);
    &:hover {
      background-color: transparent;
    }
  }

  // SIZE
  &.app-btn--xs {
    @apply min-h-8 px-2 text-sm;
  }

  &.app-btn--sm {
    @apply min-h-10 px-2 text-sm;
  }
  
  &.app-btn--md {
    @apply min-h-12 px-3 text-base;
  }

  &.app-btn--lg {
    @apply min-h-14 px-3 text-lg;
  }
}
</style>
