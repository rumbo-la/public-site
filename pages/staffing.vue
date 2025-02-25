<script lang="ts" setup>
import {META_PAGE} from '~/constants/meta'

useHead({
  title: META_PAGE.STAFFING.title_en,
  meta: [{ hid: "description", name: "description", content: META_PAGE.STAFFING.description_en }],
})

const isFractional = ref<boolean>(false)

const handleSelectFractional = (value: boolean) => {
  isFractional.value = value
}
</script>
<template>
  <div class="flex flex-col w-full">
    <StaffingInfo />
    <CommonClients />
    <StaffingModalities @click:select="handleSelectFractional"/>
    <CommonRolesPractices :is-fractional="isFractional"  />
    <CommonFaq />
    <CommonLetsTalk />
  </div>
</template>
<style lang="scss" scoped>
</style>