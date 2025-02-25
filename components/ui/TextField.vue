<script setup lang="ts">
// import { PropType } from 'vue';
// import BtnVariant from '@/types/ui/button'

interface Props {
  modelValue: string | null
  loading?: boolean
  disabled?: boolean
  placeholder?: string
  clearable?: boolean
  readonly?: boolean
  active?: boolean
  label?: string
  name?: string
  type?: string
  id?: string
  hasError?: boolean
  hint?: string
}

const props = withDefaults(defineProps<Props>(),
{
  type: 'text',
  label: '',
  active: false,
  clearable: false,
  readonly: false
}) 


const localValue = computed({
  get() {
    return props.modelValue;
  },
  set(newValue: string | null) {
    emit('update:model-value', newValue);
  },
})

const localType = ref<string>(props.type)

const focus = ref<boolean>(false)
const inputRef = ref<HTMLInputElement | null>(null)

const emit = defineEmits<{
  (e: 'click'): void
  (e: 'click:clear'): void
  (e: 'update:model-value', val: string | null): void
  (e: 'focus', val: FocusEvent): void
  (e: 'input', val: Event): void
}>()

const handleInput = (event: Event) => {
  // const target = event.target as HTMLInputElement;
  emit('input', event);
};

const handleFocus = (event: FocusEvent) => {
  emit('focus', event);
}

const handleClickClear = () => {
  emit('click:clear');
}

const isPasswordType = computed(() => {
  return props.type === 'password'
})

const onFocus = () => {
  if (!inputRef.value) return
  console.log(inputRef.value)
  inputRef.value.focus()
}

const handleChangeType = () => {
  localType.value = localType.value === 'text' ? 'password' : 'text'
}

defineExpose({
  onFocus
})
</script>
<template>
  <div class="ui-text-field ">
    <div
      v-if="$slots.label"
      class="block text-base font-normal text-black"
    >
      <slot name="label"></slot>
    </div>
    <label v-if="!!label" :for="id" class="ui-text-field__label">{{ label }}</label>
    <div
      class="ui-text-field__wrapper"
      :class="{
        '!border-primary': active && !hasError,
        '!border-[#B42318]': hasError
      }"
    >
      <div
        v-if="$slots.prepend"
        class="flex gap-1 h-100 items-center border-r px-3"
        :class="{
        '!border-primary': active && !hasError,
        '!border-[#B42318]': hasError
        }"
      >
        <slot name="prepend"></slot>
      </div>
      <input
        ref="inputRef"
        v-model="localValue"
        :type="localType"
        :id="id"
        :name="name" 
        class="ui-text-field__input"
        :placeholder="placeholder"
        :readonly="readonly"
        :value="modelValue"
        :focus="focus"
        @input="handleInput"
        @focus="handleFocus"
      />
      <div v-if="$slots.select || clearable || isPasswordType" class="flex gap-1 h-100 items-center pr-3">
        <UiButton
          v-if="clearable"
          @click="handleClickClear"
          class="!w-6 !h-6 px-0 !min-h-6 !bg-transparent"
        >
          <IconClose class="w-5 h-5 text-paragraph" />
        </UiButton>
        <UiButton
          v-if="isPasswordType"
          variant="text"
          class="!w-6 !h-6 !px-0 !min-h-6 !bg-transparent"
          @click="handleChangeType"
        >
          <div class="w-5 h-5 text-black-20" :class="localType === 'password' ? 'icon-invisible' : 'icon-visible'"></div>
        </UiButton>
        <slot name="select"></slot>
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
<style lang="css" scoped>
.ui-text-field{
  @apply flex flex-col gap-1;
  &__label {
    @apply block text-base font-normal text-black;
  }
  &__input {
    @apply flex-1 text-base rounded-2xl block w-full px-2.5 h-12 focus:outline-0;
  }
  &__wrapper{
    @apply flex bg-white border border-[#aaaaaa] rounded-2xl;
  }
}
</style>