<template>
  <nuxt-link
    :to="to"
    :aria-hidden="ariaHidden ?? undefined"
    class="app-link "
    :class="{
      [`app-btn--${variant}`]: true,
      [`app-btn--${size}`]: true,
      'disabled:cursor-not-allowed opacity-50': disabled
    }"
  >
    <span class="w-full flex items-center justify-center">
      <slot v-if="!loading"/>
      <i v-if="loading" class="icon-loading animate-spin"/>
    </span>
  </nuxt-link>
</template>
<script setup lang="ts">
import { TW_CONFIG_PREFIX } from '~~/tailwind/constants';

interface Props {
  color?: string
  text?: boolean
  loading?: boolean
  to: string
  variant?: 'light' | 'outlined' | 'fill' | 'text',
  size?: 'sm' | 'md' | 'lg',
  disabled?: boolean
  ariaHidden?: 'true' | 'false' | boolean | null
}

const props = withDefaults(defineProps<Props>(), {
  color: 'green-100',
  text: false,
  loading: false,
  to: '',
  variant: 'fill',
  size: 'md',
  disabled: false,
  ariaHidden: null
})

const colorName = computed(() => {
  return props.color.split('-')[0]
})

const colorNormal = computed(() => {
  return `var(--${TW_CONFIG_PREFIX}color-${props.color})`
})

const colorHoverOutlineText = computed(() => {
  return `var(--${TW_CONFIG_PREFIX}color-${colorName.value}-20)`
})

// const colorClass = computed<string>(() => {
//   return props.text ? `text-${props.color} bg-white` : `bg-${props.color} text-white`;
// })
</script>
<style lang="scss" scoped>
.app-link {
  @apply rounded font-semibold inline-flex justify-center items-center;
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
  &.app-btn--xs {
    @apply h-10;
    padding-left: 10.5px;
    padding-right: 10.5px;
  }
  &.app-btn--sm {
    @apply h-10;
    padding-left: 10.5px;
    padding-right: 10.5px;
  }
  &.app-btn--md {
    @apply px-6 h-10;
  }
  &.app-btn--lg {
    @apply px-8 h-11;
  }
}
</style>
