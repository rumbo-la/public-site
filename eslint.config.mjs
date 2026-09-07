// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // Section components (HomeInfo, CommonFaq, ...) are already multi-word; UI primitives live under ui/.
    'vue/multi-word-component-names': 'off',
    // i18n messages intentionally carry inline markup (<b>, <br />, <span>).
    'vue/no-v-html': 'off',
    // One overload per event is the idiomatic defineEmits style.
    '@typescript-eslint/unified-signatures': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
})
