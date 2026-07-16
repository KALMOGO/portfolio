<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import data from '../data/portfolio-data.json'

const { t } = useI18n()

const icons = {
  languages: '💻', ml_ai: 'ML', nlp: 'NLP', computer_vision: '👁️',
  knowledge_representation: 'KR', llms: 'LLM', web: '🌐',
  databases: '🗄️', tools: '🛠️', epidemiology: '🦠'
}

const categories = computed(() =>
  Object.entries(data.skills).map(([key, list]) => ({
    key,
    icon: icons[key] || '⚙️',
    title: t(`skills.categories.${key}`),
    list: list.join(', ')
  }))
)
</script>

<template>
  <section id="skills">
    <div class="section-head">
      <span class="eyebrow">{{ t('skills.eyebrow') }}</span>
      <h2>{{ t('skills.title') }}</h2>
      <p>{{ t('skills.subtitle') }}</p>
    </div>
    <div class="skills-grid">
      <div class="skill-card" v-for="c in categories" :key="c.key">
        <div class="icon">{{ c.icon }}</div>
        <h4>{{ c.title }}</h4>
        <p>{{ c.list }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.skill-card {
  background: var(--white); border: 1px solid var(--border); border-radius: 12px;
  padding: 20px; text-align: center; transition: transform .2s, box-shadow .2s;
}
.skill-card:hover { transform: translateY(-4px); box-shadow: 0 10px 24px rgba(37,99,235,0.12); border-color: var(--blue); }
.skill-card .icon {
  width: 44px; height: 44px; background: var(--blue-light); color: var(--blue);
  border-radius: 10px; display: flex; align-items: center; justify-content: center;
  margin: 0 auto 12px; font-weight: 700; font-size: 0.85rem;
}
.skill-card h4 { font-size: 0.95rem; font-weight: 700; }
.skill-card p { font-size: 0.78rem; color: var(--muted); margin-top: 4px; }
</style>
