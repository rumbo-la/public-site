<script lang="ts" setup>
import {META_PAGE} from '~/constants/meta'

useHead({
  title: META_PAGE.RECRUITING.title_en,
  meta: [{ hid: "description", name: "description", content: META_PAGE.RECRUITING.description_en }],
})

</script>
<template>
  <div class="flex flex-col w-full">
    <RecruitingInfo />
    <CommonClients />
    <RecruitingModalities />
    <CommonRolesPractices  />
    <CommonFaq />
    <CommonLetsTalk />
  </div>
</template>
<style lang="scss" scoped>
</style>