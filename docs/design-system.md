# Design system

Fundamentos visuales y componentes del sitio de Rumbo. Refleja lo que hay hoy en el código; la sección [Deuda](#deuda) marca lo que conviene ordenar.

Identidad: **negro, blanco y violeta**. El violeta se reserva para lo importante (acciones, enlaces, sección activa); el resto se apoya en negro, grises y violetas muy suaves.

## Color

### Tokens (Tailwind)

Definidos en `tailwind/colors.js` y disponibles como clases (`bg-primary`, `text-paragraph`, …) y como variables CSS (`--tw-color-primary`).

| Token | Valor | Uso |
| --- | --- | --- |
| `primary` | `#382EDC` | Botones principales, enlaces, sección activa, acentos. |
| `secondary` | `#8452FD` | Acentos secundarios e ilustraciones. |
| `paragraph` | `#666666` | Texto secundario, etiquetas de formularios, notas. |
| `black` | `#000000` | Títulos y texto principal. |

### Valores en uso sin token

| Valor | Uso |
| --- | --- |
| `#2C23B9` | Hover de botones primarios; texto de etiquetas violeta. |
| `#EEEDFC` / `#E6E4FC` | Fondo violeta suave: etiquetas, chips destacados, bloques "Tu impacto" y banners. |
| `#F4F3FF` | Fondo lavanda de la cabecera de una posición. |
| `#FAFAFC` / `#FAF9FA` | Fondos grises muy claros de secciones. |
| `#E4E4EA` / `#D4D4DC` / `#E2E2E2` | Bordes de tarjetas, inputs y divisores. |
| `#F3F3F6` | Fondo de chips neutros. |
| `#A9A4FF` | Texto lavanda sobre fondos oscuros ("empieza aquí"). |
| `#02081D` | Azul noche del hero de Oportunidades (fondo de la foto). |
| `#0B0A3A` → `#2A21A8` | Degradado de la franja de comunidad. |
| `#B42318` | Mensajes de error. |

## Tipografía

| Familia | Uso | Origen |
| --- | --- | --- |
| **DxGrafik** SemiBold (`font-dxgrafik`) | Títulos (h1–h3), números destacados | `public/fonts/` |
| **Space Grotesk** 300–700 | Texto, botones, formularios | Google Fonts |

Tamaños de referencia (escritorio / móvil):

| Rol | Tamaño | Peso |
| --- | --- | --- |
| Título de hero | 48 / 30 px | DxGrafik 600 |
| Título de página de detalle | 40 / 28 px | DxGrafik 600 |
| Título de sección | 24–32 / 21–24 px | DxGrafik 600 |
| Título de tarjeta | 22 px (18 px compacta) | DxGrafik 600 |
| Texto principal | 16–17 px, interlineado ~1.6 | Space Grotesk 400 |
| Texto secundario | 14–15 px, color `paragraph` | Space Grotesk 400 |
| Etiquetas (tags) | 12 px, mayúsculas, tracking amplio | Space Grotesk 700 |
| Botones | 15–16 px | Space Grotesk 700 |

## Layout

| Elemento | Valor |
| --- | --- |
| Breakpoints | `xs` 480, `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1440 px |
| Contenedor | Centrado, máximo 1440 px, padding 12 px; en `xl` se suma `px-[90px]` en la mayoría de secciones |
| Cabecera | Fija; 77 px en escritorio, 68 px en móvil. Los heros compensan con `padding-top`. |
| Grillas | 1 columna en móvil, 2 en `md`, 3 en `xl` (2 si hay 2 o 4 elementos, para no dejar huecos) |
| Separación entre bloques | 28 px dentro de una página de detalle; 40–56 px entre secciones |

## Forma y profundidad

| Elemento | Radio | Sombra |
| --- | --- | --- |
| Botones, inputs, chips | `rounded-lg` (8 px) | — |
| Tarjetas y banners | `rounded-2xl` (16 px) | Borde `#E4E4EA`; al pasar el cursor `0 8px 24px rgba(20,16,60,.08)` |
| Etiquetas (tags) | `rounded-full` | — |
| Bloques destacados | `rounded-xl` (12 px) | — |
| Tarjetas laterales fijas | `rounded-2xl` | `0 4px 20px rgba(20,16,60,.04)` |
| Sombra de tema | `shadow-custom` | `0 4px 15px rgba(0,30,95,.14)` |

## Componentes

### Base (`app/components/ui/`)

| Componente | Estado | Notas |
| --- | --- | --- |
| `UiButton` | En uso | `variant`: `fill` (por defecto), `outlined`, `light`, `text`; `size`: `xs`–`lg`; `color`: cualquier token; `loading`, `disabled`. |
| `UiTextField`, `UiSelect`, `UiPhoneField`, `UiTextarea`, `UiRange` | En los formularios de contacto y unión (hoy sin montar) | |
| `UiCheckbox`, `UiCheckboxGroup`, `UiClose`, `UiLink`, `UiMenu`, `UiModal`, `UiSelectSearch` | Sin uso | Candidatos a eliminar o a adoptar. |

### Íconos

- `app/components/icon/`: íconos de marca y de secciones (disciplinas, redes, flechas). Se usan como `<IconNombre />`.
- `JobIcon`: set de trazo 24×24 (`stroke-width 1.8`, `currentColor`) para Oportunidades: `pin`, `clock`, `calendar`, `building`, `remote`, `group`, `user`, `level`, `briefcase`, `document`, `gift`, `shield`, `growth`, `star`, `code`, `target`, `search`, `close`, `arrow`, `folder`. Tamaño habitual 18 px.

### Patrones

| Patrón | Dónde | Anatomía |
| --- | --- | --- |
| **Hero con foto** | `/careers` | Foto a la derecha que se funde en `#02081D`; título blanco con remate lavanda; bajada en dos líneas. |
| **Hero lavanda** | `/careers/<slug>` | Fondo `#F4F3FF` con arcos suaves; volver, etiquetas, título, subtítulo gris y chips con datos. |
| **Tarjeta de posición** (`JobCard`) | Listado | Disciplina → título → área (violeta) → chips (seniority, modalidad) → resumen de 2 líneas → ubicación → pie con fecha y "Ver oportunidad →". Variante `compact` para relacionadas. |
| **Chip** | Tarjetas y cabeceras | Alto 36–40 px, ícono 18 px + texto 14 px; neutro (`#F3F3F6`) o destacado (`#EEEDFC` con texto `#2C23B9`). |
| **Etiqueta (tag)** | Disciplina, seniority | Pastilla, 12 px en mayúsculas; violeta suave o blanca con borde. |
| **Bloque destacado** | "Tu impacto" | Fondo `#EEEDFC`, ícono en cuadro blanco, título violeta. |
| **Banner de acción** | Fin de listados y descripciones | Ícono circular, título + bajada, acción a la derecha (botón o enlace con flecha). |
| **Tarjeta lateral fija** | Detalle de posición | Datos en filas ícono + etiqueta + valor y botón de ancho completo; fija al hacer scroll en escritorio; en móvil se reemplaza por un botón fijo inferior. |
| **Pasos numerados** | "Cómo evaluamos" | Número en círculo violeta suave, título en negrita y descripción corta. |
| **Franja oscura** | Cierre de páginas de detalle | Degradado azul noche → violeta con arcos; título blanco y botón con borde. |

### Estados

- **Hover:** botones primarios `#2C23B9`; tarjetas suben la sombra; flechas se desplazan 2 px.
- **Activo:** enlace del menú en violeta con subrayado de 2 px.
- **Foco:** inputs con borde `primary`.
- **Error:** texto `#B42318`.

## Imágenes

- Formato WebP; las fotos de hero pesan menos de 100 KB (la de Oportunidades, 38 KB).
- Logos de clientes y marcas en SVG.
- `npm run images:optimize` convierte los PNG/JPG listados en `scripts/optimize-images.mjs`.

## Accesibilidad

- Contraste: texto `paragraph` (#666) sobre blanco cumple AA para texto normal; el lavanda `#A9A4FF` se usa solo sobre fondos oscuros.
- Los íconos decorativos llevan `aria-hidden`.
- Los filtros usan `label` asociados a sus controles.

## Deuda

- Muchos colores de la tabla "sin token" deberían convertirse en tokens (`primary-hover`, `primary-soft`, `surface`, `border`, `night`) en `tailwind/colors.js`.
- `tailwind/font.js` define una escala (`h1`–`h5`, `body0`–`body4`) que no está conectada al tema; los tamaños se escriben a mano.
- Hay dos grises de fondo casi iguales (`#FAFAFC` y `#FAF9FA`) y tres de borde; conviene unificarlos.
- Varios componentes de `ui/` no se usan.
