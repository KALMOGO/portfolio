<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { getToken, clearToken } from '../api'
import AdminLogin from '../components/admin/AdminLogin.vue'
import PublicationsManager from '../components/admin/PublicationsManager.vue'
import ProjectsManager from '../components/admin/ProjectsManager.vue'

const { t } = useI18n()
const authenticated = ref(!!getToken())
const tab = ref('publications')

function logout() {
  clearToken()
  authenticated.value = false
}
</script>

<template>
  <AdminLogin v-if="!authenticated" @success="authenticated = true" />

  <div v-else class="admin-shell">
    <header class="admin-header">
      <div class="tabs">
        <button :class="{ active: tab === 'publications' }" @click="tab = 'publications'">{{ t('admin.nav.publications') }}</button>
        <button :class="{ active: tab === 'projects' }" @click="tab = 'projects'">{{ t('admin.nav.projects') }}</button>
      </div>
      <div class="header-actions">
        <router-link to="/">{{ t('admin.nav.backToSite') }}</router-link>
        <button class="link-btn" @click="logout">{{ t('admin.nav.logout') }}</button>
      </div>
    </header>

    <main class="admin-content">
      <PublicationsManager v-if="tab === 'publications'" />
      <ProjectsManager v-else />
    </main>
  </div>
</template>

<style scoped>
.admin-shell { max-width: 900px; margin: 0 auto; padding: 24px; }
.admin-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 28px; padding-bottom: 16px; border-bottom: 1px solid var(--border);
}
.tabs { display: flex; gap: 8px; }
.tabs button {
  padding: 8px 18px; border-radius: 20px; border: 1px solid var(--border); background: #fff;
  font-weight: 600; font-size: 0.88rem; cursor: pointer; color: var(--muted);
}
.tabs button.active { background: var(--blue); color: #fff; border-color: var(--blue); }
.header-actions { display: flex; align-items: center; gap: 18px; font-size: 0.88rem; }
.header-actions a { color: var(--blue); font-weight: 600; }
.link-btn { background: none; border: none; color: var(--muted); cursor: pointer; font-weight: 600; font-size: 0.88rem; }
</style>
