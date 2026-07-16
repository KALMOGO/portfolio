<script setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { api } from '../api'

const { t } = useI18n()
const publications = ref([])
const loading = ref(true)
const error = ref(false)

onMounted(async () => {
  try {
    publications.value = await api.getPublications()
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section id="publications">
    <div class="section-head">
      <span class="eyebrow">{{ t('publications.eyebrow') }}</span>
      <h2>{{ t('publications.title') }}</h2>
      <p>{{ t('publications.subtitle') }}</p>
    </div>
    <p v-if="loading" class="state-msg">…</p>
    <p v-else-if="error" class="state-msg">—</p>
    <div class="pub-list" v-else>
      <div class="pub-item" v-for="pub in publications" :key="pub.id">
        <div class="pub-icon">📄</div>
        <div class="pub-body">
          <h4>{{ pub.title }}</h4>
          <p class="pub-meta">{{ pub.authors }} — {{ pub.venue }}, {{ pub.year }}</p>
          <div class="tags">
            <span class="tag" v-for="tag in pub.tags" :key="tag">{{ tag }}</span>
          </div>
          <a v-if="pub.doi" :href="pub.doi" target="_blank" rel="noopener" class="project-link">{{ t('publications.readArticle') }} →</a>
          <span v-else class="pending-tag">{{ t('publications.underReview') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.state-msg { text-align: center; color: var(--muted); }
.pub-list { display: flex; flex-direction: column; gap: 14px; }
.pub-item { display: flex; gap: 16px; padding: 20px; border: 1px solid var(--border); border-radius: 12px; align-items: flex-start; transition: box-shadow .2s, border-color .2s; }
.pub-item:hover { box-shadow: 0 8px 20px rgba(37,99,235,0.1); border-color: var(--blue); }
.pub-icon { width: 44px; height: 44px; background: var(--blue-light); color: var(--blue); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0; }
.pub-body h4 { font-weight: 700; margin-bottom: 4px; }
.pub-meta { color: var(--muted); font-size: 0.85rem; margin-bottom: 8px; }
.project-link { color: var(--blue); font-weight: 600; font-size: 0.88rem; }
.pending-tag {
  display: inline-block; background: var(--yellow-light); color: var(--yellow);
  font-size: 0.78rem; font-weight: 700; padding: 4px 10px; border-radius: 8px;
}
</style>
