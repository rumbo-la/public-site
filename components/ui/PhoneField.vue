<script setup lang="ts">
import { watch, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { generateUuid } from '~/helpers/generateUuid'
import type { SelectOption } from '~/types/ui/select';
import type { ICountry } from "~/types/contry";
import { countries } from '~/constants/countries'

interface Props {
  prefix: string | null
  phoneNumber: string | null
  placeholder?: string
  id?: string
  label?: string
  limit?: number
  clearable?: boolean
  hasError?: boolean
  hint?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  multiple: false,
  placeholder: '',
  limit: 1
});

const emit = defineEmits<{
  (e: 'update:prefix', val: string | null): void
  (e: 'update:phoneNumber', val: string | null): void
}>()

const target = ref(null)
const showMenu = ref<boolean>(false)
const searchInput = ref<string | null>(null)
const localPrefix = ref<string | null>('')
const selectedOptionMultiple = ref<string[]>([])
// const selectedOption = ref<any>(null)

onClickOutside(target, () => {
  onCloseMenu()
})


const phoneOptions = computed<SelectOption[]>(() => {
  return countries.map((country: ICountry) => {
    return {
      label: `${country.code_phone} ${country.name}`,
      value: country.code_phone,
    }
  })
})

const handleClickOption = (index: number) => {
  const selectedOption = phoneOptions.value[index]
  // searchInput.value = selectedOption.label
  onCloseMenu()
  if (!selectedOption.value) return
  localPrefix.value =  selectedOption.value
  emit('update:prefix', selectedOption.value)
}

const onCloseMenu = () => {
  showMenu.value = false
}

const handleUpdateModelValue = (newValue: string | null) => {
  emit('update:phoneNumber', newValue)
}

const handleClickArrow = () => {
  showMenu.value = !showMenu.value
}

const handleClickRemove = () => {
  searchInput.value = null
  emit('update:phoneNumber', null)
}

watch(() => props.prefix, () => {
  if (!localPrefix.value) localPrefix.value = props.prefix
})


onMounted(() => {
  if (props.phoneNumber) {
    // if (props.multiple) selectedOptionMultiple.value = props.phoneNumber.split(',')
    searchInput.value = props.phoneNumber
  }
  localPrefix.value = props.prefix
})

</script>
<template>
  <div class="app-phone-number" :class="{ 'app-phone-number--active': showMenu }">
    <label
      v-if="$slots.label"
      class="block text-base font-medium text-black mb-1"
    >
      <slot name="label"></slot>
    </label>
    <label v-if="!!label" :for="id" class="ui-text-field__label">{{ label }}</label>
    <div class="app-phone-number__wrapper">
      <div
        class="app-phone-number__prefix"
        :class="{
          '!border-primary': searchInput,
          '!border-[#B42318]': hasError && hint,
          '!border-[#aaaaaa]': !(hasError && hint)
        }"
      >
        <div class="flex flex-1 gap-2 items-center flex-wrap">
          <span
            class="text-base text-black font-normal"
          >{{ localPrefix  }}</span>
        </div>
        <UiButton
          @click="handleClickArrow"
          variant="light"
          class="!w-6 !h-6 px-0 !min-h-6 transition-all rotate-0 !bg-transparent"
          :class="{'rotate-180': showMenu}"
        >
          <IconChevronDown class="!w-5 !h-5 text-paragraph" />
        </UiButton>
      </div>
      <UiTextField
        v-model="searchInput"
        :id="id"
        :placeholder="placeholder"
        :clearable="!!searchInput"
        :active="!!searchInput"
        :has-error="hasError"
        @update:model-value="handleUpdateModelValue"
        @click:clear="handleClickRemove"
      >
      </UiTextField>
    </div>
    <div v-if="showMenu" ref="target" class="app-phone-number__options">
      <div
        v-for="(option, index) in phoneOptions"
        :key="`SELECT_OPTION_${generateUuid()}_${index}`"
        class="app-phone-number__option"
        :class="{
          'active': prefix === option.value
        }"
        @click="handleClickOption(index)"
      >
        {{ option.label }}
      </div>
    </div>
    <div
      v-if="hasError && hint"
      class="relative w-full block mt-1 text-[#B42318] text-xs"
    >
      {{ hint }}
    </div>
  </div>
</template>
<style lang="scss" scoped>
.app-phone-number {
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
  &__wrapper {
    @apply flex flex-row;
  }
  &__prefix {
    @apply flex bg-white border rounded-tl-2xl rounded-bl-2xl items-center border-r-0 gap-2;
    @apply px-3;
  }
  &__options {
    @apply rounded-md shadow-lg absolute z-[120] bg-white py-1 top-full mt-1 max-h-[180px] max-w-min;
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
  &:deep(.ui-text-field) {
    @apply w-full;
  }
  &:deep(.ui-text-field__input) {
    @apply rounded-tl-none rounded-bl-none;
  }
  &:deep(.ui-text-field__wrapper) {
    @apply rounded-tl-none rounded-bl-none;
  }
}
</style>