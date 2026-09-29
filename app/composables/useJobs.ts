/** A position synced from the Notion "Job Openings" database by scripts/sync-jobs.mjs. */
export interface Job {
  id: string
  slug: string
  title: string
  /** Notion "Practice", e.g. Engineering, Data & AI. */
  practices: string[]
  /** Notion "Area of Expertise", e.g. DevOps, Product Design. */
  areas: string[]
  seniority: string[]
  /** Notion "Modality": Remote, Hybrid or On-site. */
  workModes: string[]
  location: string
  /** YYYY-MM-DD, when the position was created in Notion. */
  published: string
  summary: string
  /** Full description rendered from the Notion page blocks (search and structured data). */
  html: string
  applyUrl: string
  /** "Label: value" lines from the top of the Notion page. */
  facts: {
    modality?: string
    contract?: string
    vacancies?: string
    level?: string
    reportsTo?: string
    position?: string
  }
  /** Client industry when the description names it ("sector seguros"). */
  sector: string | null
  /** The description split into the sections of the detail page; HTML, empty when absent. */
  sections: {
    about: string
    impact: string | null
    responsibilities: string
    requirements: string
    nice: string
    others: { title: string, html: string }[]
  }
  /** One HTML fragment per benefit. */
  offer: string[]
  technologies: string[]
}

// Globbed instead of imported so lint and typecheck work before the first sync creates the file.
const files = import.meta.glob<Job[]>('../../content/jobs.json', { import: 'default', eager: true })
const jobs: Job[] = Object.values(files)[0] ?? []

const unique = (values: string[]) => [...new Set(values)].filter(Boolean).sort()

export const useJobs = () => {
  const bySlug = (slug: string) => jobs.find((j) => j.slug === slug)
  return {
    all: jobs,
    bySlug,
    practices: unique(jobs.flatMap((j) => j.practices)),
    seniorities: unique(jobs.flatMap((j) => j.seniority)),
  }
}

const WORK_MODE_KEYS: Record<string, string> = { Remote: 'remote', Hybrid: 'hybrid', 'On-site': 'onsite' }

/** Translated labels for Notion option values, falling back to the raw value for new options. */
export const useJobLabels = () => {
  const { t, te } = useI18n()
  const label = (key: string, value: string) => (te(key) ? t(key) : value)
  return {
    workMode: (value: string) => label(`jobs.work_mode.${WORK_MODE_KEYS[value] ?? value}`, value),
    seniority: (value: string) => label(`jobs.seniority_level.${value.toLowerCase()}`, value),
    isRemote: (job: Job) => job.workModes.includes('Remote'),
    /** Notion's detailed modality line when present ("Híbrido (2-3 días presenciales)"), without the repeated location. */
    modalityDetail: (job: Job) =>
      job.facts.modality?.replace(/\s*·\s*Lima,?\s*Per[uú]\s*$/i, '').trim() || job.workModes.map((m) => label(`jobs.work_mode.${WORK_MODE_KEYS[m] ?? m}`, m)).join(' · '),
    level: (job: Job) => job.facts.level || job.seniority.map((s) => label(`jobs.seniority_level.${s.toLowerCase()}`, s)).join(' · '),
  }
}
