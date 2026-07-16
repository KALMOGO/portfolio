<script setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import data from '../data/portfolio-data.json'

const { t } = useI18n()
const p = data.personal

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const form = reactive({ name: '', email: '', message: '' })
const status = ref('idle') // idle | sending | success | error

async function submitForm() {
  status.value = 'sending'
  try {
    const res = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    if (!res.ok) throw new Error('Request failed')
    status.value = 'success'
    form.name = ''
    form.email = ''
    form.message = ''
  } catch (e) {
    status.value = 'error'
  }
}

const socials = [
  { label: 'Email', short: '@', href: `mailto:${p.email}` },
  { label: 'LinkedIn', short: 'in', href: p.linkedin },
  { label: 'GitHub', short: 'GH', href: p.github },
  { label: 'Kaggle', short: 'K', href: p.kaggle },
  { label: 'Medium', short: 'M', href: p.medium }
]
</script>

<template>
  <section id="contact">
    <div class="contact-box">
      <div class="contact-info">
        <h2>{{ t('contact.title') }}</h2>
        <p>{{ t('contact.subtitle') }}</p>
        <div class="social-row">
          <a v-for="s in socials" :key="s.label" :href="s.href" target="_blank" rel="noopener" :title="s.label">{{ s.short }}</a>
        </div>
      </div>

      <form class="contact-form" @submit.prevent="submitForm">
        <input v-model="form.name" type="text" :placeholder="t('contact.form.name')" required>
        <input v-model="form.email" type="email" :placeholder="t('contact.form.email')" required>
        <textarea v-model="form.message" :placeholder="t('contact.form.message')" rows="4" required></textarea>
        <button class="btn" type="submit" :disabled="status === 'sending'">
          {{ status === 'sending' ? t('contact.form.sending') : t('contact.form.send') }}
        </button>
        <p v-if="status === 'success'" class="form-msg success">{{ t('contact.form.success') }}</p>
        <p v-if="status === 'error'" class="form-msg error">{{ t('contact.form.error') }}</p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact-box {
  background: var(--blue-light); border-radius: 20px; padding: 48px;
  display: flex; justify-content: space-between; align-items: flex-start; gap: 40px; flex-wrap: wrap;
}
.contact-info { flex: 1; min-width: 260px; }
.contact-info h2 { font-size: 1.8rem; font-weight: 800; margin-bottom: 10px; }
.contact-info p { color: var(--muted); }
.social-row { display: flex; gap: 14px; margin-top: 18px; flex-wrap: wrap; }
.social-row a {
  width: 40px; height: 40px; border-radius: 50%; background: #fff; color: var(--blue);
  display: flex; align-items: center; justify-content: center; font-weight: 700; border: 1px solid var(--border);
}
.social-row a:hover { background: var(--blue); color: #fff; }

.contact-form {
  flex: 1; min-width: 280px; display: flex; flex-direction: column; gap: 12px;
  background: #fff; padding: 24px; border-radius: 14px;
}
.contact-form input, .contact-form textarea {
  padding: 11px 14px; border: 1px solid var(--border); border-radius: 8px; font: inherit; resize: vertical;
}
.contact-form input:focus, .contact-form textarea:focus { outline: 2px solid var(--blue); border-color: transparent; }
.form-msg { font-size: 0.85rem; font-weight: 600; }
.form-msg.success { color: var(--green); }
.form-msg.error { color: #dc2626; }
</style>
