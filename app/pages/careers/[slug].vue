<script lang="ts" setup>
import type { JobIconName } from '~/components/JobIcon.vue'
import { OG_IMAGE, SITE_URL } from '~/constants/app'

const route = useRoute()
const { locale } = useI18n()
const { all, bySlug } = useJobs()
const labels = useJobLabels()
const job = bySlug(String(route.params.slug))

if (!job) {
  throw createError({ statusCode: 404, statusMessage: 'Opportunity not found', fatal: true })
}

const { sections } = job

// Same practice first, then the most recent ones.
const related = [
  ...all.filter((j) => j.slug !== job.slug && j.practices.some((p) => job.practices.includes(p))),
  ...all.filter((j) => j.slug !== job.slug && !j.practices.some((p) => job.practices.includes(p))),
].slice(0, 3)

const published = computed(() =>
  new Intl.DateTimeFormat(locale.value, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${job.published}T00:00:00Z`)),
)

const subtitle = [job.sector, ...job.areas].filter((item): item is string => Boolean(item))

/** Picks an icon for a benefit from its wording; anything unrecognised gets a star. */
const benefitIcon = (html: string): JobIconName => {
  const text = html.toLowerCase()
  if (/eps|seguro|salud/.test(text)) return 'shield'
  if (/planilla|contrato/.test(text)) return 'document'
  if (/beneficios de ley|bono|utilidad|vale|descuento/.test(text)) return 'gift'
  if (/remot|h[ií]brid|presencial|modalidad/.test(text)) return 'building'
  if (/crec|desarrollo|aprendizaje|pr[aá]cticas|capacita/.test(text)) return 'growth'
  if (/stack|tecnolog/.test(text)) return 'code'
  if (/equipo|ambiente|cultura|colaborativ|empowerment/.test(text)) return 'group'
  return 'star'
}

// Mobile: a fixed apply button once the header scrolls away, hidden again when the in-page call to action is on screen.
const hero = ref<HTMLElement | null>(null)
const cta = ref<HTMLElement | null>(null)
const showMobileApply = ref(false)
const updateMobileApply = () => {
  if (!hero.value || !cta.value) return
  showMobileApply.value = hero.value.getBoundingClientRect().bottom < 0 && cta.value.getBoundingClientRect().top > window.innerHeight
}
onMounted(() => {
  window.addEventListener('scroll', updateMobileApply, { passive: true })
  updateMobileApply()
})
onBeforeUnmount(() => window.removeEventListener('scroll', updateMobileApply))

useSeoMeta({
  title: `Rumbo - ${job.title}`,
  description: job.summary,
  ogTitle: `Rumbo - ${job.title}`,
  ogDescription: job.summary,
  ogImage: OG_IMAGE,
  ogType: 'website',
})

// Google for Jobs structured data.
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: job.title,
        description: job.html,
        datePosted: job.published,
        hiringOrganization: { '@type': 'Organization', name: 'Rumbo', sameAs: SITE_URL },
        jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: 'Lima', addressCountry: 'PE' } },
        ...(labels.isRemote(job) ? { jobLocationType: 'TELECOMMUTE', applicantLocationRequirements: { '@type': 'Country', name: 'Peru' } } : {}),
        directApply: false,
        url: `${SITE_URL}/careers/${job.slug}`,
      }),
    },
  ],
})
</script>
<template>
  <div class="flex flex-col w-full">
    <section ref="hero" class="job-hero">
      <div class="container xl:px-[90px] relative z-[1]">
        <NuxtLinkLocale to="/careers" class="job-hero__back">← {{ $t('jobs.back') }}</NuxtLinkLocale>
        <div class="job-hero__tags">
          <span v-for="practice in job.practices" :key="practice" class="job-hero__tag job-hero__tag--primary">{{ practice }}</span>
          <span v-for="level in job.seniority" :key="level" class="job-hero__tag">{{ labels.seniority(level) }}</span>
        </div>
        <h1>{{ job.title }}</h1>
        <p v-if="subtitle.length" class="job-hero__subtitle">
          <template v-for="(item, index) in subtitle" :key="item">
            <span v-if="index">·</span>{{ index === 0 && job.sector ? $t('jobs.detail.sector', { sector: item }) : item }}
          </template>
        </p>
        <div class="job-hero__chips">
          <span><JobIcon name="pin" />{{ job.location }}</span>
          <span><JobIcon :name="labels.isRemote(job) ? 'remote' : 'building'" />{{ labels.modalityDetail(job) }}</span>
          <span v-if="job.facts.contract"><JobIcon name="briefcase" />{{ job.facts.contract }}</span>
          <span v-if="job.facts.vacancies && job.facts.vacancies !== '1'"><JobIcon name="group" />{{ $t('jobs.detail.vacancies_count', { n: job.facts.vacancies }) }}</span>
        </div>
      </div>
    </section>

    <section class="job-body">
      <div class="container xl:px-[90px] grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10 lg:gap-14">
        <article class="job-main">
          <section v-if="sections.about" class="job-section">
            <h2>{{ $t('jobs.detail.about_title') }}</h2>
            <div class="job-rich job-rich--lead" v-html="sections.about" />
          </section>

          <div v-if="sections.impact" class="job-impact">
            <span class="job-impact__icon"><JobIcon name="level" /></span>
            <div>
              <h3>{{ $t('jobs.detail.impact_title') }}</h3>
              <div class="job-rich" v-html="sections.impact" />
            </div>
          </div>

          <section v-if="sections.responsibilities" class="job-section">
            <h2>{{ $t('jobs.detail.responsibilities_title') }}</h2>
            <div class="job-rich" v-html="sections.responsibilities" />
          </section>

          <section v-if="sections.requirements" class="job-section">
            <h2>{{ $t('jobs.detail.requirements_title') }}</h2>
            <div class="job-rich" v-html="sections.requirements" />
          </section>

          <section v-if="sections.nice" class="job-section">
            <h2>{{ $t('jobs.detail.nice_title') }}</h2>
            <div class="job-rich" v-html="sections.nice" />
          </section>

          <section v-for="other in sections.others" :key="other.title" class="job-section">
            <h2>{{ other.title }}</h2>
            <div class="job-rich" v-html="other.html" />
          </section>

          <section v-if="job.technologies.length" class="job-section">
            <h2>{{ $t('jobs.detail.tech_title') }}</h2>
            <ul class="job-tech">
              <li v-for="tech in job.technologies" :key="tech">{{ tech }}</li>
            </ul>
          </section>

          <section v-if="job.offer.length" class="job-section">
            <h2>{{ $t('jobs.detail.offer_title') }}</h2>
            <ul class="job-offer">
              <li v-for="(item, index) in job.offer" :key="index">
                <JobIcon :name="benefitIcon(item)" />
                <span v-html="item" />
              </li>
            </ul>
          </section>

          <div ref="cta" class="job-cta">
            <span class="job-cta__icon"><JobIcon name="user" /></span>
            <div class="job-cta__text">
              <h3>{{ $t('jobs.detail.cta_title') }}</h3>
              <p>{{ $t('jobs.detail.cta_description') }}</p>
            </div>
            <a :href="job.applyUrl" target="_blank" rel="noopener" class="job-btn">
              {{ $t('jobs.detail.cta_button') }}
              <JobIcon name="arrow" />
            </a>
          </div>
        </article>

        <aside class="job-aside">
          <div class="job-card-box job-apply">
            <h3>{{ $t('jobs.detail.apply_title') }}</h3>
            <p class="job-apply__role">{{ job.title }}</p>
            <dl>
              <div><dt><JobIcon name="pin" />{{ $t('jobs.detail.location') }}</dt><dd>{{ job.location }}</dd></div>
              <div><dt><JobIcon name="building" />{{ $t('jobs.detail.modality') }}</dt><dd>{{ labels.modalityDetail(job) }}</dd></div>
              <div><dt><JobIcon name="level" />{{ $t('jobs.detail.level') }}</dt><dd>{{ labels.level(job) }}</dd></div>
              <div v-if="job.facts.contract"><dt><JobIcon name="briefcase" />{{ $t('jobs.detail.contract') }}</dt><dd>{{ job.facts.contract }}</dd></div>
              <div v-if="job.facts.vacancies"><dt><JobIcon name="group" />{{ $t('jobs.detail.vacancies') }}</dt><dd>{{ job.facts.vacancies }}</dd></div>
              <div v-if="job.facts.reportsTo"><dt><JobIcon name="user" />{{ $t('jobs.detail.reports_to') }}</dt><dd>{{ job.facts.reportsTo }}</dd></div>
              <div><dt><JobIcon name="calendar" />{{ $t('jobs.detail.published') }}</dt><dd>{{ published }}</dd></div>
            </dl>
            <a :href="job.applyUrl" target="_blank" rel="noopener" class="job-btn job-btn--block">
              {{ $t('jobs.detail.apply_button') }}
              <JobIcon name="arrow" />
            </a>
            <p class="job-apply__note">{{ $t('jobs.detail.apply_note') }}</p>
          </div>

          <div class="job-card-box job-steps">
            <h3>{{ $t('jobs.how_title') }}</h3>
            <ol>
              <li v-for="step in [1, 2, 3]" :key="step">
                <span class="job-steps__number">{{ step }}</span>
                <div>
                  <h4>{{ $t(`jobs.detail.step${step}_title`) }}</h4>
                  <p>{{ $t(`jobs.detail.step${step}_description`) }}</p>
                </div>
              </li>
            </ol>
          </div>
        </aside>
      </div>
    </section>

    <section v-if="related.length" class="job-related">
      <div class="container xl:px-[90px]">
        <div class="job-related__header">
          <h2>{{ $t('jobs.detail.related_title') }}</h2>
          <NuxtLinkLocale to="/careers" class="job-related__all">
            {{ $t('jobs.detail.see_all') }}
            <JobIcon name="arrow" />
          </NuxtLinkLocale>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <JobCard v-for="r in related" :key="r.slug" :job="r" compact />
        </div>
      </div>
    </section>

    <section class="job-community">
      <div class="container xl:px-[90px] relative z-[1]">
        <div>
          <h2>{{ $t('jobs.detail.community_title') }}</h2>
          <p>{{ $t('jobs.detail.community_description') }}</p>
        </div>
        <NuxtLinkLocale to="/community" class="job-community__btn">
          {{ $t('jobs.join_cta') }}
          <JobIcon name="arrow" />
        </NuxtLinkLocale>
      </div>
    </section>

    <Transition name="job-mobile-apply">
      <div v-if="showMobileApply" class="job-mobile-apply">
        <a :href="job.applyUrl" target="_blank" rel="noopener" class="job-btn job-btn--block">
          {{ $t('jobs.detail.apply_button') }}
          <JobIcon name="arrow" />
        </a>
      </div>
    </Transition>
  </div>
</template>
<style lang="scss" scoped>
svg {
  @apply w-[18px] h-[18px] shrink-0;
}
.job-btn {
  @apply inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-primary text-white font-bold text-[15px] whitespace-nowrap transition-colors hover:bg-[#2C23B9];
  &--block {
    @apply w-full;
  }
}
.job-hero {
  @apply relative overflow-hidden bg-[#F4F3FF] pt-[84px] pb-6 lg:pt-[96px] lg:pb-7 px-3 text-black;
  // Subtle arcs echoing the Rumbo mark.
  &::before,
  &::after {
    content: '';
    @apply absolute rounded-full pointer-events-none;
  }
  &::before {
    @apply w-[560px] h-[560px] -top-[260px] -right-[120px];
    border: 90px solid rgba(56, 46, 220, 0.05);
  }
  &::after {
    @apply w-[420px] h-[420px] -bottom-[300px] right-[180px];
    border: 70px solid rgba(56, 46, 220, 0.04);
  }
  h1 {
    @apply font-dxgrafik font-semibold text-[28px] leading-[34px] lg:text-[40px] lg:leading-[48px];
  }
  &__back {
    @apply inline-block text-[14px] font-bold text-primary mb-3;
  }
  &__tags {
    @apply flex flex-wrap gap-2 mb-2;
  }
  &__tag {
    @apply text-[12px] leading-[16px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full bg-white border border-black/10;
    &--primary {
      @apply bg-[#E6E4FC] text-[#2C23B9] border-[#E6E4FC];
    }
  }
  &__subtitle {
    @apply mt-1 flex flex-wrap gap-x-2 text-[16px] lg:text-[18px] font-medium text-[#55556A];
  }
  &__chips {
    @apply mt-4 flex flex-wrap gap-2;
    span {
      @apply inline-flex items-center gap-2 h-9 px-3 rounded-lg bg-white border border-[#E4E4EA] text-[14px] text-black;
    }
  }
}
.job-body {
  @apply bg-white py-7 lg:py-9 px-3;
}
.job-main {
  @apply flex flex-col gap-7 min-w-0;
}
.job-section {
  h2 {
    @apply font-dxgrafik font-semibold text-black text-[21px] leading-[27px] lg:text-[24px] lg:leading-[30px] mb-2.5;
  }
}
.job-rich {
  @apply text-[16px] leading-[25px] text-[#333];
  &--lead {
    @apply text-[17px] leading-[27px];
  }
  :deep(p) {
    @apply mb-2.5 last:mb-0;
  }
  :deep(h2),
  :deep(h3) {
    @apply font-bold text-black text-[17px] mt-4 mb-1.5 first:mt-0;
  }
  :deep(ul),
  :deep(ol) {
    @apply flex flex-col gap-1.5 mb-2.5 last:mb-0;
  }
  :deep(ul > li) {
    @apply relative pl-5;
    &::before {
      content: '';
      @apply absolute left-0 top-[10px] w-1.5 h-1.5 rounded-full bg-primary;
    }
  }
  :deep(ol) {
    @apply list-decimal pl-5;
  }
  :deep(li ul) {
    @apply mt-2;
  }
  :deep(strong) {
    @apply font-semibold text-black;
  }
  :deep(a) {
    @apply text-primary underline;
  }
  :deep(hr) {
    @apply my-6 border-black/10;
  }
}
.job-impact {
  @apply flex items-center gap-4 rounded-xl bg-[#EEEDFC] px-5 py-4;
  &__icon {
    @apply w-11 h-11 shrink-0 rounded-lg bg-white text-primary flex items-center justify-center;
    svg {
      @apply w-6 h-6;
    }
  }
  h3 {
    @apply text-[16px] font-bold text-primary mb-1;
  }
  .job-rich {
    @apply text-[15px] leading-[24px];
  }
}
.job-tech {
  @apply flex flex-wrap gap-2;
  li {
    @apply px-4 h-9 inline-flex items-center rounded-full border border-[#D9D9E3] bg-white text-[14px] font-medium text-black;
  }
}
.job-offer {
  @apply grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3;
  li {
    @apply flex items-start gap-3 rounded-xl border border-[#E4E4EA] bg-white px-3.5 py-3 text-[14px] leading-[20px] text-[#333];
    svg {
      @apply w-6 h-6 text-primary mt-[-2px];
    }
  }
}
.job-cta {
  @apply flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 rounded-2xl border border-[#D9D6FA] px-5 py-4 bg-white;
  &__icon {
    @apply w-12 h-12 shrink-0 rounded-full bg-[#EEEDFC] text-primary flex items-center justify-center;
    svg {
      @apply w-7 h-7;
    }
  }
  &__text {
    @apply flex-1;
    h3 {
      @apply font-dxgrafik font-semibold text-[20px] leading-[26px] text-black;
    }
    p {
      @apply text-[15px] text-paragraph;
    }
  }
}
.job-aside {
  @apply flex flex-col gap-4 lg:sticky lg:top-[92px] self-start;
}
.job-card-box {
  @apply rounded-2xl border border-[#E4E4EA] bg-white p-5;
  box-shadow: 0 4px 20px rgba(20, 16, 60, 0.04);
  h3 {
    @apply font-dxgrafik font-semibold text-[20px] leading-[26px] text-black;
  }
}
.job-apply {
  &__role {
    @apply text-[15px] font-medium text-paragraph mt-0.5 pb-3 mb-3 border-b border-[#E4E4EA];
  }
  dl {
    @apply flex flex-col gap-2.5 mb-4 text-[14px];
    div {
      @apply grid grid-cols-[120px_1fr] gap-3;
    }
    dt {
      @apply flex items-center gap-2 text-paragraph;
    }
    dd {
      @apply text-black font-medium;
    }
  }
  &__note {
    @apply mt-2 text-center text-[13px] text-paragraph;
  }
}
.job-steps {
  ol {
    @apply mt-3 flex flex-col gap-3;
  }
  li {
    @apply flex gap-3;
  }
  &__number {
    @apply w-8 h-8 shrink-0 rounded-full bg-[#EEEDFC] text-primary text-[14px] font-bold flex items-center justify-center;
  }
  h4 {
    @apply text-[15px] font-bold text-black;
  }
  p {
    @apply text-[13px] leading-[19px] text-paragraph;
  }
}
.job-related {
  @apply bg-[#FAFAFC] py-8 lg:py-10 px-3;
  &__header {
    @apply flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4;
    h2 {
      @apply font-dxgrafik font-semibold text-black text-[22px] leading-[28px] lg:text-[26px] lg:leading-[32px];
    }
  }
  &__all {
    @apply inline-flex items-center gap-1.5 text-[15px] font-bold text-primary;
  }
}
.job-community {
  @apply relative overflow-hidden px-3 py-8 lg:py-9 text-white;
  background: linear-gradient(100deg, #0b0a3a 0%, #17135f 60%, #2a21a8 100%);
  &::before,
  &::after {
    content: '';
    @apply absolute rounded-full pointer-events-none;
  }
  &::before {
    @apply w-[520px] h-[520px] -top-[300px] -right-[60px];
    border: 80px solid rgba(124, 114, 255, 0.25);
  }
  &::after {
    @apply w-[380px] h-[380px] -bottom-[260px] right-[260px];
    border: 60px solid rgba(124, 114, 255, 0.15);
  }
  .container {
    @apply flex flex-col md:flex-row md:items-center gap-5 md:gap-12;
  }
  h2 {
    @apply font-dxgrafik font-semibold text-[24px] leading-[30px] lg:text-[30px] lg:leading-[36px];
  }
  p {
    @apply text-[15px] lg:text-[16px] text-white/80;
  }
  &__btn {
    @apply inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg border border-white/70 font-bold text-[15px] whitespace-nowrap self-start md:self-auto transition-colors hover:bg-white hover:text-[#17135f];
  }
}
.job-mobile-apply {
  @apply fixed left-0 right-0 bottom-0 z-[110] bg-white/95 backdrop-blur border-t border-[#E4E4EA] p-3 lg:hidden;
}
.job-mobile-apply-enter-active,
.job-mobile-apply-leave-active {
  @apply transition-transform duration-200;
}
.job-mobile-apply-enter-from,
.job-mobile-apply-leave-to {
  @apply translate-y-full;
}
</style>
