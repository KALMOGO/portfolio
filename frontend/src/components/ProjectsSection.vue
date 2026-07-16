<script setup>
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { api } from '../api'

const { t } = useI18n()
const activeFilter = ref('all')
const projects = ref([])
const loading = ref(true)
const error = ref(false)

onMounted(async () => {
  try {
    projects.value = await api.getProjects()
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})

const categories = computed(() => {
  const seen = [...new Set(projects.value.map(p => p.category))]
  return ['all', ...seen]
})

const filteredProjects = computed(() =>
  activeFilter.value === 'all'
    ? projects.value
    : projects.value.filter(p => p.category === activeFilter.value)
)
</script>

<template>
  <section id="projects">
    <div class="section-head">
      <span class="eyebrow">{{ t('projects.eyebrow') }}</span>
      <h2>{{ t('projects.title') }}</h2>
      <p>{{ t('projects.subtitle') }}</p>
    </div>

    <p v-if="loading" class="state-msg">…</p>
    <p v-else-if="error" class="state-msg">—</p>
    <template v-else>
      <div class="filter-tabs">
        <button
          v-for="cat in categories"
          :key="cat"
          class="filter-tab"
          :class="{ active: activeFilter === cat }"
          @click="activeFilter = cat"
        >{{ t(`projects.filters.${cat}`) }}</button>
      </div>

      <div class="projects-grid">
        <div class="project-card" v-for="(proj, i) in filteredProjects" :key="proj.id">
          <div class="project-thumb">
            <span class="project-badge" :class="{ yellow: !proj.featured }">
              {{ proj.featured ? t('projects.featured') : proj.category }}
            </span>
            <span class="thumb-number">{{ String(i + 1).padStart(2, '0') }}</span>
            <div class="project-overlay">
              <a :href="proj.github" target="_blank" rel="noopener" class="btn-icon" :title="t('projects.code')">&lt;/&gt;</a>
            </div>
          </div>
          <div class="project-body">
            <h4>{{ proj.name }}</h4>
            <p>{{ proj.description }}</p>
            <div class="project-impact">✓ {{ proj.metrics }}</div>
            <div class="tags">
              <span class="tag" v-for="tag in proj.tags" :key="tag">{{ tag }}</span>
            </div>
            <a :href="proj.github" target="_blank" rel="noopener" class="project-link">{{ t('projects.viewProject') }} →</a>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<style scoped>
.state-msg { text-align: center; color: var(--muted); }
.filter-tabs { display: flex; justify-content: center; gap: 10px; margin-bottom: 36px; flex-wrap: wrap; }
.filter-tab {
  padding: 9px 20px; border-radius: 24px; border: 1px solid var(--border); background: #fff;
  font-weight: 600; font-size: 0.85rem; cursor: pointer; color: var(--muted); transition: .2s;
}
.filter-tab:hover { border-color: var(--blue); color: var(--blue); }
.filter-tab.active { background: var(--blue); color: #fff; border-color: var(--blue); }

.projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.project-card {
  border: 1px solid var(--border); border-radius: 16px; overflow: hidden;
  transition: box-shadow .3s, transform .3s; background: #fff;
  display: flex; flex-direction: column;
}
.project-card:hover { box-shadow: 0 20px 40px rgba(37,99,235,0.18); transform: translateY(-8px); }
.project-thumb {
  height: 140px; position: relative; overflow: hidden;
  background: linear-gradient(135deg, var(--blue-light), #dbeafe);
}
.project-badge {
  position: absolute; top: 12px; left: 12px; z-index: 2;
  background: var(--green); color: #fff; font-size: 0.72rem; font-weight: 700;
  padding: 5px 12px; border-radius: 20px; text-transform: capitalize;
}
.project-badge.yellow { background: var(--yellow); }
.thumb-number {
  position: absolute; top: 12px; right: 12px; z-index: 2;
  background: rgba(255,255,255,0.9); color: var(--blue); font-weight: 800; font-size: 0.8rem;
  width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
}
.project-overlay {
  position: absolute; inset: 0; background: rgba(17,24,39,0.55);
  display: flex; align-items: center; justify-content: center; gap: 12px;
  opacity: 0; transition: opacity .3s;
}
.project-card:hover .project-overlay { opacity: 1; }
.btn-icon {
  width: 44px; height: 44px; border-radius: 50%; background: #fff; color: var(--blue);
  display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem;
  transition: transform .2s, background .2s, color .2s;
}
.btn-icon:hover { transform: scale(1.1); background: var(--blue); color: #fff; }
.project-body { padding: 20px; display: flex; flex-direction: column; flex: 1; }
.project-body h4 { font-weight: 700; margin-bottom: 6px; }
.project-body p { color: var(--muted); font-size: 0.88rem; margin-bottom: 10px; flex: 1; }
.project-impact {
  display: inline-flex; align-items: center; gap: 6px; color: var(--green);
  background: var(--green-light); font-weight: 700; font-size: 0.78rem;
  padding: 5px 10px; border-radius: 8px; margin-bottom: 12px; width: fit-content;
}
.project-link { color: var(--blue); font-weight: 600; font-size: 0.88rem; }
</style>
