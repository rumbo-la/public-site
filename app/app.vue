<script setup lang="ts">
const GA_ID = 'G-EP076L8Y45'

// <html lang>, canonical and hreflang alternates follow the active locale.
const localeHead = useLocaleHead({ dir: true, seo: true })

useHead(() => ({
  htmlAttrs: { lang: localeHead.value.htmlAttrs?.lang, dir: localeHead.value.htmlAttrs?.dir },
  link: localeHead.value.link ?? [],
  meta: localeHead.value.meta ?? [],
  script: [
    { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}` },
    {
      id: 'google-analytics-init',
      type: 'text/javascript',
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'default', {
          ad_storage: 'denied',
          analytics_storage: 'denied',
          wait_for_update: 500,
        })
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `,
    },
  ],
}))
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
