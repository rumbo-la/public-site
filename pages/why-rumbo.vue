<script lang="ts" setup>
import {META_PAGE} from '~/constants/meta'

useHead({
  title: META_PAGE.WHY_RUMBO.title_en,
  meta: [{ hid: "description", name: "description", content: META_PAGE.WHY_RUMBO.description_en }],
})

</script>
<template>
  <div class="flex flex-col w-full">
    <WhyRumboInfo />
    <CommonClients />
    <HomeDigitalEquipment />
    <CommunityPractitioners />
    <WhyRumboChart />
    <CommonRumboVsOther  />
    <HomeRumboServices />
    <CommonRolesPractices  />
    <CommonLookingForYou />
  </div>
</template>
<style lang="scss" scoped>
</style>