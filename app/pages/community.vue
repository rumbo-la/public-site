<script lang="ts" setup>
usePageSeo('COMMUNITY')

</script>
<template>
  <div class="flex flex-col w-full">
    <CommunityInfo />
    <CommunityWantToPartner />
    <CommunityExclusiveBenefits />
    <CommunityPractitioners />
    <CommonLookingForYou :is-community="true" />
  </div>
</template>
<style lang="scss" scoped>
</style>