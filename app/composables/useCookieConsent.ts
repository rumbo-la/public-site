type Consent = 'granted' | 'denied'

const STORAGE_KEY = 'rumbo_cookie_consent'

const readStored = (): Consent | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

const applyToGtag = (consent: Consent) => {
  window.gtag?.('consent', 'update', {
    analytics_storage: consent,
    ad_storage: consent,
  })
}

/**
 * Google Analytics consent. Everything starts as `denied` (see app.vue);
 * the visitor's choice is stored in localStorage and replayed on each visit.
 */
export const useCookieConsent = () => {
  const consent = useState<Consent | null>('cookieConsent', () => null)
  const isResolved = computed(() => consent.value !== null)

  const restore = () => {
    if (!import.meta.client) return
    const stored = readStored()
    consent.value = stored
    if (stored) applyToGtag(stored)
  }

  const choose = (value: Consent) => {
    consent.value = value
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // Private mode or blocked storage: the choice still applies for this page view.
    }
    applyToGtag(value)
  }

  return {
    consent,
    isResolved,
    restore,
    accept: () => choose('granted'),
    decline: () => choose('denied'),
  }
}
