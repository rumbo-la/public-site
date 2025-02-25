<script setup lang="ts">
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['close']);
const isVisible = ref(props.show);

watch(
  () => props.show,
  (newVal) => {
    isVisible.value = newVal;
  }
);

const closeModal = () => {
  isVisible.value = false;
  emit('close', false);
};
</script>
<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
      <div class="flex justify-between items-center mb-4">
        <slot name="header">
          <h3 class="text-xl font-semibold">Titulo</h3>
          <UiButton variant="text" color="black" size="sm" @click="closeModal">&times;</UiButton>
        </slot>
      </div>
      <div class="mb-4">
        <slot>Default Content</slot>
      </div>
      <div class="flex w-full">
        <slot name="footer">
          <div class="flex justify-end">
            <UiButton @click="closeModal" color="gray-300" variant="text">
              Cerrar
            </UiButton>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>