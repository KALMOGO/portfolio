<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { api, setToken } from '../../api'

const emit = defineEmits(['success'])
const { t } = useI18n()

const password = ref('')
const error = ref(false)
const loading = ref(false)

async function submit() {
  loading.value = true
  error.value = false
  try {
    const { token } = await api.login(password.value)
    setToken(token)
    emit('success')
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-wrap">
    <form class="login-card" @submit.prevent="submit">
      <h1>{{ t('admin.login.title') }}</h1>
      <input v-model="password" type="password" :placeholder="t('admin.login.password')" autofocus required>
      <button class="btn" type="submit" :disabled="loading">{{ t('admin.login.submit') }}</button>
      <p v-if="error" class="error">{{ t('admin.login.error') }}</p>
    </form>
  </div>
</template>

<style scoped>
.login-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--blue-light); padding: 24px; }
.login-card {
  background: #fff; border-radius: 16px; padding: 36px; width: 100%; max-width: 360px;
  display: flex; flex-direction: column; gap: 14px; box-shadow: 0 20px 40px rgba(37,99,235,0.15);
}
.login-card h1 { font-size: 1.3rem; font-weight: 800; text-align: center; margin-bottom: 6px; }
.login-card input {
  padding: 11px 14px; border: 1px solid var(--border); border-radius: 8px; font: inherit;
}
.login-card input:focus { outline: 2px solid var(--blue); border-color: transparent; }
.error { color: #dc2626; font-size: 0.85rem; text-align: center; }
</style>
