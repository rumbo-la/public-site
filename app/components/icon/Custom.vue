<template>
  <div
    class="icon-customer"
    :class="{
      [`${width}`]: true,
      [`${height}`]: true
    }"
  >
    <img
      v-if="!canChangeCss"
      class="block max-w-full"
      :src="srcImg"
      :alt="alt"
    >
    <template v-if="canChangeCss">
      <img
        class="block max-w-full iconNormal"
        :src="`/images/icons/${name}-${colorNormal}${extension}`"
        :alt="alt"
      >
      <img
        class="block max-w-full iconActive"
        :src="`/images/icons/${name}-${colorActive}${extension}`"
        :alt="alt"
      >
    </template>
  </div>
</template>
<script setup lang="ts">
interface Props {
  name?: string;
  canChangeCss?: boolean;
  isActive?: boolean;
  colorNormal?: string;
  colorActive?: string;
  extension?: string;
  alt?: string;
  width?: string;
  height?: string;
}

const props = withDefaults(defineProps<Props>(), {
  name: 'icon-',
  canChangeCss: false,
  isActive: false,
  colorNormal: 'gray',
  colorActive: 'blue',
  extension: '.png',
  alt: 'Aprendemás',
  width: 'w-6',
  height: 'h-6'
})
const srcImg = computed(() => {
  const colorIcon = props.isActive ? props.colorActive : props.colorNormal;
  return `/images/icons/${props.name}-${colorIcon}${props.extension}`;
})
</script>
