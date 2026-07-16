<script setup>
import { useI18n } from 'vue-i18n'
import data from '../data/portfolio-data.json'

const { t } = useI18n()
const p = data.personal
</script>

<template>
  <section id="testimonials">
    <div class="collab-box">
      <h2>{{ t('collab.title') }}</h2>
      <p>{{ t('collab.subtitle') }}</p>
      <div class="collab-actions">
        <a href="#contact" class="btn">{{ t('collab.cta') }}</a>
        <a :href="p.github" target="_blank" rel="noopener" class="btn btn-outline">GitHub</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.collab-box {
  text-align: center; background: var(--blue-light); border-radius: 20px;
  padding: 48px 24px;
}
.collab-box h2 { font-size: 1.6rem; font-weight: 800; margin-bottom: 10px; }
.collab-box p { color: var(--muted); max-width: 560px; margin: 0 auto 22px; }
.collab-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
</style>
