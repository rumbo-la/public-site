<script lang="ts" setup>
usePageSeo('CAREERS')
const { all, practices, seniorities } = useJobs()
const labels = useJobLabels()

const query = ref<string>('')
const practice = ref<string>('')
const seniority = ref<string>('')
const remoteOnly = ref<boolean>(false)

// Accent- and case-insensitive, so "programacion" matches "Programación".
const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
const searchIndex = new Map(
  all.map((j) => [j.slug, normalize([j.title, ...j.areas, ...j.practices, j.html.replace(/<[^>]+>/g, ' ')].join(' '))]),
)

// A filter with a single value would not narrow anything down, so it stays hidden until Notion has more.
const hasRemoteChoice = all.some((j) => labels.isRemote(j)) && all.some((j) => !labels.isRemote(j))

const hasFilters = computed(() => !!(query.value.trim() || practice.value || seniority.value || remoteOnly.value))
const clearFilters = () => {
  query.value = ''
  practice.value = ''
  seniority.value = ''
  remoteOnly.value = false
}

const filtered = computed(() => {
  const terms = normalize(query.value).split(/\s+/).filter(Boolean)
  return all.filter(
    (j) =>
      terms.every((term) => searchIndex.get(j.slug)!.includes(term)) &&
      (!practice.value || j.practices.includes(practice.value)) &&
      (!seniority.value || j.seniority.includes(seniority.value)) &&
      (!remoteOnly.value || labels.isRemote(j)),
  )
})

// 2 or 4 results fill a 2-column grid evenly; a 3-column one would leave empty slots.
const gridCols = computed(() => (filtered.value.length <= 4 && filtered.value.length % 2 === 0 ? 'xl:grid-cols-2' : 'xl:grid-cols-3'))
</script>
<template>
  <div class="flex flex-col w-full">
    <section class="jobs-hero">
      <div class="container xl:px-[90px]">
        <h1>{{ $t('jobs.hero_title_a') }} <span>{{ $t('jobs.hero_title_b') }}</span></h1>
        <p class="jobs-hero__tagline">{{ $t('jobs.hero_tagline') }}</p>
        <p class="jobs-hero__subtitle">{{ $t('jobs.hero_subtitle') }}</p>
      </div>
    </section>
    <section class="jobs-section">
      <div class="container xl:px-[90px]">
        <div class="jobs-filters">
          <label class="jobs-filters__search">
            <span>{{ $t('jobs.search_label') }}</span>
            <div class="jobs-filters__input">
              <JobIcon name="search" />
              <input v-model="query" type="search" :placeholder="$t('jobs.search_placeholder')">
            </div>
          </label>
          <label v-if="practices.length > 1">
            <span>{{ $t('jobs.filter_discipline') }}</span>
            <select v-model="practice">
              <option value="">{{ $t('jobs.all') }}</option>
              <option v-for="p in practices" :key="p" :value="p">{{ p }}</option>
            </select>
          </label>
          <label v-if="seniorities.length > 1">
            <span>{{ $t('jobs.filter_seniority') }}</span>
            <select v-model="seniority">
              <option value="">{{ $t('jobs.all') }}</option>
              <option v-for="level in seniorities" :key="level" :value="level">{{ labels.seniority(level) }}</option>
            </select>
          </label>
          <label v-if="hasRemoteChoice" class="jobs-filters__check">
            <input v-model="remoteOnly" type="checkbox">
            <span>{{ $t('jobs.remote_only') }}</span>
          </label>
          <button v-if="hasFilters" type="button" class="jobs-filters__clear" @click="clearFilters">
            <JobIcon name="close" />
            {{ $t('jobs.clear_filters') }}
          </button>
        </div>
        <div class="jobs-list-header">
          <h2>{{ $t('jobs.list_title') }}</h2>
          <p><b>{{ filtered.length }}</b> {{ filtered.length === 1 ? $t('jobs.count_one') : $t('jobs.count') }}</p>
        </div>
        <div v-if="filtered.length" class="grid grid-cols-1 md:grid-cols-2 gap-5" :class="gridCols">
          <JobCard v-for="job in filtered" :key="job.slug" :job="job" />
        </div>
        <div v-else class="jobs-empty">
          <h3>{{ $t('jobs.empty_title') }}</h3>
          <p>{{ $t('jobs.empty_description') }}</p>
        </div>
        <div class="jobs-banner">
          <span class="jobs-banner__icon"><JobIcon name="group" /></span>
          <div class="jobs-banner__text">
            <h3>{{ $t('jobs.banner_title') }}</h3>
            <p>{{ $t('jobs.banner_description') }}</p>
          </div>
          <NuxtLinkLocale to="/community" class="jobs-banner__link">
            {{ $t('jobs.join_cta') }}
            <JobIcon name="arrow" />
          </NuxtLinkLocale>
        </div>
      </div>
    </section>
    <section class="jobs-section jobs-section--how">
      <div class="container xl:px-[90px]">
        <div class="jobs-how">
          <h3>{{ $t('jobs.how_title') }}</h3>
          <p>{{ $t('jobs.how_description') }}</p>
        </div>
      </div>
    </section>
    <CommonLookingForYou :is-community="true" />
  </div>
