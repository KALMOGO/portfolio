<script setup>
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
</script>

<template>
  <section id="services">
    <div class="section-head">
      <span class="eyebrow">{{ t('services.eyebrow') }}</span>
      <h2>{{ t('services.title') }}</h2>
      <p>{{ t('services.subtitle') }}</p>
    </div>
    <div class="skills-grid">
      <div class="skill-card" v-for="(item, i) in tm('services.items')" :key="i">
        <div class="icon">{{ item.icon }}</div>
        <h4>{{ item.title }}</h4>
        <p>{{ item.desc }}</p>
      </div>
    </div>
    <div class="cta-wrap">
      <a href="#contact" class="btn">{{ t('services.cta') }}</a>
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
  margin: 0 auto 12px; font-size: 1.3rem;
}
.skill-card h4 { font-size: 0.95rem; font-weight: 700; }
.skill-card p { font-size: 0.78rem; color: var(--muted); margin-top: 4px; }
.cta-wrap { text-align: center; margin-top: 28px; }
</style>
