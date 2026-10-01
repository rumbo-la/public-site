# Rumbo — sitio público

Sitio de marketing de [rumbo.la](https://rumbo.la): staffing y recruiting de talento digital en Latinoamérica, más la sección **Oportunidades** con las posiciones abiertas que se publican desde Notion.

| Entorno | URL | Se publica desde |
| --- | --- | --- |
| Producción | https://rumbo.la | `main` → cPanel por FTP |
| Beta | https://beta.rumbo.la | ramas `feat/**` → GitHub Pages |

## Documentación

| Documento | Para qué |
| --- | --- |
| [`docs/product.md`](docs/product.md) | Qué es Rumbo, a quién le habla el sitio, servicios, páginas y objetivos de cada una. |
| [`docs/architecture.md`](docs/architecture.md) | Cómo está construido: generación estática, i18n, SEO, sincronización con Notion, CI/CD y seguridad. |
| [`docs/design-system.md`](docs/design-system.md) | Colores, tipografía, espaciado, componentes y patrones visuales. |
| [`CLAUDE.md`](CLAUDE.md) | Guía corta para trabajar en el repo con Claude Code. |

## Puesta en marcha

Requisitos: **Node 24** (npm 11). El `package-lock.json` se genera con npm 11; con npm 10, `npm ci` falla.

```bash
npm install          # instala dependencias y ejecuta `nuxt prepare`
npm run dev          # sincroniza Notion y levanta http://localhost:3000
```

`npm run dev` y `npm run generate` leen primero las posiciones de Notion (`scripts/sync-jobs.mjs`), así que necesitan conexión a internet.

## Comandos

```bash
npm run dev              # desarrollo con recarga en caliente
npm run generate         # build estática en .output/public
npm run jobs:sync        # solo actualiza content/jobs.json desde Notion
npm run lint             # eslint (lint:fix corrige lo automático)
npm run typecheck        # vue-tsc sobre todo el proyecto
npm run format           # prettier sobre app/ y la configuración
npm run images:optimize  # convierte imágenes pesadas de public/images a WebP
npx serve .output/public -l 3000   # probar la build tal como se publica
```

Antes de abrir un pull request: `lint`, `typecheck` y `generate` deben pasar (es lo mismo que verifica CI).

## Stack

| Pieza | Versión | Uso |
| --- | --- | --- |
| [Nuxt](https://nuxt.com) | 4.5 | Sitio estático (`nitro.preset: 'static'`), Vue 3.5 y TypeScript 5.9. |
| `@nuxtjs/i18n` | 10 | Inglés por defecto sin prefijo, español en `/es/...`. |
| `@nuxtjs/sitemap` | 8 | `sitemap_index.xml` con una entrada por idioma, incluidas las posiciones. |
| `@nuxtjs/tailwindcss` | 6 | Tailwind CSS 3; estilos con `@apply` en SCSS con scope. |
| `@nuxt/eslint` | 1 | ESLint 9 (config plana) + Prettier + `vue-tsc`. |
| `keen-slider` | 6 | Carrusel de expertos en Comunidad. |
| `sharp` | dev | Conversión de imágenes a WebP. |

## Estructura

```
app/
  app.vue            Google Analytics, lang, canonical y hreflang
  layouts/           default: cabecera fija, pie y banner de cookies
  pages/             index, staffing, recruiting, why-rumbo, community, t-c,
                     careers/index (listado) y careers/[slug] (detalle)
  components/        secciones por página (Home*, Staffing*, Common*, …),
                     JobCard y JobIcon (Oportunidades), ui/ e icon/
  composables/       usePageSeo, useJobs, useCookieConsent, …
  constants/         SEO por página, clientes, expertos, disciplinas, FAQ, URLs
  helpers/  types/   utilidades y tipos compartidos
i18n/locales/        es.json y en.json
content/jobs.json    posiciones sincronizadas desde Notion (generado, no versionado)
public/              imágenes, fuentes, favicons, robots.txt y .htaccess de producción
scripts/             sync-jobs.mjs (Notion) y optimize-images.mjs
tailwind/            colores, breakpoints, contenedor y fuentes
docs/                producto, arquitectura y design system
.github/workflows/   build (reutilizable), ci, deploy-beta y deploy-production
```

## Dónde se edita el contenido

| Contenido | Dónde | Cómo |
| --- | --- | --- |
| **Posiciones abiertas** | Notion, base "Job Openings" | Crear, editar o borrar filas. Se publican en el siguiente deploy (push a `main` o los horarios programados). Ver [Oportunidades](#oportunidades). |
| Textos de las páginas | `i18n/locales/es.json` y `en.json` | Misma clave en ambos idiomas. Algunas claves admiten HTML simple (`<b>`, `<br />`, `<span>`). |
| Título y descripción SEO | `app/constants/meta.ts` | Campos `_es` y `_en`; cada página llama a `usePageSeo('CLAVE')`. |
| Logos de clientes | `app/constants/clients.ts` | Agregar `{ file, name }` y el SVG en `public/images/clients/`. |
| Expertos de la comunidad | `app/constants/experts.ts` | Foto WebP y logos SVG en `public/images/community/experts/`. |
| Disciplinas y roles | `app/constants/disciplines.ts` | `children` (tiempo completo) y `childrenFractional` (por horas). |
| Preguntas frecuentes | `app/constants/faq.ts` | Listas `faqs_es` y `faqs_en`. |
| Términos y condiciones | `app/pages/t-c.vue` | Bloques por idioma en la misma página. |
| Imágenes | `public/images/` | Subir en WebP o ejecutar `npm run images:optimize`. |

## Oportunidades

Las posiciones viven en la base pública de Notion **Job Openings** (`https://rumbo-la.notion.site/job-openings-rumbo`). En cada build, `scripts/sync-jobs.mjs`:

1. Lee todas las filas (cada fila es una posición abierta).
2. Convierte la página de cada posición en secciones: sobre la oportunidad, responsabilidades, requisitos, deseable, qué ofrecemos, más los datos `Modalidad:`, `Tipo de contrato:`, `Vacantes:` y `Nivel:`.
3. Detecta tecnologías y el sector, y toma el link de postulación de Airtable.
4. Escribe `content/jobs.json`, desde el que se generan `/careers` y `/careers/<slug>` en ambos idiomas.

Para que una posición se vea bien, su página de Notion debe usar los títulos habituales ("Sobre la oportunidad", "Responsabilidades", "Requisitos", "Deseable", "Qué ofrecemos"). Un título distinto se muestra igual, con su nombre original. Las propiedades usadas son Name, Practice, Area of Expertise, Seniority, Modality y Location.

Si Notion no responde o cambia de forma, el build falla y el sitio publicado no cambia.

## Ramas y despliegue (GitHub Flow)

```
feat/mi-cambio ──push──▶ Deploy beta ──▶ beta.rumbo.la
       │
       └──pull request──▶ CI (lint, typecheck, generate)
                              │
                           merge
                              ▼
main ──push / horario──▶ Deploy production ──▶ rumbo.la (cPanel)
```

1. Crear una rama desde `main` con prefijo `feat/` (también `fix/` o `docs/`; solo `feat/**` publica beta).
2. Cada push a `feat/**` publica en beta.rumbo.la. Pages aloja un solo sitio: gana el último push.
3. Abrir un pull request a `main`; CI debe pasar.
4. El merge publica producción. Además, producción se reconstruye a las 05:37, 13:00 y 18:00 (Lima) para recoger cambios de Notion.

Nunca hacer push directo a `main`: cada push publica producción.

### Configuración en GitHub

| Elemento | Valor |
| --- | --- |
| Environment `github-pages` | Solo ramas `feat/**`. Dominio `beta.rumbo.la`. |
| Environment `production` | Solo `main`. |
| Secreto | `FTP_PASSWORD` |
| Variables | `FTP_SERVER`, `FTP_USERNAME`, `FTP_SERVER_DIR` (por defecto `public_html/`), `FTP_PROTOCOL` (`ftps` por defecto; `ftps-legacy` o `ftp`), `PRODUCTION_URL` |
| DNS (GoDaddy) | `CNAME beta → rumbo-la.github.io` |

Producción se sube con [FTP-Deploy-Action](https://github.com/SamKirkland/FTP-Deploy-Action): solo envía archivos modificados y deja `.ftp-deploy-sync-state.json` en el servidor (bloqueado por `.htaccess`).

## Integraciones externas

| Servicio | Dónde | Notas |
| --- | --- | --- |
| Notion | `scripts/sync-jobs.mjs` | Fuente de las posiciones. Usa los endpoints de la página pública (no oficiales). |
| Airtable | Link en cada posición de Notion | Formulario de postulación. |
| Google Analytics `G-EP076L8Y45` | `app/app.vue` | Consentimiento `denied` hasta aceptar el banner de cookies (`rumbo_cookie_consent` en `localStorage`). |
| Calendly | `app/constants/calendly.ts` | Botones "Conversemos" y "Let's talk". |
| Feathery | `app/constants/typePartner.ts`, `CommonLookingForYou.vue` | Formularios de comunidad y partners. |
| WhatsApp | `ContactDefault.vue` | Contacto directo. |
| Google Fonts | `nuxt.config.ts` | Space Grotesk; DxGrafik se sirve desde `public/fonts/`. |

## Pendientes conocidos

- Los modales de contacto y de unión (`Contact*.vue`, `JoinUs*.vue`, `useContact`, `useJoin`) no se muestran en ninguna página. Su endpoint de Google Apps Script es público y no tiene protección contra spam.
- En la versión en español quedan textos en inglés (por ejemplo el titular de la home y la descripción de "Especialistas y Managers").
- Los textos de las posiciones solo existen en español; `/en/careers` los muestra en español.
- La versión en español de términos y condiciones necesita revisión legal.
