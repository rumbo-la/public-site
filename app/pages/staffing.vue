<script lang="ts" setup>
usePageSeo('STAFFING')

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