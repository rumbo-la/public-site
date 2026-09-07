<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { generateUuid } from '~/helpers/generateUuid'
import UiTextField from './TextField.vue'

interface Props<T> {
  options: T[]
  label?: string
  clearable?: boolean
  placeholder?: string
}

const props = withDefaults(defineProps<Props<Record<string, any>>>(), {
  options: () => [],
  clearable: false
});

const emit = defineEmits<{
  (e: 'click:option', val: string): void
  (e: 'update:search', val: string | null): void
}>()

const targetMenu = ref(null)
const showMenu = ref<boolean>(false)
const searchInput = ref<string | null>(null)
const flagOnce = ref<boolean>(true)

const uiTextField = ref<InstanceType<typeof UiTextField>  | null>(null)

const handleClickOption = (index: number) => {
  const selectedOption = props.options[index]
  if (!selectedOption) return
  searchInput.value = selectedOption.label
  emit('click:option', selectedOption.value)
  uiTextField.value?.onFocus()
  onCloseMenu()
}

const handleUpdateModelValue = (newValue: string | null) => {
  if (flagOnce.value) flagOnce.value = false
  emit('update:search', newValue)
}

const onCloseMenu = () => {
  showMenu.value = false
}

const onClearSearch = () => {
  searchInput.value = null
}

const handleClickRemove = () => {
  onClearSearch()
}

const handleClickArrow = () => {
  if (flagOnce.value) return 
  showMenu.value = !showMenu.value
}

watch(props.options, () => {
  showMenu.value = true
})

onClickOutside(targetMenu, () => {
  onCloseMenu()
})

defineExpose({
  onClearSearch,
});
</script>
<template>
  <div class="app-select" :class="{ 'app-select--active': showMenu }">
    <UiTextField
      ref="uiTextField"
      v-model="searchInput"
      :label="label"
      :placeholder="placeholder"
      :clearable="!!searchInput ? clearable : false"
      @update:model-value="handleUpdateModelValue"
      @click:clear="handleClickRemove"
    >
      <template #select>
        <UiButton
          variant="light"
          class="!w-6 !h-6 px-0 !min-h-6 transition-all rotate-0"
          :class="{'rotate-180': showMenu}"
          @click="handleClickArrow"
        >
          <IconChevronDown class="!w-5 !h-5 text-paragraph" />
        </UiButton>
      </template>
    </UiTextField>
    <div v-if="showMenu" ref="targetMenu" class="app-select__options">
      <div v-if="options.length === 0" class="app-select__option">No hay resultados en la busqueda</div>
      <div
        v-for="(option, index) in options"
        :key="`SELECT_OPTION_${generateUuid()}_${index}`"
        class="app-select__option"
        @click="handleClickOption(index)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.app-select {
  @apply relative z-[120];
  &--active {
    @apply relative z-[121];
  }
  &__activator {
    @apply relative z-[10];
  }
  &__options {
    @apply rounded-md shadow-lg absolute z-[120] bg-white py-1 top-full mt-1;
    @apply w-full left-0 border border-gray-100;
  }
  &__option {
    @apply h-10 px-3 w-full  bg-white whitespace-nowrap;
    @apply text-sm font-light;
    @apply  items-center flex;
    &:hover {
      @apply bg-gray-200 cursor-pointer;
    }
    & + .app-select__option {
      @apply border-t border-gray-200;
    }
  }
}
</style>