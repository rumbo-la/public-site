# Rumbo — sitio público

Sitio de marketing de [rumbo.la](https://rumbo.la): staffing y recruiting de talento digital en Latinoamérica.

## Stack

- [Nuxt 4](https://nuxt.com) generado como sitio estático (`nitro.preset: 'static'`), Vue 3 y TypeScript.
- Tailwind CSS 3 (`tailwind.config.ts` + `tailwind/`) y un único archivo SCSS global en `app/assets/scss/main.scss`.
- `@nuxtjs/i18n` con inglés (por defecto, sin prefijo) y español (`/es/...`). Mensajes en `i18n/locales/`.
- `@nuxtjs/sitemap` genera `sitemap_index.xml` en cada build. `public/robots.txt` apunta a él.
- ESLint 9 vía `@nuxt/eslint`, Prettier y `vue-tsc` para typecheck.

## Estructura

```
app/
  app.vue            Google Analytics y cabecera i18n (lang, canonical, hreflang)
  pages/             index, staffing, recruiting, why-rumbo, community, t-c
  components/        secciones por página (Home*, Common*, Staffing*, ...), ui/ e icon/
  composables/       usePageSeo, useCookieConsent, useContact, useJoin, useApp
  constants/         meta por página, países, opciones de formularios, URLs externas
  assets/scss/       main.scss (fuentes y resets)
i18n/locales/        en.json, es.json
public/              favicons, fuentes, imágenes, robots.txt, .htaccess
scripts/             optimize-images.mjs
```

## Comandos

```bash
npm install          # instala y ejecuta `nuxt prepare`
npm run dev          # http://localhost:3000
npm run generate     # build estática en .output/public
npm run preview      # sirve la build estática
npm run lint         # eslint (npm run lint:fix para corregir)
npm run typecheck    # vue-tsc
npm run images:optimize  # convierte los assets pesados de public/images a WebP
```

Requiere Node 20.19 o superior.

## Integraciones externas

| Qué | Dónde | Notas |
| --- | --- | --- |
| Google Analytics `G-EP076L8Y45` | `app/app.vue` | Consentimiento en `denied` hasta que el visitante acepta el banner (`CookieConsent.vue`). La elección se guarda en `localStorage`. |
| Calendly | `app/constants/calendly.ts` | Todos los botones "Let's talk" y "Schedule a call" abren esta URL. |
| Feathery | `app/composables/useTypePartner.ts`, `CommonLookingForYou.vue` | Formularios de postulación de partners. |
| Google Apps Script | `ContactForm.vue`, `JoinUsStepThree.vue` | Recibe los formularios de contacto y de unión. Estos modales existen pero hoy no se renderizan en ninguna página. |
| WhatsApp | `ContactDefault.vue` | Número +51 939 940 669. |

## SEO por página

Cada página llama a `usePageSeo('CLAVE')`. Títulos, descripciones y keywords por idioma viven en `app/constants/meta.ts`. `app.vue` añade `lang`, canonical y alternates hreflang según el locale activo.

## Despliegue

`npm run generate` deja el sitio completo en `.output/public`. Es HTML estático, así que sirve en cualquier hosting:

- **Apache** (actual): subir el contenido de `.output/public`. `public/.htaccess` fuerza HTTPS.
- **Cloudflare Pages / Netlify / Vercel**: comando de build `npm run generate`, directorio de salida `.output/public`, Node 22. El workflow de GitHub Actions en `.github/workflows/ci.yml` ejecuta lint, typecheck y generate en cada push y PR, y publica la build como artefacto.
