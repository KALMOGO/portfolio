import { useI18n } from 'vue-i18n'

// Some data fields are plain strings, others are { en, fr } objects.
// This resolves either to the string for the current UI locale.
export function useLocalizedField() {
  const { locale } = useI18n()

  function lf(field) {
    if (field == null) return field
    if (typeof field === 'string') return field
    return field[locale.value] ?? field.en ?? field.fr ?? ''
  }

  return { lf }
}
