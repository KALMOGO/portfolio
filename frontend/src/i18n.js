import { createI18n } from 'vue-i18n'
import fr from './locales/fr.json'
import en from './locales/en.json'

const stored = localStorage.getItem('locale')
const browserLocale = navigator.language?.startsWith('fr') ? 'fr' : 'en'
const initialLocale = stored || browserLocale

const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: 'en',
  messages: { fr, en }
})

export default i18n
