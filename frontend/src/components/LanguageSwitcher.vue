<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

function setLocale(lang) {
  locale.value = lang
  localStorage.setItem('locale', lang)
}
</script>

<template>
  <div class="lang-switch">
    <button
      :class="{ active: locale === 'fr' }"
      @click="setLocale('fr')"
      aria-label="Français"
    >FR</button>
    <span class="sep">/</span>
    <button
      :class="{ active: locale === 'en' }"
      @click="setLocale('en')"
      aria-label="English"
    >EN</button>
  </div>
</template>

<style scoped>
.lang-switch {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.85rem;
  font-weight: 700;
}
.lang-switch button {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--muted);
  padding: 4px 6px;
  border-radius: 6px;
}
.lang-switch button.active {
  color: var(--blue);
  background: var(--blue-light);
}
.sep { color: var(--border); }
</style>
