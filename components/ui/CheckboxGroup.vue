<script setup lang="ts">
interface Props {
  modelValue: string[];
}
const props = defineProps<Props>();

const emit = defineEmits(['update:model-value']);

const updateModelValue = (newValue: string[]) => {
  console.log('checkboxGroup', newValue)
  emit('update:model-value', newValue);
};

const providedModelValue = computed<string[]>(() => {
    return props.modelValue || []
  })

// provide('updateModelValue', updateModelValue);
provide('checkboxGroup', {
  updateModelValue,
  providedModelValue
});

</script>
<template>
  <div>
    <slot></slot>
  </div>
</template>
<style scoped>
/* Estilos adicionales si es necesario */
</style>