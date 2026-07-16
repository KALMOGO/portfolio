<script setup>
import { useI18n } from 'vue-i18n'
import { useLocalizedField } from '../composables/useLocalizedField'
import data from '../data/portfolio-data.json'
import profilePhoto from '../assets/profile.jpeg'

const { t } = useI18n()
const { lf } = useLocalizedField()
const p = data.personal
</script>

<template>
  <section class="hero">
    <div class="hero-text">
      <span class="hero-tag" v-if="p.available">{{ t('hero.tag') }}</span>
      <h1>{{ t('hero.greeting') }} <span>{{ p.name }}</span><br>{{ p.title }}</h1>
      <p>{{ lf(p.bio_short) }}</p>
      <div class="hero-actions">
        <a href="#projects" class="btn">{{ t('hero.actions.projects') }}</a>
        <a href="#contact" class="btn btn-outline">{{ t('hero.actions.contact') }}</a>
      </div>
    </div>

    <div class="hero-photo">
      <div class="photo-frame">
        <img :src="profilePhoto" :alt="p.name">
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 90px 24px 70px;
  display: flex; align-items: center; justify-content: space-between; gap: 48px;
  max-width: 1100px; margin: 0 auto;
}
.hero-text { flex: 1; }
.hero-tag {
  display: inline-block; background: var(--blue-light); color: var(--blue-dark);
  padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;
  margin-bottom: 18px;
}
.hero-text h1 { font-size: 2.6rem; font-weight: 800; margin-bottom: 14px; line-height: 1.2; }
.hero-text h1 span { color: var(--blue); }
.hero-text p { color: var(--muted); font-size: 1.08rem; max-width: 480px; margin-bottom: 28px; }
.hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }

.hero-photo { flex-shrink: 0; width: 260px; height: 260px; }
.photo-frame {
  width: 260px; height: 260px; border-radius: 50%;
  background: var(--blue-light);
  border: 4px solid var(--blue);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.photo-frame img { width: 100%; height: 100%; object-fit: cover; }

@media (max-width: 850px) {
  .hero { flex-direction: column; text-align: center; }
  .hero-text p { margin: 0 auto 28px; }
  .hero-actions { justify-content: center; }
}
</style>
