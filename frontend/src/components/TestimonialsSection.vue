<script setup>
import { useI18n } from 'vue-i18n'
import data from '../data/portfolio-data.json'

const { t } = useI18n()

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}
</script>

<template>
  <section id="testimonials">
    <div class="section-head">
      <span class="eyebrow">{{ t('testimonials.eyebrow') }}</span>
      <h2>{{ t('testimonials.title') }}</h2>
      <p>{{ t('testimonials.subtitle') }}</p>
    </div>
    <div class="testimonial-grid">
      <div class="testimonial-card" v-for="tst in data.testimonials" :key="tst.author">
        <div class="quote-mark">"</div>
        <p class="testimonial-text">{{ tst.text }}</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">{{ initials(tst.author) }}</div>
          <div>
            <h5>{{ tst.author }}</h5>
            <span>{{ tst.role }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonial-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 22px; }
.testimonial-card {
  border: 1px solid var(--border); border-radius: 14px; padding: 26px; background: #fff;
  position: relative;
}
.testimonial-card .quote-mark { color: var(--blue-light); font-size: 2.6rem; font-weight: 800; line-height: 1; position: absolute; top: 14px; right: 20px; }
.testimonial-text { color: var(--text); font-size: 0.95rem; margin-bottom: 18px; font-style: italic; }
.testimonial-author { display: flex; align-items: center; gap: 12px; }
.testimonial-avatar {
  width: 42px; height: 42px; border-radius: 50%; background: var(--blue-light); color: var(--blue);
  display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;
}
.testimonial-author h5 { font-weight: 700; font-size: 0.9rem; }
.testimonial-author span { color: var(--muted); font-size: 0.78rem; }
</style>
