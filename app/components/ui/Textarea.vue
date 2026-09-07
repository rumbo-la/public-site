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

const onFocus = () => {
  if (!inputRef.value) return
  inputRef.value.focus()
}

defineExpose({
  onFocus
})
</script>
<template>
  <div class="ui-textarea">
    <div
      v-if="$slots.label"
      class="ui-textarea__label"
    >
      <slot name="label"/>
    </div>
    <label v-if="!!label" :for="id" class="ui-textarea__label">{{ label }}</label>
    <div
      class="ui-textarea__wrapper"
      :class="{
        '!border-primary': active && !hasError,
        '!border-[#B42318]': hasError
      }"
    >
      <textarea
        :id="id"
        ref="inputRef"
        v-model="localValue"
        :type="localType"
        :name="name" 
        class="ui-textarea__input"
        :placeholder="placeholder"
        :readonly="readonly"
        :focus="focus"
        row="3"
        @input="handleInput"
        @focus="handleFocus"
      />
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
.ui-textarea{
  @apply flex flex-col gap-1;
  &__label {
    @apply block text-base font-normal text-black;
  }
  &__input {
    @apply flex-1 text-base rounded-2xl block w-full px-2.5 pt-2 h-[80px] focus:outline-0;
  }
  &__wrapper{
    @apply flex bg-white border border-[#aaaaaa] rounded-2xl;
  }
}
</style>