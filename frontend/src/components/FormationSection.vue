<script setup>
import { useI18n } from 'vue-i18n'
import { useLocalizedField } from '../composables/useLocalizedField'
import data from '../data/portfolio-data.json'

const { t } = useI18n()
const { lf } = useLocalizedField()
</script>

<template>
  <section id="formation">
    <div class="section-head">
      <span class="eyebrow">{{ t('formation.eyebrow') }}</span>
      <h2>{{ t('formation.title') }}</h2>
      <p>{{ t('formation.subtitle') }}</p>
    </div>

    <div class="roadmap">
      <div class="roadmap-line"></div>
      <div class="roadmap-track">
        <div class="roadmap-step" v-for="edu in [...data.education].reverse()" :key="edu.institution">
          <div class="node">{{ edu.flag }}</div>
          <div class="step-date">{{ edu.year }}</div>
          <h4>{{ lf(edu.degree) }}</h4>
          <p>{{ edu.institution }}<br>{{ edu.location }}</p>
          <span class="result-tag">{{ lf(edu.result) }}</span>
        </div>
      </div>
    </div>

    <h3 class="cert-title">{{ t('formation.certTitle') }}</h3>
    <div class="cert-grid">
      <div class="cert-card" v-for="cert in data.certifications" :key="cert.name">
        <div class="cert-icon">🏅</div>
        <div class="cert-body">
          <h4>{{ cert.name }}</h4>
          <p class="cert-meta">{{ cert.issuer }} · {{ cert.year }}</p>
          <div class="tags">
            <span class="tag" v-for="s in cert.skills.slice(0, 5)" :key="s">{{ s }}</span>
          </div>
          <a :href="cert.badge_url" target="_blank" rel="noopener" class="project-link">{{ t('formation.seeBadge') }} →</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.roadmap { position: relative; overflow-x: auto; padding: 10px 0 24px; }
.roadmap-line { position: absolute; top: 35px; left: 0; right: 0; height: 3px; background: var(--border); z-index: 0; }
.roadmap-track { display: flex; gap: 0; position: relative; z-index: 1; min-width: 480px; }
.roadmap-step { flex: 1; text-align: center; padding: 0 12px; }
.roadmap-step .node {
  width: 50px; height: 50px; border-radius: 50%; background: var(--blue); color: #fff;
  display: flex; align-items: center; justify-content: center; font-size: 1.2rem;
  margin: 0 auto 14px; border: 4px solid #fff; box-shadow: 0 0 0 2px var(--blue);
}
.roadmap-step .step-date { color: var(--blue); font-weight: 700; font-size: 0.78rem; margin-bottom: 4px; }
.roadmap-step h4 { font-size: 0.92rem; font-weight: 700; margin-bottom: 4px; }
.roadmap-step p { color: var(--muted); font-size: 0.8rem; margin-bottom: 8px; }
.result-tag {
  display: inline-block; background: var(--green-light); color: var(--green);
  font-size: 0.72rem; font-weight: 700; padding: 3px 10px; border-radius: 12px;
}

.cert-title { font-size: 1.3rem; font-weight: 800; margin: 50px 0 20px; text-align: center; }
.cert-grid { display: flex; flex-direction: column; gap: 14px; }
.cert-card {
  display: flex; gap: 16px; padding: 20px; border: 1px solid var(--border);
  border-radius: 12px; align-items: flex-start; transition: box-shadow .2s, border-color .2s;
}
.cert-card:hover { box-shadow: 0 8px 20px rgba(37,99,235,0.1); border-color: var(--blue); }
.cert-icon {
  width: 44px; height: 44px; background: var(--blue-light); color: var(--blue);
  border-radius: 10px; display: flex; align-items: center; justify-content: center;
  font-size: 1.3rem; flex-shrink: 0;
}
.cert-body h4 { font-weight: 700; margin-bottom: 4px; }
.cert-meta { color: var(--muted); font-size: 0.85rem; margin-bottom: 8px; }
.project-link { color: var(--blue); font-weight: 600; font-size: 0.88rem; }
</style>
