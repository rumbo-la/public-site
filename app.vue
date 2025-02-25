<script setup>
import { useHead } from '#imports';

useHead({
  __dangerouslyDisableSanitizersByTagID: {
    'google-analytics-init': ['innerHTML']
  },
  script: [
    {
      type: 'text/javascript',
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}

        gtag('consent', 'default', {
          ad_storage: 'granted',
          analytics_storage: 'granted',
        })
        gtag('js', new Date());
        gtag('config', 'G-EP076L8Y45');
      `,
      id: 'google-analytics-init'
    }
  ],
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>