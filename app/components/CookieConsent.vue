<script setup lang="ts">
const { isResolved, restore, accept, decline } = useCookieConsent()
const mounted = ref(false)

onMounted(() => {
  restore()
  mounted.value = true
})
</script>
<template>
  <div v-if="mounted && !isResolved" class="cookie-consent" role="dialog" aria-live="polite">
    <div class="cookie-consent__body">
      <IconCookie class="cookie-consent__icon" />
      <p class="cookie-consent__text">{{ $t('cookie_consent.text') }}</p>
    </div>
    <div class="cookie-consent__actions">
      <button type="button" class="cookie-consent__btn cookie-consent__btn--ghost" @click="decline">
        {{ $t('cookie_consent.decline') }}
      </button>
      <button type="button" class="cookie-consent__btn cookie-consent__btn--fill" @click="accept">
        {{ $t('cookie_consent.accept') }}
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.cookie-consent {
  @apply fixed bottom-4 left-4 right-4 z-[110] mx-auto max-w-[720px];
  @apply flex flex-col gap-4 rounded-2xl bg-white p-5 text-black shadow-custom;
  @screen md {
    @apply flex-row items-center justify-between;
  }
  &__body {
    @apply flex items-start gap-3;
  }
  &__icon {
    @apply mt-0.5 h-6 w-6 shrink-0 text-primary;
  }
  &__text {
    @apply text-sm leading-[21px];
  }
  &__actions {
    @apply flex shrink-0 gap-3;
  }
  &__btn {
    @apply h-10 rounded-lg px-4 text-sm font-bold;
    &--ghost {
      @apply border border-black bg-transparent;
    }
    &--fill {
      @apply bg-primary text-white hover:bg-[#2C23B9];
    }
  }
}
</style>
