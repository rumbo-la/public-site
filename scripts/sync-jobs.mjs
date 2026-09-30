// Pulls the open positions from Rumbo's public Notion database and writes content/jobs.json,
// which the careers pages read at build time. Runs automatically before `dev` and `generate`.
// Uses the same endpoints as the public notion.site page (no token needed). They are not an
// official API, so any unexpected shape fails loudly instead of publishing an empty careers page.
import { mkdir, writeFile } from 'node:fs/promises'

const NOTION_SITE = 'https://rumbo-la.notion.site'
const PAGE_ID = '39c4ca31-a310-8005-8b77-fd6b34e2fb8d' // "Job Openings" page that embeds the database
const OUTPUT = new URL('../content/jobs.json', import.meta.url)
/** Used when a position does not link its own application form. */
const DEFAULT_APPLY_URL = 'https://airtable.com/appAElqQ0yAZPyKqm/pagmng1Qh16UhwoXF/form'

const api = async (endpoint, body) => {
  const res = await fetch(`${NOTION_SITE}/api/v3/${endpoint}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Notion ${endpoint} responded ${res.status}`)
  return res.json()
}

// Record values are wrapped once or twice depending on the endpoint.
const unwrap = (record) => record?.value?.value ?? record?.value
const loadPage = (id) =>
  api('loadCachedPageChunkV2', { page: { id }, limit: 500, cursor: { stack: [] }, verticalColumns: false })

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const plain = (rich) => (rich ?? []).map(([text]) => text).join('').trim()

