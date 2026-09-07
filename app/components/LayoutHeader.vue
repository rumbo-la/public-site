<script lang="ts" setup>
import { computed, ref } from 'vue';
import { CALENDLY_URL } from '~/constants/calendly';
import { useI18n } from 'vue-i18n';

const route = useRoute()
const { locale, setLocale  } = useI18n();

const toggleMenu = ref<boolean>(false)

const handleToggleMenu = () => {
  toggleMenu.value = !toggleMenu.value
}

const isHomePage = computed(() => {
  return route.name == 'index'
})

const handleClickToTop = () => {
  if (toggleMenu.value) toggleMenu.value = false
  if (!isHomePage.value) return
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

const changeLocale = (code: 'en' | 'es') => {
  setLocale(code)
}

</script>
<template>
  <header
    class="header"
    :class="{
      'bg-white': !toggleMenu,
      'bg-black': toggleMenu
    }"
  >
    <div class="header__container container flex justify-between items-center h-full">
      <div class="flex flex-row items-center gap-1">
        <div class="header__logo">
          <NuxtLinkLocale class="inline-flex" to="/" @click="handleClickToTop">
            <img v-if="!toggleMenu" class="w-full" src="/logo-rumbo.svg" alt="Rumbo" >
            <img v-else class="w-full" src="/logo-rumbo-blanco.svg" alt="Rumbo" >
          </NuxtLinkLocale>
        </div>
      </div>
      <div class="header__menu hidden lg:flex">
        <div class="flex text-xs font-semibold header__nav">
          <NuxtLinkLocale to="/staffing" class="flex items-center item-menu">
            Staffing
          </NuxtLinkLocale>
          <NuxtLinkLocale  to="/recruiting" class="flex items-center item-menu">
            Recruiting
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
        <div class="header__locale flex lg:ml-3 xl:ml-12">
          <button
            class="btn-locale"
            :class="{ active: locale === 'es'}"
            @click="changeLocale('es')"
          >ES</button>
          <span class="mx-0.5">|</span>
          <button
            class="btn-locale"
            :class="{ active: locale === 'en'}"
            @click="changeLocale('en')"
          >EN</button>
        </div>
      </div>
      <div class="header__burger">
        <UiButton
          variant="text"
          class="!w-12 !h-12"
          :color="!toggleMenu ? 'text-black' : 'text-white'"
          @click="handleToggleMenu"
        >
          <IconMenuOpen v-if="!toggleMenu" />
          <IconMenuClose v-else class="text-white" />
        </UiButton>
      </div>
    </div>
    <div v-if="toggleMenu" class="header__mobile">
      <div class="mobile-content flex flex-1 items-center justify-center pb-6">
        <div class="flex flex-col gap-8 py-6" @click="handleToggleMenu">
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
        </div>
      </div>
      <div class="w-full">
        <NuxtLink :href="CALENDLY_URL" target="_blank" rel="noopener" class="btn-lets-talk">
          {{ $t('header.lets_talk') }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
<style lang="scss" scoped>
.header {
  @apply py-[10px] lg:py-5 fixed top-0 left-0 w-full z-[120];
  @apply border-b border-[#EAEAEA];
  &__locale {
    @apply font-normal text-sm flex items-center text-black/50;
    .btn-locale {
      &.active {
        @apply font-bold text-black;
      }
    }
  }
  &__container {
  }
  &__burger {
    @apply block w-[48px] h-[48px];
    @screen lg {
      @apply hidden;
    }
  }
  &__logo {
    @apply w-[125px] flex items-center;
    @screen lg {
      @apply w-[165px];
    }
  }
  &__menu {
    @apply flex ;
  }

  &__nav {
    @apply flex h-full gap-6;
    @screen lg {
      @apply gap-6;
    }
    @screen xl {
      @apply gap-8;
    }
    @screen 2xl {
      @apply gap-10;
    }
    .item-menu {
      @apply text-[16px] leading-[20px] text-black hidden font-bold;
      @screen lg {
        @apply flex;
      }
      &.router-link-active {
        @apply text-primary;
      }

      &:last-child {
        @apply bg-primary text-white h-[48px] min-w-[160px] items-center justify-center rounded-lg;
        @apply font-bold text-[16px] leading-[20px];
        @screen lg {
          @apply font-bold text-[16px] leading-[20px] min-w-[160px] h-12;
        }
      }
    }
  }
  &__mobile {
    @apply bg-black text-white flex-col px-6 fixed w-full border-t border-white/20;
    height: calc(100% - 68px);
    top: 68px;
    left: 0;
    .mobile-content {
      height: calc(100% - 68px);
    }
    .item-menu {
      @apply h-12 text-[20px] leading-[30px] text-white font-bold w-full justify-center;
      @screen lg {
        @apply flex;
      }
      // &.router-link-active {
      //   @apply text-primary;
      // }
    }
    .btn-lets-talk {
      @apply w-full h-12 flex items-center justify-center text-white bg-primary rounded-lg font-bold;
    }
    @screen lg {
      @apply flex;
    }
  }
}
</style>