</template>
<style lang="scss" scoped>
.jobs-hero {
  @apply text-white pt-[96px] pb-8 lg:pt-[128px] lg:pb-14 px-3;
  // The photo fades into #02081D on its left edge; the overlay keeps text readable where it crops on small screens.
  background:
    linear-gradient(90deg, rgba(2, 8, 29, 0.92) 0%, rgba(2, 8, 29, 0.75) 60%, rgba(2, 8, 29, 0.45) 100%),
    #02081d url('/images/careers/bg-careers.webp') no-repeat 70% center / cover;
  @screen lg {
    background: #02081d url('/images/careers/bg-careers.webp') no-repeat right top / cover;
  }
  h1 {
    @apply font-dxgrafik font-semibold text-[30px] leading-[38px] lg:text-[48px] lg:leading-[58px] mb-2;
    span {
      @apply text-[#A9A4FF];
    }
  }
  &__tagline {
    @apply text-[18px] leading-[26px] lg:text-[22px] lg:leading-[30px] text-white;
  }
  &__subtitle {
    @apply text-[15px] leading-[22px] lg:text-[17px] lg:leading-[26px] text-white/70;
  }
}
.jobs-section {
  @apply bg-[#FAFAFC] pt-5 pb-10 lg:pt-6 lg:pb-12 px-3;
  &--how {
    @apply bg-white py-10 lg:py-14;
  }
}
.jobs-filters {
  @apply flex flex-col md:flex-row md:flex-wrap md:items-end gap-3 md:gap-5 mb-6;
  label {
    @apply flex flex-col gap-1.5 text-[12px] font-bold uppercase tracking-wide text-paragraph;
  }
  select {
    @apply h-11 rounded-lg border border-[#D4D4DC] bg-white px-4 text-[15px] font-medium text-black normal-case tracking-normal md:min-w-[200px];
  }
  &__search {
    @apply md:w-[320px];
  }
  &__input {
    @apply h-11 flex items-center gap-2 rounded-lg border border-[#D4D4DC] bg-white px-3 text-paragraph focus-within:border-primary;
    svg {
      @apply w-[18px] h-[18px] shrink-0;
    }
    input {
      @apply w-full h-full bg-transparent outline-none text-[15px] font-medium text-black normal-case tracking-normal placeholder:text-[#9A9AA5] placeholder:font-normal;
    }
  }
  label.jobs-filters__check {
    @apply h-11 flex-row items-center gap-2 cursor-pointer text-[15px] font-medium text-black normal-case tracking-normal;
    input {
      @apply w-[18px] h-[18px] accent-primary cursor-pointer;
    }
  }
  &__clear {
    @apply h-11 inline-flex items-center gap-1.5 text-[15px] font-bold text-primary self-start md:self-auto;
    svg {
      @apply w-4 h-4;
    }
  }
}
.jobs-list-header {
  @apply flex items-end justify-between gap-4 mb-4;
  h2 {
    @apply font-dxgrafik font-semibold text-black text-[24px] leading-[30px] lg:text-[32px] lg:leading-[38px];
  }
  p {
    @apply text-[15px] text-paragraph whitespace-nowrap;
    b {
      @apply text-black;
    }
  }
}
.jobs-empty {
  @apply bg-white border border-[#E4E4EA] rounded-2xl p-10 text-center flex flex-col items-center gap-3;
  h3 {
    @apply font-dxgrafik text-[22px] leading-[28px] font-semibold text-black;
  }
  p {
    @apply text-paragraph max-w-[560px];
  }
}
.jobs-banner {
  @apply mt-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 rounded-2xl bg-[#EEEDFC] px-6 py-5 lg:px-8;
  &__icon {
    @apply w-12 h-12 shrink-0 rounded-full bg-white text-primary flex items-center justify-center;
    svg {
      @apply w-6 h-6;
    }
  }
  &__text {
    @apply flex-1;
    h3 {
      @apply text-[17px] leading-[24px] font-bold text-black;
    }
    p {
      @apply text-[15px] leading-[22px] text-paragraph;
    }
  }
  &__link {
    @apply flex items-center gap-1.5 text-[16px] font-bold text-primary whitespace-nowrap;
    svg {
      @apply w-[18px] h-[18px];
    }
  }
}
.jobs-how {
  @apply max-w-[860px] mx-auto text-center flex flex-col gap-4;
  h3 {
    @apply font-dxgrafik text-[24px] leading-[30px] lg:text-[34px] lg:leading-[42px] font-semibold text-black;
  }
  p {
    @apply text-[16px] leading-[26px] lg:text-[18px] lg:leading-[30px] text-paragraph;
  }
}
</style>