/** Notion rich text → inline HTML (bold, italic, strike, code and links). */
const inline = (rich) =>
  (rich ?? [])
    .map(([text, formats = []]) => {
      let html = escapeHtml(text).replace(/\n/g, '<br>')
      for (const [type, value] of formats) {
        if (type === 'b') html = `<strong>${html}</strong>`
        else if (type === 'i') html = `<em>${html}</em>`
        else if (type === 's') html = `<s>${html}</s>`
        else if (type === 'c') html = `<code>${html}</code>`
        else if (type === 'a' && /^https?:\/\//.test(value)) html = `<a href="${escapeHtml(value)}" target="_blank" rel="noopener">${html}</a>`
      }
      return html
    })
    .join('')

const HEADINGS = { header: 'h2', sub_header: 'h2', sub_sub_header: 'h3', header_4: 'h3' }
const LISTS = { bulleted_list: 'ul', numbered_list: 'ol' }

/** Block ids → HTML, grouping consecutive list items into a single <ul>/<ol>. */
const renderBlocks = (ids, blocks) => {
  let html = ''
  let openList = null
  for (const id of ids ?? []) {
    const block = unwrap(blocks[id])
    if (!block || block.alive === false) continue
    const list = LISTS[block.type]
    if (openList && openList !== list) {
      html += `</${openList}>`
      openList = null
    }
    const text = inline(block.properties?.title)
    const children = renderBlocks(block.content, blocks)
    if (list) {
      if (!openList) html += `<${list}>`
      openList = list
      html += `<li>${text}${children}</li>`
    } else if (HEADINGS[block.type]) {
      html += `<${HEADINGS[block.type]}>${text}</${HEADINGS[block.type]}>`
    } else if (block.type === 'divider') {
      html += '<hr>'
    } else if (block.type === 'text' || block.type === 'quote' || block.type === 'callout') {
      if (text) html += `<p>${text}</p>`
      html += children
    }
  }
  if (openList) html += `</${openList}>`
  return html
}

const findLinks = (ids, blocks, found = []) => {
  for (const id of ids ?? []) {
    const block = unwrap(blocks[id])
    for (const [, formats = []] of block?.properties?.title ?? []) {
      for (const [type, value] of formats) if (type === 'a') found.push(value)
    }
    findLinks(block?.content, blocks, found)
  }
  return found
}

/** First paragraph under "Sobre la oportunidad" (or the first real paragraph) as the card summary. */
const findSummary = (ids, blocks) => {
  const top = (ids ?? []).map((id) => unwrap(blocks[id])).filter(Boolean)
  // Some pages use a heading for "Sobre la oportunidad", others a bold paragraph.
  const isAbout = (b) => /^(sobre la oportunidad|about the (role|opportunity)):?$/i.test(plain(b.properties?.title))
  const about = top.findIndex(isAbout)
  const candidates = about >= 0 ? top.slice(about + 1) : top
  const paragraph = candidates.find((b) => b.type === 'text' && plain(b.properties?.title) && !isAbout(b) && !/^(modalidad|vacantes|tipo de contrato)\s*:/i.test(plain(b.properties?.title)))
  return paragraph ? plain(paragraph.properties.title).replace(/\s+/g, ' ').slice(0, 240) : ''
}

const slugify = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const splitOptions = (value) => value.split(',').map((s) => s.trim()).filter(Boolean)

/** Known section headings in the Notion pages → the section they feed on the detail page. */
const SECTION_KINDS = [
  ['impact', /impacto/i],
  ['about', /^(sobre la oportunidad|la oportunidad|sobre el rol|descripci[oó]n)/i],
  ['responsibilities', /(responsabilidades|funciones|qu[eé] har[aá]s|lo que har[aá]s)/i],
  ['nice', /(deseable|valoramos|plus)/i],
  ['requirements', /(requisitos|perfil|qu[eé] buscamos|lo que buscamos)/i],
  ['offer', /(ofrecemos|beneficios)/i],
]
/** "Label: value" lines that become header facts instead of body text. */
const FACT_LABELS = {
  modalidad: 'modality',
  'tipo de contrato': 'contract',
  vacantes: 'vacancies',
  nivel: 'level',
  reporte: 'reportsTo',
  'posición': 'position',
}
/** Tools and platforms shown as tags; matched as whole words in the role's own text. */
const TECHNOLOGIES = [
  '.NET', 'C#', 'Java', 'Spring Boot', 'Node.js', 'TypeScript', 'JavaScript', 'Angular', 'React', 'Vue', 'Python',
  'SQL Server', 'PostgreSQL', 'MySQL', 'Oracle', 'MongoDB', 'Redis', 'Kafka', 'RabbitMQ',
  'AWS', 'Azure', 'GCP', 'Vertex AI', 'SageMaker', 'Terraform', 'Ansible', 'Docker', 'Kubernetes', 'Helm',
  'Jenkins', 'GitHub Actions', 'GitLab', 'Azure DevOps', 'Git', 'Grafana', 'Prometheus', 'Loki', 'Datadog',
  'Bash', 'PowerShell', 'Linux', 'Airflow', 'dbt', 'Spark', 'Databricks', 'Snowflake', 'BigQuery',
  'Power BI', 'Tableau', 'TensorFlow', 'PyTorch', 'MLflow', 'Figma', 'Jira', 'Confluence',
  'Selenium', 'Cypress', 'Playwright', 'Postman', 'JMeter', 'Excel',
]
const ALIASES = { 'Node.js': /\bnode(\.js)?\b/i }
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const techPattern = (tech) => ALIASES[tech] ?? new RegExp(`(^|[^\\w.#])${escapeRegex(tech)}(?![\\w#])`, 'i')

/**
 * Parses "Label: value" lines ("Modalidad: Híbrido · Lima, Perú"). Several facts can share a block,
 * one per line or joined with " · " ("Híbrido · Nivel: Senior"). Returns null unless the block is
 * made only of known facts, so regular sentences with a colon stay in the description.
 */
const parseFacts = (text) => {
  const facts = {}
  for (const line of text.split(/\n+/).map((l) => l.trim()).filter(Boolean)) {
    // Split "Híbrido · Lima, Perú Tipo de contrato: Planilla" and "Híbrido · Nivel: Senior" into separate facts.
    const parts = line.split(/\s*(?:·\s*)?(?=\b(?:Modalidad|Tipo de contrato|Vacantes|Nivel|Reporte|Posición)\s*:)/i).filter(Boolean)
    for (const part of parts) {
      const match = part.match(/^([^:]{2,30}):\s*(.+)$/s)
      const key = match && FACT_LABELS[match[1].trim().toLowerCase()]
      if (!key) return null
      facts[key] = match[2].replace(/\s+/g, ' ').replace(/\s*·\s*$/, '').trim()
    }
  }
  return Object.keys(facts).length ? facts : null
}

const isBoldOnly = (rich) => (rich ?? []).every(([text, formats = []]) => !text.trim() || formats.some(([t]) => t === 'b'))

/**
 * Splits a job page into the sections of the detail layout. Unknown headings keep their original
 * title, so nothing written in Notion is dropped.
 */
const structure = (ids, blocks) => {
  const facts = {}
  const sections = { about: [], impact: [], responsibilities: [], requirements: [], nice: [], offer: [] }
  const others = []
  let current = sections.about

  for (const id of ids ?? []) {
    const block = unwrap(blocks[id])
    if (!block || block.alive === false) continue
    const rich = block.properties?.title
    const text = plain(rich)

    // The closing "apply in this link" paragraph is replaced by the apply buttons.
    if (block.type === 'text' && findLinks([id], blocks).some((url) => url.includes('airtable.com'))) continue

    const blockFacts = block.type === 'text' && parseFacts(text)
    if (blockFacts) {
      Object.assign(facts, blockFacts)
      continue
    }

    const headingLike = HEADINGS[block.type] || (block.type === 'text' && text && text.length < 70 && isBoldOnly(rich) && !text.includes(':'))
    if (headingLike) {
      const kind = SECTION_KINDS.find(([, re]) => re.test(text))?.[0]
      if (kind) {
        current = sections[kind]
        continue
      }
      if (current !== sections.about && !others.some((o) => o.ids === current)) {
        current.push(id) // sub-heading inside a known section, e.g. groups of responsibilities
        continue
      }
      const other = { title: text, ids: [] }
      others.push(other)
      current = other.ids
      continue
    }
    current.push(id)
  }

  // Benefits become individual cards, one per list item or paragraph.
  const offer = sections.offer.flatMap((id) => {
    const block = unwrap(blocks[id])
    if (LISTS[block.type] || block.type === 'text') {
      const html = inline(block.properties?.title).replace(/\.\s*$/, '')
      return html ? [html] : []
    }
    return []
  })

  // "Tu impacto": an explicit section in Notion, or else the benefit that already describes the impact.
  let impact = renderBlocks(sections.impact, blocks)
  if (!impact) {
    const index = offer.findIndex((item) => /^la oportunidad de|impact/i.test(item.replace(/<[^>]+>/g, '')))
    if (index >= 0) impact = offer.splice(index, 1)[0]
  }

  const aboutText = sections.about.map((id) => plain(unwrap(blocks[id])?.properties?.title)).join(' ')
  const sector = aboutText.match(/\bsector (?:de(?:l)? )?([a-záéíóúñ/ ]+?)(?=[,.;]| se | con | en | que |$)/i)?.[1]?.trim()

  const roleText = [sections.responsibilities, sections.requirements, sections.nice]
    .flat()
    .map((id) => plain(unwrap(blocks[id])?.properties?.title))
    .join(' ')
  const technologies = TECHNOLOGIES.filter((tech) => techPattern(tech).test(roleText))
    // "SQL Server" already implies SQL-family tags; drop plain "Git" when a Git platform is listed.
    .filter((tech) => !(tech === 'Git' && /GitHub|GitLab/i.test(roleText) && !/\bgit\b(?!\s*(hub|lab))/i.test(roleText)))

  // Notion dividers separate the original sections; at the edge of a section they are just noise.
  const section = (sectionIds) => renderBlocks(sectionIds, blocks).replace(/^(<hr>)+|(<hr>)+$/g, '')

  return {
    facts,
    sector: sector || null,
    sections: {
      about: section(sections.about),
      impact: impact || null,
      responsibilities: section(sections.responsibilities),
      requirements: section(sections.requirements),
      nice: section(sections.nice),
      others: others.map((o) => ({ title: o.title, html: section(o.ids) })).filter((o) => o.html),
    },
    offer,
    technologies,
  }
}

// 1. The public page embeds the database: find its collection, view and space.
const page = await loadPage(PAGE_ID)
const viewBlock = Object.values(page.recordMap.block).map(unwrap).find((b) => b?.type === 'collection_view' && b.collection_id)
if (!viewBlock) throw new Error('No database found on the Notion Job Openings page')
const collection = unwrap(page.recordMap.collection[viewBlock.collection_id])
const schema = collection.schema
const propId = (name) => Object.keys(schema).find((key) => schema[key].name === name)
const PROPS = {
  title: 'title',
  practice: propId('Practice'),
  area: propId('Area of Expertise'),
  seniority: propId('Seniority'),
  workMode: propId('Modality'),
  location: propId('Location'),
}
const missing = Object.entries(PROPS).filter(([, id]) => !id).map(([key]) => key)
if (missing.length) throw new Error(`Notion database is missing properties: ${missing.join(', ')}`)

// 2. Every row in the database is an open position.
const query = await api('queryCollection', {
  source: { type: 'collection', id: collection.id, spaceId: viewBlock.space_id },
  collectionView: { id: viewBlock.view_ids[0], spaceId: viewBlock.space_id },
  loader: { type: 'reducer', reducers: { collection_group_results: { type: 'results', limit: 500 } }, searchQuery: '', userTimeZone: 'America/Lima' },
})
const rowIds = query.result?.reducerResults?.collection_group_results?.blockIds
if (!rowIds?.length) throw new Error('Notion returned no positions; refusing to publish an empty careers page')

// 3. Each row is a page whose body is the job description.
const usedSlugs = new Set()
const jobs = []
for (const id of rowIds) {
  const row = unwrap(query.recordMap.block[id])
  if (!row || row.alive === false) continue
  const prop = (key) => plain(row.properties?.[PROPS[key]])
  const title = prop('title')
  if (!title) continue

  const { recordMap } = await loadPage(id)
  const body = unwrap(recordMap.block[id])?.content
  const applyUrl = findLinks(body, recordMap.block).find((url) => url.includes('airtable.com')) ?? DEFAULT_APPLY_URL

  let slug = slugify(title)
  if (usedSlugs.has(slug)) slug = `${slug}-${id.slice(0, 4)}`
  usedSlugs.add(slug)

  jobs.push({
    id,
    slug,
    title,
    practices: splitOptions(prop('practice')),
    areas: splitOptions(prop('area')),
    seniority: splitOptions(prop('seniority')),
    workModes: splitOptions(prop('workMode')),
    location: prop('location'),
    published: new Date(row.created_time).toISOString().slice(0, 10),
    summary: findSummary(body, recordMap.block),
    html: renderBlocks(body, recordMap.block),
    applyUrl,
    ...structure(body, recordMap.block),
  })
}

jobs.sort((a, b) => (a.published < b.published ? 1 : -1))
await mkdir(new URL('.', OUTPUT), { recursive: true })
await writeFile(OUTPUT, `${JSON.stringify(jobs, null, 2)}\n`)
console.log(`[sync-jobs] ${jobs.length} positions written to content/jobs.json`)
