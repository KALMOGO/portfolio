<script setup>
import { useI18n } from 'vue-i18n'
import data from '../data/portfolio-data.json'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer>© {{ year }} {{ data.personal.name }} — {{ data.personal.title }}. {{ t('footer.rights') }}</footer>
</template>

<style scoped>
footer { text-align: center; padding: 28px; color: var(--muted); font-size: 0.85rem; border-top: 1px solid var(--border); }
</style>
