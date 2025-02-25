<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { generateUuid } from '~/helpers/generateUuid'
import type { SelectOption } from '~/types/ui/select';

interface Props {
  modelValue: string | null
  options: SelectOption[]
  placeholder?: string
  id?: string
  label?: string
  limit?: number
  disabled?: boolean
  multiple?: boolean
  clearable?: boolean
  hasError?: boolean
  hint?: string
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  modelValue: null,
  multiple: false,
  placeholder: '',
  limit: 1
});

const emit = defineEmits<{
  (e: 'click:option', val: SelectOption): void
  (e: 'update:search', val: string | null): void
  (e: 'update:model-value', val: string): void
}>()

const target = ref(null)
const clickInside = ref<boolean>(false)
const showMenu = ref<boolean>(false)
const searchInput = ref<string | null>(null)
const selectedOptionMultiple = ref<string[]>([])
// const selectedOption = ref<any>(null)

onClickOutside(target, () => {
  onCloseMenu()
})


const handleClickOption = (index: number) => {
  if (props.multiple) {
    const selectedOption = props.options[index]
    if (selectedOptionMultiple.value.includes(selectedOption.label)) {
      const findIndex = selectedOptionMultiple.value.findIndex((e) => e === selectedOption.label)
      selectedOptionMultiple.value.splice(findIndex, 1)
      emit('update:model-value', selectedOptionMultiple.value.join(', '))
      return
    }
    if ((selectedOptionMultiple.value.length + 1) > props.limit) return
    selectedOptionMultiple.value.push(selectedOption.label)
    emit('update:model-value', selectedOptionMultiple.value.join(', '))

    return
  }
  const selectedOption = props.options[index]
  searchInput.value = selectedOption.label
  emit('click:option', selectedOption)
  emit('update:model-value', searchInput.value)
  onCloseMenu()
}

const onCloseMenu = () => {
  showMenu.value = false
}

const handleUpdateModelValue = (newValue: string | null) => {
  emit('update:search', newValue)
}

const handleClickArrow = () => {
  if (props.disabled) return
  showMenu.value = !showMenu.value
}

const handleClickRemove = () => {
  searchInput.value = null
}

const clearSelected = () => {
  searchInput.value = null
  selectedOptionMultiple.value = []
}

onMounted(() => {
  if (props.modelValue) {
    if (props.multiple) selectedOptionMultiple.value = props.modelValue.split(',')
    searchInput.value = props.modelValue
  }
})

defineExpose({
  clearSelected
})

</script>
<template>
  <div class="app-select" :class="{ 'app-select--active': showMenu }" ref="target">
    <label
      v-if="$slots.label"
      class="block text-base font-normal text-black mb-1"
    >
      <slot name="label"></slot>
    </label>
    <div
      v-if="multiple"
      class="flex bg-white border rounded-2xl p-3 items-center"
      :class="{
        'justify-end': selectedOptionMultiple.length === 0,
        '!border-primary': selectedOptionMultiple.length >= 1,
        'justify-between': selectedOptionMultiple.length >= 1,
        '!border-[#B42318]': !disabled && hasError && hint,
        '!border-[#aaaaaa]': !(hasError && hint) && selectedOptionMultiple.length === 0
      }"
    >
      <div class="flex flex-1 gap-2 items-center flex-wrap">
        <span
          v-if="selectedOptionMultiple.length === 0"
          class="text-base text-[#AAAAAA] font-normal"
        >{{ placeholder  }}</span>
        <span
          v-for="(item, index) in selectedOptionMultiple"
          class="py-1 px-2 bg-[#F0EFFF] rounded-3xl text-base font-normal text-black"
          :key="`SELECTED_OPTION_${index}`"
        >{{ item }}</span>
      </div>
      <UiButton
        @click.stop="handleClickArrow"
        variant="light"
        class="!w-6 !h-6 px-0 !min-h-6 transition-all rotate-0 !bg-transparent"
        :class="{'rotate-180': showMenu}"
      >
        <IconChevronDown class="!w-5 !h-5 text-paragraph" />
      </UiButton>
    </div>
    <UiTextField
      v-if="!multiple"
      v-model="searchInput"
      :label="label"
      :id="id"
      :placeholder="placeholder"
      :clearable="!!searchInput ? clearable : false"
      :active="!!searchInput"
      readonly
      :has-error="hasError"
      :hint="hint"
      @update:model-value="handleUpdateModelValue"
      @click:clear="handleClickRemove"
    >
      <template v-if="$slots.label" #label>
        <slot name="label"></slot>
      </template>
      <template #select>
        <UiButton
          @click="handleClickArrow"
          variant="light"
          class="!w-6 !h-6 px-0 !min-h-5 transition-all rotate-0 !bg-transparent"
          :class="{'rotate-180': showMenu}"
        >
          <IconChevronDown class="!w-5 !h-5 text-paragraph" />
        </UiButton>
      </template>
    </UiTextField>
    <div v-if="showMenu" class="app-select__options">
      <div
        v-for="(option, index) in options"
        :key="`SELECT_OPTION_${generateUuid()}_${index}`"
        class="app-select__option"
        :class="{
          'active': modelValue === option.value || selectedOptionMultiple.includes(option.value || '')
        }"
        @click="handleClickOption(index)"
      >
        <div
          v-if="multiple"
          class="w-[22px] h-[22px] border-2 border-black rounded-sm flex items-center justify-center over"
          :class="selectedOptionMultiple.includes(option.label) ? 'bg-primary border-primary' : 'bg-white border-gray-300'"
        >
          <!-- SVG del ícono de check que solo se muestra si está seleccionado -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        {{ option.label }}
      </div>
    </div>
    <div
      v-if="!disabled && hasError && hint && multiple"
      class="relative w-full block mt-1 text-[#B42318] text-xs"
    >
      {{ hint }}
    </div>
  </div>
</template>
<style lang="scss" scoped>
.app-select {
  @apply relative z-[120];
  &--active {
    @apply relative z-[121];
  }
  &__input {
    @apply flex gap-3 h-10;
  }
  &__activator {
    @apply relative z-[10];
  }
  &__options {
    @apply rounded-md shadow-lg absolute z-[120] bg-white py-1 top-full mt-1 max-h-[180px];
    @apply overflow-y-auto;
    @apply w-full left-0 border border-gray-100;
  }
  &__option {
    @apply h-10 px-3 w-full  bg-white whitespace-nowrap gap-2;
    @apply text-sm font-light;
    @apply  items-center flex;
    &:hover {
      @apply bg-gray-200 cursor-pointer;
    }
    & + .app-select__option {
      @apply border-t border-gray-200;
    }
    &.active {
      @apply bg-primary/10;
    }
  }
}
</style>