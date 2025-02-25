<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

interface Props {
  modelValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false
});

const emit = defineEmits<{
  (e: 'update:model-value', val: boolean): void
}>()

const target = ref(null)

onClickOutside(target, () => {
  onCloseMenu()
})

const handleClickActivator = () => {
  console.log(!props.modelValue)
  emit('update:model-value', !props.modelValue)
}

const onCloseMenu = () => {
  emit('update:model-value', false)
}
</script>
<template>
  <div class="app-menu" :class="{ 'app-menu--active': modelValue }">
    <slot
      name="activator"
      :props="{ class: 'app-menu__activator', onClick: handleClickActivator }"
    ></slot>
    <div v-if="modelValue" ref="target" class="app-menu__options">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.app-menu {
  @apply relative z-[120];
  &--active {
    @apply relative z-[121];
  }
  &__activator {
    @apply relative z-[10];
  }
  &__options {
    @apply rounded-md shadow-md absolute z-[120] bg-white py-0 right-full top-full -mr-8 mt-1;
    @apply min-w-[180px];
  }
}
</style>