// https://nuxt.com/docs/api/configuration/nuxt-config
import { existsSync, readFileSync } from 'node:fs'

const SITE_URL = 'https://rumbo.la'

// One route per position synced from Notion (scripts/sync-jobs.mjs) so detail pages are
// prerendered and listed in the sitemap.
const JOBS_FILE = './content/jobs.json'
const jobRoutes: string[] = existsSync(JOBS_FILE)
  ? JSON.parse(readFileSync(JOBS_FILE, 'utf8')).map((job: { slug: string }) => `/careers/${job.slug}`)
  : []

export default defineNuxtConfig({
  compatibilityDate: '2026-09-01',
  devtools: { enabled: true },
  ssr: true,
  nitro: {
    preset: 'static',
    prerender: {
      // List every locale variant explicitly so all detail pages are generated.
      routes: jobRoutes.flatMap((r) => [r, `/en${r}`, `/es${r}`]),
    },
  },
  site: {
    url: SITE_URL,
    name: 'Rumbo',
  },
  app: {
    head: {
      title: 'Rumbo',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', type: 'image/png', href: '/apple-touch-icon-180x180.png' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap' },
      ],
    },
  },
  modules: ['@nuxt/eslint', '@nuxtjs/i18n', '@nuxtjs/tailwindcss', '@nuxtjs/sitemap'],
  css: ['~/assets/scss/main.scss'],
  typescript: {
    typeCheck: true,
  },
  eslint: {
    config: {
      stylistic: false,
    },
  },
  sitemap: {
    urls: jobRoutes.map((loc) => ({ loc, _i18nTransform: true })),
  },
  i18n: {
    baseUrl: SITE_URL,
    locales: [
      { code: 'en', language: 'en', name: 'English', file: 'en.json' },
      { code: 'es', language: 'es', name: 'Español', file: 'es.json' },
    ],
    defaultLocale: 'en',
    // Every locale gets a URL prefix; the default locale is also served without prefix.
    strategy: 'prefix_and_default',
    compilation: {
      strictMessage: false,
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      redirectOn: 'root',
    },
  },
})
