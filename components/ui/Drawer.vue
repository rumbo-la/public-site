<script setup lang="ts">
interface Props {
  title: string
  position?: 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  position: 'right'
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const handleClose = () => {
  emit('close')
}

</script>
<template>
  <div 
    class="app-drawer"
    :class="{
      [`app-drawer--${position}`]: true
    }"
  >
    <div class="app-drawer__header">
      <h3 class="text-base font-semibold">{{ title }}</h3>
      <UiButton variant="text" color="black" size="sm" class="!text-lg" @click="handleClose">
        <IconClose />
      </UiButton>
    </div>
    <div class="app-drawer__content">
      <slot></slot>
    </div>
    <div v-if="$slots.actions" class="app-drawer__actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.app-drawer {
  @apply fixed w-[320px] h-full flex flex-col justify-between z-[140] top-0;
  @apply bg-white border-l border-gray-100 shadow-xl;
  &--right {
    @apply right-0;
  }
  &--left {
    @apply left-0;
  }
  &__header {
    @apply w-full flex justify-between items-center p-3;
  }

  &__content {
    @apply flex-1 h-full w-full;
    @apply border-t border-b border-gray-100;
  }

  &__actions {
    @apply w-full p-3;
  }
}
</style>