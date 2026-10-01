# Definición del producto

Qué es el sitio de Rumbo, a quién le habla y qué tiene que lograr cada página. Los textos citados vienen del propio sitio (`i18n/locales/es.json`).

## Rumbo

Rumbo es una empresa de staffing y recruiting de **talento digital en Latinoamérica**, liderada por *practitioners* (profesionales que ejercen las disciplinas que evalúan). Su promesa:

> Accede al top 5 % de talento digital en Latam en menos de 72 horas, con modelos flexibles desde tiempo completo hasta por hora.

Pilares que repite el sitio:

| Pilar | Mensaje |
| --- | --- |
| Talento de primera | Proceso de evaluación propio; solo entra el top 5 %. |
| Liderado por practitioners | Expertos que ayudan a diseñar el equipo y evaluar candidatos. |
| Flexible por diseño | Tiempo completo, por horas o equipos mixtos; se ajusta en cualquier momento. |
| Rápido y asequible | Candidatos en 72 h; la tecnología reduce costos y el ahorro se traslada al cliente. |

## Audiencias

| Audiencia | Qué busca | Dónde se le habla | Conversión |
| --- | --- | --- | --- |
| **Empresas** (CTOs, líderes de producto, RR. HH.) | Sumar talento digital rápido y con garantía | Home, Staffing, Recruiting, Por qué Rumbo | Agendar una reunión en Calendly ("Conversemos") |
| **Talento digital** (ingeniería, diseño, data, producto, delivery) | Mejores oportunidades y crecimiento | Comunidad, Oportunidades | Postular a una posición (Airtable) o unirse a la comunidad (Feathery) |
| **Partners** | Colaborar con la comunidad | Comunidad | Formulario de Feathery |

## Servicios

### Staffing

Talento de Rumbo que se integra a los proyectos del cliente.

| Modalidad | Para qué | Claves |
| --- | --- | --- |
| Staff Augmentation | Reforzar la capacidad del equipo con talento a tiempo completo | 15+ especialidades, distintos seniorities, se ajusta en cualquier momento |
| Fractional Experts | Expertos por horas para resolver problemas puntuales | 2 a 15 h por semana, incorporación en 72 h, expertos con 10+ años |
| Tailored Teams | Equipos a medida que combinan tiempo completo y por horas | Asesoría para diseñar el equipo, perfiles de ingeniería, diseño, data y más |

### Recruiting

Rumbo selecciona y evalúa talento para posiciones en la planilla del cliente.

| Modalidad | Para qué | Claves |
| --- | --- | --- |
| Especialistas y Managers | Individual contributors y mandos medios | Perfiles validados en 72 h, garantía de 6 meses, solo *success fee* |
| Executive Search | Líderes digitales senior (CTO, VPs, Heads) | Perfiles en 7 días hábiles, garantía de 12 meses, acompañamiento en el diseño del puesto |

### Disciplinas

Engineering, Design, Delivery & Ops, Data & AI y Product, cada una con roles a tiempo completo y roles *fractional* (`app/constants/disciplines.ts`).

## Páginas y objetivos

| Página | Objetivo | Acción principal |
| --- | --- | --- |
| Home (`/`) | Explicar la propuesta en segundos y llevar a cada servicio | Conversemos (Calendly) |
| Staffing | Mostrar las tres modalidades de staffing | Conversemos |
| Recruiting | Mostrar las modalidades de recruiting | Conversemos |
| Por qué Rumbo | Diferenciarse de las alternativas (calidad, costo, flexibilidad, velocidad, expertise) | Conversemos |
| Comunidad | Atraer talento y partners a la comunidad | Postular a la comunidad (Feathery) |
| Oportunidades (`/careers`) | Que el talento encuentre y postule a posiciones abiertas | Ver oportunidad → Postular (Airtable) |
| Términos y condiciones | Información legal | — |

### Oportunidades

- **Fuente:** base "Job Openings" en Notion, mantenida por el equipo de Talent Acquisition. Lo que está en la base está publicado.
- **Listado:** buscador por rol o tecnología, filtros de disciplina y seniority, "Solo remoto" cuando aplica, y contador de resultados.
- **Detalle:** cabecera con datos clave, secciones estructuradas (sobre la oportunidad, tu impacto, lo que harás, lo que buscamos, tecnologías, qué ofrecemos), tarjeta de postulación fija, proceso de evaluación en tres pasos y posiciones relacionadas.
- **Postulación:** formulario de Airtable de cada posición, en una pestaña nueva.
- **Proceso de evaluación comunicado:** evaluación técnica, revisión por especialistas y entrevista en profundidad.

## Idiomas

El sitio está en inglés (por defecto) y español. Las descripciones de las posiciones solo existen en español.

## Medición

Google Analytics 4, activo solo cuando el visitante acepta las cookies. Conversiones a seguir: clics en "Conversemos" (Calendly), clics en "Postular" (Airtable) y envíos de formularios de Feathery. Hoy no hay eventos personalizados configurados; se miden como visitas y clics salientes.

## Decisiones abiertas

- Qué hacer con los modales de contacto y de unión que existen en el código pero no se muestran.
- Traducir al inglés las descripciones de las posiciones o mostrar `/en/careers` solo con un aviso.
- Revisión legal de los términos en español.
