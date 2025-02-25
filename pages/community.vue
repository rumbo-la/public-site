<script lang="ts" setup>
import {META_PAGE} from '~/constants/meta'

useHead({
  title: META_PAGE.COMMUNITY.title_en,
  meta: [{ hid: "description", name: "description", content: META_PAGE.COMMUNITY.description_en }],
})

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