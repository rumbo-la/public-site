<script setup lang="ts">
import type { Job } from '~/composables/useJobs'

/** `compact` is the short version used for related positions on the detail page. */
const props = defineProps<{ job: Job, compact?: boolean }>()
const { locale } = useI18n()
const labels = useJobLabels()

// Dates are plain YYYY-MM-DD; format them in UTC so server and client render the same day.
const publishedLabel = computed(() =>
  new Intl.DateTimeFormat(locale.value, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${props.job.published}T00:00:00Z`)),
)
</script>
<template>
  <NuxtLinkLocale :to="`/careers/${job.slug}`" class="job-card" :class="{ 'job-card--compact': compact }">
    <div class="job-card__tags">
      <span v-for="practice in job.practices" :key="practice" class="job-card__practice">{{ practice }}</span>
    </div>
    <h4>{{ job.title }}</h4>
    <div v-if="compact" class="job-card__meta">
      <span><JobIcon name="pin" />{{ job.location }}</span>
      <span v-for="mode in job.workModes" :key="mode"><JobIcon :name="mode === 'Remote' ? 'remote' : 'building'" />{{ labels.workMode(mode) }}</span>
    </div>
    <p v-if="!compact && job.areas.length" class="job-card__areas">{{ job.areas.join(' · ') }}</p>
    <div v-if="!compact" class="job-card__chips">
      <span v-for="level in job.seniority" :key="level" class="job-card__chip job-card__chip--primary">
        <JobIcon name="group" />
        {{ labels.seniority(level) }}
      </span>
      <span v-for="mode in job.workModes" :key="mode" class="job-card__chip">
        <JobIcon :name="mode === 'Remote' ? 'remote' : 'building'" />
        {{ labels.workMode(mode) }}
      </span>
    </div>
    <template v-if="!compact">
      <p class="job-card__summary">{{ job.summary }}</p>
      <p class="job-card__location">
        <JobIcon name="pin" />
        {{ job.location }}
      </p>
    </template>
    <div class="job-card__footer">
      <span v-if="!compact" class="job-card__published">
        <JobIcon name="clock" />
        {{ $t('jobs.published_on', { date: publishedLabel }) }}
      </span>
      <span class="job-card__cta">
        {{ $t('jobs.view') }}
        <JobIcon name="arrow" />
      </span>
    </div>
  </NuxtLinkLocale>
</template>
<style lang="scss" scoped>
.job-card {
  @apply bg-white border border-[#E4E4EA] rounded-2xl p-6 flex flex-col text-black transition-shadow duration-200;
  &:hover {
    box-shadow: 0 8px 24px rgba(20, 16, 60, 0.08);
  }
  svg {
    @apply w-[18px] h-[18px] shrink-0;
  }
  h4 {
    @apply font-dxgrafik text-[22px] leading-[28px] font-semibold;
  }
  &__tags {
    @apply flex flex-wrap gap-2 mb-3;
  }
  &__practice {
    @apply text-[12px] leading-[16px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full bg-[#EEEDFC] text-[#2C23B9];
  }
  &__areas {
    @apply text-[16px] leading-[22px] text-primary font-medium mt-1;
  }
  &__chips {
    @apply flex flex-wrap gap-2 mt-4 mb-4;
  }
  &__chip {
    @apply inline-flex items-center gap-2 h-9 px-3 rounded-lg bg-[#F3F3F6] text-[14px] text-black;
    &--primary {
      @apply bg-[#EEEDFC] text-[#2C23B9];
    }
  }
  &__summary {
    @apply text-[15px] leading-[22px] text-[#444] mb-4 line-clamp-2;
  }
  &__location {
    @apply flex items-center gap-2 text-[15px] text-[#444] mb-4;
  }
  &__footer {
    @apply mt-auto flex items-center justify-between gap-3 border-t border-[#E4E4EA] pt-4;
  }
  &__published {
    @apply flex items-center gap-2 text-[14px] text-paragraph;
  }
  &__cta {
    @apply flex items-center gap-1.5 text-[15px] font-bold text-primary whitespace-nowrap;
  }
  &:hover &__cta svg {
    @apply translate-x-0.5;
  }
  &__meta {
    @apply flex flex-wrap gap-x-5 gap-y-2 mt-2 mb-3 text-[14px] text-[#444];
    span {
      @apply inline-flex items-center gap-1.5;
    }
  }
  &--compact {
    @apply p-4;
    h4 {
      @apply text-[18px] leading-[24px];
    }
    .job-card__footer {
      @apply justify-end border-t-0 pt-0;
    }
  }
}
</style>
