import { defineStore } from 'pinia';
import { ref } from 'vue';
import { countries } from '~/constants/countries';

export const useAppStore = defineStore('appStore', () => {
  const userCountry = ref<string>('')

  const setUserCountry = (newValue: string) => {
    userCountry.value = newValue;
  };

  const codePhoneCountry = computed(() => {
    return countries.find(c => c.abbreviation === userCountry.value)?.code_phone || ''
  })

  return {
    userCountry,
    codePhoneCountry,
    setUserCountry,
  };
});