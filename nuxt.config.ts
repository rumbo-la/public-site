// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true, // El SSR sigue en true para generar las páginas estáticas
  nitro: {
    preset: 'static' // Asegura que Nuxt genere archivos estáticos
  },
  app: {
    head: {
      title: "Rumbo",
      htmlAttrs: {
        lang: "es",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "Rumbo ofrece soluciones de talento flexibles, bajo demanda y con acompañamiento experto, ahorrándote tiempo y dinero.",
        },
        { name: "format-detection", content: "telephone=no" },
        { property: 'og:title', content: 'Rumbo' },
        { property: 'og:description', content: 'Rumbo ofrece soluciones de talento flexibles, bajo demanda y con acompañamiento experto, ahorrándote tiempo y dinero.' },
        { property: 'og:image', content: '/icon-android-192x192.png' },
        { property: 'og:url', content: 'https://rumbo.la' },
        {  property: "og:locale", content: "es_LA" },
        { name: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        {
          hid: "keywords",
          name: "keywords",
          content:
            "Rumbo, staffing, recruiting",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", type: "image/png", href: "/apple-touch-icon-180x180.png" },
        { rel: "shortcut icon", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap' },
      ],
      script: [
        { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-EP076L8Y45' }
      ]
    }
  },
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-keen-slider',
  ],
  css: ['~/assets/scss/main.scss'],
  typescript: {
    typeCheck: true
  },
  // site: {
  //   hostname: 'https://rumbo.la/',
  //   routes: [
  //     '/',
  //     '/recruiting',
  //     '/staffing',
  //     '/community',
  //     '/why-rumbo',
  //   ],
  //   gzip: true,
  //   cacheTime: 1000 * 60 * 60 * 24 * 7,
  // },
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'es',
        name: 'Español',
        file: 'es.json',
      },
    ],
    compilation: {
      strictMessage: false
    },
    defaultLocale: 'en',
    strategy: 'prefix_and_default', // Agrega el prefijo en la URL también para el idioma predeterminado
    lazy: true, // Carga diferida para los archivos de traducción
    langDir: 'locales/', // Directorio donde se almacenan los archivos de idioma
    detectBrowserLanguage: {
      useCookie: true,          // Guarda el idioma en una cookie
      cookieKey: 'i18n_redirected', // Nombre de la cookie para almacenar la preferencia del idioma
      alwaysRedirect: true,      // Redirige siempre si el idioma de la URL no coincide con el predeterminado
      redirectOn: 'root'    // Idioma de respaldo (en caso de que el navegador no tenga preferencia)
    },
  },
})