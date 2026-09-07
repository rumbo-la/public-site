import { META_PAGE } from '~/constants/meta'
import { OG_IMAGE } from '~/constants/app'

type PageKey = keyof typeof META_PAGE
type MetaField = 'title' | 'description' | 'keyword'

/**
 * Sets title, description, keywords and Open Graph tags for a page,
 * picking the copy that matches the active locale.
 */
export const usePageSeo = (page: PageKey) => {
  const { locale } = useI18n()
  const meta = META_PAGE[page] as Record<string, string>

  const pick = (field: MetaField) =>
    meta[`${field}_${locale.value === 'es' ? 'es' : 'en'}`] ?? ''

  useHead({
    meta: [{ name: 'keywords', content: () => pick('keyword') }],
  })

  useSeoMeta({
    title: () => pick('title'),
    description: () => pick('description'),
    ogTitle: () => pick('title'),
    ogDescription: () => pick('description'),
    ogType: 'website',
    ogImage: OG_IMAGE,
    twitterCard: 'summary',
    twitterTitle: () => pick('title'),
    twitterDescription: () => pick('description'),
  })
}
