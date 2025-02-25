<template>
  <div class="h-[60px] pt-[30px] flex flex-col gap-2">
    <div class="relative w-full px-4">
      <div class="relative w-full" ref="rangeRef">
        <!-- Track -->
        <div class="absolute top-1/2 left-0 right-0 h-1 bg-[#EEEEEE] transform -translate-y-1/2"></div>
        
        <!-- Active Range -->
        <div
          class="absolute top-1/2 h-1 bg-[#8452FD] transform -translate-y-1/2"
          :style="{ left: `${leftPercentage}%`, right: `${100 - rightPercentage}%` }"
        ></div>

        <!-- Left Bullet -->
        <div
          class="absolute w-[10px] h-[10px] border-2 border-[#8452FD] bg-white rounded-full cursor-pointer -top-[5px]"
          :style="{ left: `calc(${leftPercentage}% - 5px)` }"
          @mousedown="startDrag('min')"
          @touchstart="startDrag('min')"
        >
          <div class="tooltip"><span class="text-sm font-normal">{{ formatNumber(minValue) }}</span></div>
        </div>

        <!-- Right Bullet -->
        <div
          class="absolute w-[10px] h-[10px] border-2 border-[#8452FD] bg-white rounded-full cursor-pointer -top-[5px]"
          :style="{ left: `calc(${rightPercentage}% - 5px)` }"
          @mousedown="startDrag('max')"
          @touchstart="startDrag('max')"
        >
          <div class="tooltip"><span class="text-sm font-normal">{{ formatNumber(maxValue) }}</span></div>
        </div>
      </div>
    </div>
    <div class="flex justify-between text-[#666666]">
      <span class="text-sm font-normal">$ {{ formatNumber(minValue) }}</span>
      <span class="text-sm font-normal">$ {{ formatNumber(maxValue) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

const props = defineProps({
  min: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
  step: {
    type: Number,
    required: true
  },
});

const emit = defineEmits(['update:minValue', 'update:maxValue']);

// Valores iniciales de los bullets
const minValue = ref(props.min);
const maxValue = ref(props.max);

const isDragging = ref<'min' | 'max' | null>(null);

const rangeRef = ref<HTMLDivElement | null>(null);

// Calcular el porcentaje para la posición de los bullets
const leftPercentage = computed(() => ((minValue.value - props.min) / (props.max - props.min)) * 100);
const rightPercentage = computed(() => ((maxValue.value - props.min) / (props.max - props.min)) * 100);

// Iniciar el drag para el bullet seleccionado
const startDrag = (thumb: 'min' | 'max') => {
  isDragging.value = thumb;
};

const onDrag = (e: MouseEvent | TouchEvent) => {
  if (isDragging.value) {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const rangeWidth = rangeRef.value!.offsetWidth;
    const rangeLeft = rangeRef.value!.getBoundingClientRect().left;

    const percentage = ((clientX - rangeLeft) / rangeWidth) * 100;
    const newValue = Math.round(((percentage / 100) * (props.max - props.min) + props.min) / props.step) * props.step;

    if (isDragging.value === 'min' && newValue < maxValue.value && newValue >= props.min) {
      minValue.value = newValue;
      emit('update:minValue', minValue.value);
    } else if (isDragging.value === 'max' && newValue > minValue.value && newValue <= props.max) {
      maxValue.value = newValue;
      emit('update:maxValue', maxValue.value);
    }
  }
};

const formatNumber = (num: number | string) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const stopDrag = () => {
  isDragging.value = null;
};

onMounted(() => {
  window.addEventListener('mousemove', onDrag);
  window.addEventListener('mouseup', stopDrag);
  window.addEventListener('touchmove', onDrag);
  window.addEventListener('touchend', stopDrag);
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onDrag);
  window.removeEventListener('mouseup', stopDrag);
  window.removeEventListener('touchmove', onDrag);
  window.removeEventListener('touchend', stopDrag);
});
</script>

<style lang="scss" scoped>
.tooltip {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #8452FD;
  color: white;
  height: 21px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  border-radius: 24px;
  font-size: 12px;
  white-space: nowrap;
  span {

  }
}

.tooltip::after {
  content: '';
  position: absolute;
  bottom: -11px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px;
  border-style: solid;
  border-color: #8452FD transparent transparent transparent;
}
</style>
