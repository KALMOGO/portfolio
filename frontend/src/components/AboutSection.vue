<script setup>
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocalizedField } from '../composables/useLocalizedField'
import { api } from '../api'
import data from '../data/portfolio-data.json'
import profilePhoto from '../assets/profile.jpeg'

const { t } = useI18n()
const { lf } = useLocalizedField()
const p = data.personal

const projectCount = ref(null)
const publicationCount = ref(null)

onMounted(async () => {
  try {
    const [projects, publications] = await Promise.all([api.getProjects(), api.getPublications()])
    projectCount.value = projects.length
    publicationCount.value = publications.length
  } catch {
    // stats stay hidden if the API is unreachable
  }
})

const stats = computed(() => [
  projectCount.value != null && { value: `${projectCount.value}+`, label: t('about.stats.projects') },
  { value: data.certifications.length, label: t('about.stats.certifications') },
  publicationCount.value != null && { value: publicationCount.value, label: t('about.stats.publications') }
].filter(Boolean))
</script>

<template>
  <section id="about">
    <div class="section-head">
      <span class="eyebrow">{{ t('about.eyebrow') }}</span>
      <h2>{{ t('about.title') }}</h2>
    </div>
    <div class="about-grid">
      <div>
        <p>{{ lf(p.bio_long) }}</p>
        <div class="stats">
          <div class="stat" v-for="s in stats" :key="s.label">
            <h3>{{ s.value }}</h3>
            <span>{{ s.label }}</span>
          </div>
        </div>
      </div>
      <div>
        <div class="photo-frame">
          <img :src="profilePhoto" :alt="p.name">
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
.about-grid p { color: var(--muted); margin-bottom: 16px; }
.stats { display: flex; gap: 28px; margin-top: 24px; flex-wrap: wrap; }
.stat h3 { color: var(--blue); font-size: 1.7rem; font-weight: 800; }
.stat span { color: var(--muted); font-size: 0.85rem; }
.photo-frame {
  border-radius: 16px; width: 100%; height: 320px;
  overflow: hidden; background: var(--blue-light);
}
.photo-frame img { width: 100%; height: 100%; object-fit: cover; }
</style>
