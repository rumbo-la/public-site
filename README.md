# Rumbo — sitio público

Sitio de marketing de [rumbo.la](https://rumbo.la): staffing y recruiting de talento digital en Latinoamérica.

## Stack

| Pieza | Versión | Notas |
| --- | --- | --- |
| [Nuxt](https://nuxt.com) | 4.5 | Generado como sitio estático (`nitro.preset: 'static'`). Vue 3.5 y TypeScript 5.9. |
| `@nuxtjs/i18n` | 10 | Inglés por defecto sin prefijo, español en `/es/...`. Mensajes en `i18n/locales/`. |
| `@nuxtjs/sitemap` | 8 | Genera `sitemap_index.xml` en cada build. `public/robots.txt` apunta a él. |
| `@nuxtjs/tailwindcss` | 6 | Tailwind CSS 3. Tema en `tailwind.config.ts` y `tailwind/`. Un único SCSS global en `app/assets/scss/main.scss`. |
| `@nuxt/eslint` | 1 | ESLint 9 con la config plana de `eslint.config.mjs`. Prettier para formato y `vue-tsc` para typecheck. |
| `keen-slider` | 6 | Carrusel de expertos en Comunidad. |
| `sharp` | dev | Solo para `scripts/optimize-images.mjs`. |

Requiere Node 20.19 o superior (`engines` en `package.json`). CI usa Node 22.

## Estructura

```
app/
  app.vue            Google Analytics y cabecera i18n (lang, canonical, hreflang)
  layouts/           default: cabecera, pie y banner de cookies
  pages/             index, staffing, recruiting, why-rumbo, community, t-c
  components/        secciones por página (Home*, Common*, Staffing*, Recruiting*,
                     Community*, WhyRumbo*), Contact* y JoinUs* (modales), ui/ e icon/
  composables/       usePageSeo, useCookieConsent, useContact, useJoin, useApp,
                     useRumboService, useTypePartner
  constants/         meta por página, clientes, expertos, disciplinas, FAQ, países,
                     opciones de formularios y URLs externas
  helpers/           validaciones, utilidades de modal y teclado
  types/             tipos compartidos y globals.d.ts (gtag, dataLayer)
  assets/scss/       main.scss (fuentes y resets)
i18n/locales/        en.json, es.json
public/              favicons, fuentes, imágenes, robots.txt, .htaccess
scripts/             optimize-images.mjs
tailwind/            colores, tamaños, fuentes y constantes del tema
.github/workflows/   ci.yml: lint, typecheck y generate en cada push y PR
```

## Comandos

```bash
npm install              # instala y ejecuta `nuxt prepare`
npm run dev              # http://localhost:3000
npm run generate         # build estática en .output/public
npm run preview          # sirve la build estática
npm run lint             # eslint (npm run lint:fix para corregir lo automático)
npm run typecheck        # vue-tsc sobre todo el proyecto
npm run format           # prettier sobre app/ y la configuración
npm run images:optimize  # convierte los assets pesados de public/images a WebP
```

## Dónde se edita el contenido

| Contenido | Archivo | Cómo |
| --- | --- | --- |
| Textos de las páginas | `i18n/locales/es.json` y `en.json` | Misma clave en ambos idiomas. Se admite HTML sencillo (`<b>`, `<br />`) en las claves que se renderizan con `v-html`. |
| Título, descripción y keywords por página | `app/constants/meta.ts` | Campos `_es` y `_en`. Cada página llama a `usePageSeo('CLAVE')`. |
| Logos de clientes | `app/constants/clients.ts` | Añadir `{ file, name }` y dejar el SVG en `public/images/clients/<file>.svg`. El carrusel se ajusta solo. |
| Expertos de la comunidad | `app/constants/experts.ts` | Foto en `public/images/community/experts/<profile>.webp` y logos en `.svg`. |
| Disciplinas y roles | `app/constants/disciplines.ts` | Roles a tiempo completo en `children`, roles fractional en `childrenFractional`. |
| Preguntas frecuentes | `app/constants/faq.ts` | Listas separadas `faqs_es` y `faqs_en`. |
| Términos y condiciones | `app/pages/t-c.vue` | Bloques separados por idioma dentro de la misma página. |
| Imágenes pesadas | `public/images/` | Tras añadir un PNG o JPG grande, ejecutar `npm run images:optimize` y referenciar el `.webp`. |

## Integraciones externas

| Qué | Dónde | Notas |
| --- | --- | --- |
| Google Analytics `G-EP076L8Y45` | `app/app.vue` | Consentimiento en `denied` hasta que el visitante acepta el banner (`CookieConsent.vue`). La elección se guarda en `localStorage` con la clave `rumbo_cookie_consent`. |
| Calendly | `app/constants/calendly.ts` | Todos los botones "Let's talk" y "Schedule a call" abren esta URL. |
| Feathery | `app/composables/useTypePartner.ts`, `CommonLookingForYou.vue` | Formularios de postulación de partners. |
| Google Apps Script | `ContactForm.vue`, `JoinUsStepThree.vue` | Recibe los formularios de contacto y de unión. Estos modales existen en el código pero hoy no se renderizan en ninguna página. |
| WhatsApp | `ContactDefault.vue` | Número +51 939 940 669. |
| Google Fonts | `nuxt.config.ts` | Space Grotesk. DxGrafik se sirve desde `public/fonts/`. |

## SEO

- `usePageSeo` fija título, descripción, keywords y Open Graph por idioma.
- `app.vue` añade `lang`, canonical y alternates hreflang con `useLocaleHead`.
- El sitemap se genera en la build con una entrada por idioma. Google debe apuntar a `https://rumbo.la/sitemap_index.xml`.

## Despliegue

`npm run generate` deja el sitio completo en `.output/public`. Es HTML estático, así que sirve en cualquier hosting:

- **Apache** (actual): subir el contenido de `.output/public`. `public/.htaccess` fuerza HTTPS.
- **Cloudflare Pages / Netlify / Vercel**: comando de build `npm run generate`, directorio de salida `.output/public`, Node 22.

El workflow `.github/workflows/ci.yml` ejecuta lint, typecheck y generate en cada push y PR, y publica la build como artefacto durante siete días.

## Ramas

- `main`: versión publicada en rumbo.la, todavía sobre Nuxt 3.
- `feat/new-site`: migración a Nuxt 4, lint, imágenes optimizadas, banner de cookies y logos de clientes actualizados.

## Pendientes conocidos

- Los modales de contacto y de unión (`Contact*.vue`, `JoinUs*.vue`, `useContact`, `useJoin`, `constants/joinus.ts`, `constants/countries.ts`) no se muestran en ninguna página. Decidir si se eliminan o se vuelven a conectar.
- La versión en español de términos y condiciones necesita revisión legal.
- En la versión en español quedan textos en inglés: el titular de la home en `es.json` y el botón "Let's talk" en `StaffingInfo.vue` y `RecruitingInfo.vue`.
- Los cuatro logos de clientes con imagen incrustada (Assa, Protecta, Crecer Seguros y Parque del Recuerdo) pesan entre 25 y 60 KB. Sustituir por vectoriales si se consiguen.
