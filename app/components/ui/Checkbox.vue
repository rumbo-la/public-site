<script setup lang="ts">
interface Props {
  id?: string;
  value: string;
  modelValue?: string[];
  label?: string;
  position?: 'left' | 'right';
}

const props = withDefaults(defineProps<Props>(), {
  position: 'right'
});

const emit = defineEmits(['update:model-value']);

// const providedModelValue = inject<string[]>('modelValue', props.modelValue || []);
const checkboxGroup = inject<{
  updateModelValue: (newValue: string[]) => void;
  providedModelValue: ComputedRef<string[]>;
}>('checkboxGroup');


const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const newValue = [...(checkboxGroup?.providedModelValue.value || [])];
  if (target.checked) {
    newValue.push(props.value);
  } else {
    const index = newValue.indexOf(props.value);
    if (index !== -1) {
      newValue.splice(index, 1);
    }
  }

  if (checkboxGroup?.updateModelValue) {
    checkboxGroup?.updateModelValue(newValue);
  } else {
    emit('update:model-value', newValue);
  }
};
</script>
<template>
  <div class="app-checkbox">
    <label v-if="position === 'left'" :for="id" class="app-checkbox__label">
      <slot>{{ label }}</slot>
    </label>
    <input
      :id="id"
      type="checkbox"
      class="app-checkbox__input"
      :value="value"
      @change="handleChange"
    >
    <label v-if="position === 'right'" :for="id" class="app-checkbox__label">
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>
<style lang="scss" scoped>
.app-checkbox {
  @apply flex gap-2 items-center;
  &__label {
    @apply font-normal;
  }
  &__input {
    @apply w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-md focus:ring-blue-500 focus:ring-2;
  }
}
</style>