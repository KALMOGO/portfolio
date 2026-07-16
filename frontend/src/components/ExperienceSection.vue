<script setup>
import { useI18n } from 'vue-i18n'
import { useLocalizedField } from '../composables/useLocalizedField'
import data from '../data/portfolio-data.json'

const { t } = useI18n()
const { lf } = useLocalizedField()
</script>

<template>
  <section id="experience">
    <div class="section-head">
      <span class="eyebrow">{{ t('experience.eyebrow') }}</span>
      <h2>{{ t('experience.title') }}</h2>
    </div>
    <div class="timeline">
      <div class="tl-item" v-for="exp in data.experience" :key="exp.title">
        <div class="role-meta">{{ exp.period }} · {{ lf(exp.type) }}</div>
        <h4>{{ exp.title }} — {{ exp.company }}</h4>
        <p class="location">{{ exp.location }}</p>
        <p>{{ exp.description }}</p>
        <ul class="highlights">
          <li v-for="h in exp.highlights" :key="h">{{ h }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline { position: relative; padding-left: 28px; border-left: 2px solid var(--border); }
.tl-item { position: relative; margin-bottom: 36px; }
.tl-item:last-child { margin-bottom: 0; }
.tl-item::before {
  content: ''; position: absolute; left: -35px; top: 4px; width: 14px; height: 14px;
  background: var(--blue); border-radius: 50%; border: 3px solid #fff; box-shadow: 0 0 0 2px var(--blue);
}
.tl-item h4 { font-weight: 700; margin: 4px 0; }
.tl-item .role-meta { color: var(--blue); font-size: 0.85rem; font-weight: 600; margin-bottom: 4px; }
.tl-item .location { color: var(--muted); font-size: 0.82rem; margin-bottom: 8px; }
.tl-item p { color: var(--muted); font-size: 0.92rem; }
.highlights { margin-top: 10px; padding-left: 18px; color: var(--muted); font-size: 0.88rem; display: flex; flex-direction: column; gap: 4px; }
</style>
