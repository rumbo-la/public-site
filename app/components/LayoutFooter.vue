<script setup lang="ts">
import { CALENDLY_URL } from '~/constants/calendly';
import { urlRomboLinkedIn, urlRomboYoutube, urlRomboX, urlRomboInstagram } from '~/constants/socialNetwork'

const PrivacyPolicyModal = defineAsyncComponent(
  () => import('./PrivacyPolicyModal.vue'),
);

const route = useRoute()
const showPrivacyPolicy = ref<boolean>(false)
const showCookiePolicy = ref<boolean>(false)

const isHomePage = computed(() => {
  return route.name == 'index'
})

const handleClickToTop = () => {
  if (!isHomePage.value) return

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

const handleClosePrivacyModal = () => {
  showPrivacyPolicy.value = false
}

const handleCloseCookieModal = () => {
  showCookiePolicy.value = false
}
</script>
<template>
  <footer class="footer">
    <div class="container flex flex-col gap-12 lg:gap-20">
      <div class="footer-menu-social">
        <div class="footer-logo">
          <NuxtLinkLocale to="/" @click="handleClickToTop"><img src="/logo-rumbo-blanco.svg" alt="Rumbo"></NuxtLinkLocale>
        </div>
        <div class="footer-menu">
          <NuxtLinkLocale to="/staffing" class="flex items-center item-menu">
            {{ $t('header.staffing') }}
          </NuxtLinkLocale>
          <NuxtLinkLocale  to="/recruiting" class="flex items-center item-menu">
            {{ $t('header.recruiting') }}
          </NuxtLinkLocale>
          <NuxtLinkLocale  to="/why-rumbo" class="flex items-center item-menu">
            {{ $t('header.why_rumbo') }}
          </NuxtLinkLocale>
          <NuxtLinkLocale  to="/community" class="flex items-center item-menu">
            {{ $t('header.community') }}
          </NuxtLinkLocale>
          <NuxtLink :href="CALENDLY_URL" target="_blank" rel="noopener" class="flex items-center item-menu">
            {{ $t('header.lets_talk') }}
          </NuxtLink>
        </div>
        <div class="footer-social">
          <a :href="urlRomboLinkedIn" target="_blank"><img src="/images/social-linkedin.svg" alt="Rumbo Linkedin"></a>
          <a :href="urlRomboYoutube" target="_blank"><img src="/images/social-youtube.svg" alt="Rumbo Youtube"></a>
          <a :href="urlRomboX" target="_blank"><img src="/images/social-x.svg" alt="Rumbo X"></a>
          <a :href="urlRomboInstagram" target="_blank"><img src="/images/social-instagram.svg" alt="Rumbo Instagram"></a>
        </div>
      </div>
      <div class="footer-legal">
        <div class="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-8 lg:mb-0 items-center">
          <button class="flex items-center item-menu" @click="showPrivacyPolicy = true">
            {{ $t('header.privacy_policy') }}
          </button>
          <button class="flex items-center item-menu" @click="showCookiePolicy = true">
            {{ $t('header.cookie_policy') }}
          </button>
        </div>
        <p>© 2024 Rumbo. All rights reserved.</p>
      </div>
    </div>
  </footer>
  <PrivacyPolicyModal v-if="showPrivacyPolicy" @close="handleClosePrivacyModal" />
  <CookiePolicyModal v-if="showCookiePolicy" @close="handleCloseCookieModal" />
</template>
<style lang="scss" scoped>
.footer {
  @apply bg-black text-white py-12 lg:py-20;
  &-menu-social {
    @apply flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-0;
  }
  &-logo {

  }
  &-menu {
    @apply flex flex-col lg:flex-row gap-6 lg:gap-8 w-full items-center justify-center lg:w-auto;
    
    .item-menu {
      @apply flex font-normal text-base text-white ;
    }
  }
  &-social {
    @apply flex gap-3 w-full justify-center lg:w-auto flex-row;
  }
  &-legal {
    @apply border-t border-white/30 pt-8 text-white;
    @apply flex flex-col items-center justify-center lg:flex-row-reverse;
    p {
      @apply font-normal text-sm text-white lg:mr-6;
    }
    .item-menu {
      @apply flex font-normal text-sm text-white underline;
    }
  }
}
</style>