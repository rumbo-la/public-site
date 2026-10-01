# CLAUDE.md

Guía para trabajar en este repositorio con Claude Code. El `README.md` describe el proyecto para personas; este archivo recoge lo que hace falta para modificarlo sin romper nada.

Más detalle en `docs/`: [`product.md`](docs/product.md) (qué es y para quién), [`architecture.md`](docs/architecture.md) (build, Notion, CI/CD, seguridad) y [`design-system.md`](docs/design-system.md) (colores, tipografía, componentes). Si un cambio altera algo descrito ahí, actualizar el documento en el mismo pull request.

## Proyecto

Sitio de marketing de [rumbo.la](https://rumbo.la) (staffing y recruiting de talento digital). Nuxt 4 generado como sitio **estático** (`nitro.preset: 'static'`): no hay servidor ni API propia en producción, todo se resuelve en el build.

- Vue 3.5 + TypeScript, código en `app/` (estructura de Nuxt 4).
- `@nuxtjs/i18n` con `strategy: 'prefix_and_default'`: inglés por defecto sin prefijo, español en `/es/...`.
- Tailwind CSS 3 con estilos en `<style lang="scss" scoped>` usando `@apply`. Tokens en `tailwind/` (`primary` `#382EDC`, `paragraph` `#666666`, fuente `font-dxgrafik`).
- Node 24 en CI (el `package-lock.json` se genera con npm 11; con npm 10 `npm ci` falla).

## Comandos

```bash
npm run dev          # sincroniza Notion (predev) y levanta http://localhost:3000
npm run generate     # sincroniza Notion (pregenerate) y genera .output/public
npm run jobs:sync    # solo la sincronización de posiciones desde Notion
npm run lint         # eslint; hoy hay 26 warnings previos y 0 errores
npm run typecheck    # vue-tsc
npx serve .output/public -l 3000   # probar la build estática tal como se publica
```

Antes de dar un cambio por terminado: `npm run lint`, `npm run typecheck` y `npm run generate` deben pasar.

## Arquitectura

- `app/pages/`: una página por sección. Cada página llama a `usePageSeo('CLAVE')`, con los textos SEO en `app/constants/meta.ts` (campos `_es` y `_en`).
- `app/components/`: secciones con prefijo de página (`Home*`, `Staffing*`, `Common*`, …), primitivas en `ui/`, íconos en `icon/`. Componentes auto-importados.
- `app/layouts/default.vue`: cabecera fija, pie y banner de cookies. La cabecera mide 77 px en escritorio y 68 px en móvil; los heros compensan con `padding-top`.
- `i18n/locales/{es,en}.json`: todo texto visible va aquí, con la misma clave en ambos idiomas. Algunas claves llevan HTML y se pintan con `v-html` (regla `vue/no-v-html` desactivada a propósito).
- Enlaces internos con `NuxtLinkLocale`, nunca con rutas absolutas sin idioma.

### Oportunidades (`/careers`)

Las posiciones **no** están en el repo: salen de la base pública de Notion "Job Openings".

1. `scripts/sync-jobs.mjs` lee Notion con los endpoints de la página pública (no oficiales, sin token) y escribe `content/jobs.json` (ignorado por git).
2. Convierte cada página a HTML escapado y la divide en secciones (`about`, `responsibilities`, `requirements`, `nice`, `offer`, `others`), datos de cabecera (`Modalidad:`, `Tipo de contrato:`, `Vacantes:`…), tecnologías detectadas y sector.
3. `app/composables/useJobs.ts` carga el JSON con `import.meta.glob`, para que lint y typecheck funcionen sin haberlo generado.
4. `nuxt.config.ts` lee el JSON para prerenderizar `/careers/<slug>` en ambos idiomas y añadirlos al sitemap.

El script falla a propósito si Notion cambia de forma o devuelve cero posiciones: así nunca se publica una página vacía. Los textos de las posiciones están solo en español. El botón "Postular" lleva al formulario de Airtable que trae cada posición.

## Ramas y despliegue (GitHub Flow)

| Evento | Workflow | Destino |
| --- | --- | --- |
| Push a `feat/**` | `deploy-beta.yml` | beta.rumbo.la (GitHub Pages) |
| Pull request | `ci.yml` | Solo verifica |
| Push a `main` y horarios programados | `deploy-production.yml` | cPanel por FTP |

- Todo cambio sale de una rama `feat/**` (o `docs/**`, `fix/**`) y entra a `main` por pull request. No hacer push directo a `main`: cada push publica producción.
- Los tres workflows reutilizan `build.yml` (lint, typecheck, generate). Si cambia el build, se cambia ahí.
- Environments: `github-pages` solo acepta `feat/**`; `production` solo acepta `main`. Credenciales FTP: secreto `FTP_PASSWORD` y variables `FTP_SERVER`, `FTP_USERNAME`, `FTP_SERVER_DIR`, `FTP_PROTOCOL`, `PRODUCTION_URL`.
- Las acciones están fijadas por SHA con la versión en comentario. Mantenerlo así al actualizar y validar con `actionlint` y `zizmor`.
- Los `cron` están en UTC (Lima es UTC−5). GitHub puede retrasar o descartar ejecuciones en el minuto 0 de cada hora.

## Convenciones

- Comentarios de código en inglés; textos de usuario y documentación en español.
- Formato según `prettier.config.js` (comillas simples, ancho 100).
- Fechas `YYYY-MM-DD` se formatean con `timeZone: 'UTC'` para que el HTML del servidor y del cliente coincidan.
- Imágenes pesadas en WebP (`npm run images:optimize` o `sharp`), nunca PNG de varios MB.
- `public/.htaccess` es el de producción (Apache/cPanel): fuerza HTTPS, bloquea archivos ocultos como `.ftp-deploy-sync-state.json` y añade cabeceras de seguridad.

## Cuidado con

- `JoinUs*.vue`, `Contact*.vue`, `useJoin` y `useContact` existen pero ninguna página los monta.
- El endpoint de Google Apps Script de esos formularios es público y no tiene protección contra spam.
- Cambios en `LayoutHeader.vue` afectan a todas las páginas, no solo a la que se está editando.
