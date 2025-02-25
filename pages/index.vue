<script lang="ts" setup>
import {META_PAGE} from '~/constants/meta'

useHead({
  title: META_PAGE.HOME.title_en,
  meta: [{ hid: "description", name: "description", content: META_PAGE.HOME.description_en }],
})
</script>
<template>
  <div class="flex flex-col w-full">
    <HomeInfo />
    <CommonClients />
    <HomeRumboServices />
    <HomeDigitalEquipment />
    <HomeStartManaging />
    <CommonRumboVsOther  />
    <CommonRolesPractices  />
    <CommonLetsTalk />
    <CommonLookingForYou />
  </div>
</template>