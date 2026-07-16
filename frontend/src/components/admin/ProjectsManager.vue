<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { api } from '../../api'

const { t } = useI18n()
const items = ref([])
const loading = ref(true)
const editingId = ref(null)

const emptyForm = () => ({
  name: '', description: '', tags: '', tech: '', github: '', metrics: '', category: '', featured: false
})
const form = reactive(emptyForm())

async function load() {
  loading.value = true
  items.value = await api.getProjects()
  loading.value = false
}
onMounted(load)

function startAdd() {
  Object.assign(form, emptyForm())
  editingId.value = 'new'
}
function startEdit(item) {
  Object.assign(form, {
    ...item,
    tags: item.tags.join(', '),
    tech: item.tech.join(', ')
  })
  editingId.value = item.id
}
function cancel() {
  editingId.value = null
}

async function save() {
  const payload = {
    name: form.name,
    description: form.description,
    tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
    tech: form.tech.split(',').map(s => s.trim()).filter(Boolean),
    github: form.github || null,
    metrics: form.metrics || null,
    category: form.category || 'other',
    featured: !!form.featured
  }
  if (editingId.value === 'new') {
    await api.createProject(payload)
  } else {
    await api.updateProject(editingId.value, payload)
  }
  editingId.value = null
  await load()
}

async function remove(id) {
  if (!confirm(t('admin.form.confirmDelete'))) return
  await api.deleteProject(id)
  await load()
}
</script>

<template>
  <div>
    <div class="toolbar">
      <button class="btn" @click="startAdd">+ {{ t('admin.form.add') }}</button>
    </div>

    <form v-if="editingId !== null" class="edit-form" @submit.prevent="save">
      <input v-model="form.name" placeholder="Name" required>
      <textarea v-model="form.description" placeholder="Description" rows="3" required></textarea>
      <div class="row">
        <input v-model="form.category" placeholder="Category (e.g. nlp, computer_vision)">
        <input v-model="form.github" placeholder="GitHub URL">
      </div>
      <input v-model="form.metrics" placeholder="Metrics / highlight line">
      <input v-model="form.tags" :placeholder="`Tags (${t('admin.form.tagsHint')})`">
      <input v-model="form.tech" :placeholder="`Tech stack (${t('admin.form.tagsHint')})`">
      <label class="checkbox"><input type="checkbox" v-model="form.featured"> Featured</label>
      <div class="row">
        <button class="btn" type="submit">{{ t('admin.form.save') }}</button>
        <button class="btn btn-outline" type="button" @click="cancel">{{ t('admin.form.cancel') }}</button>
      </div>
    </form>

    <p v-if="loading">…</p>
    <table v-else class="list">
      <tbody>
        <tr v-for="proj in items" :key="proj.id">
          <td>
            <strong>{{ proj.name }}</strong>
            <div class="meta">{{ proj.category }}<span v-if="proj.featured"> · featured</span></div>
          </td>
          <td class="actions">
            <button class="link-btn" @click="startEdit(proj)">{{ t('admin.form.edit') }}</button>
            <button class="link-btn danger" @click="remove(proj.id)">{{ t('admin.form.delete') }}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.toolbar { margin-bottom: 16px; }
.edit-form {
  display: flex; flex-direction: column; gap: 10px; background: var(--blue-light);
  padding: 18px; border-radius: 12px; margin-bottom: 20px;
}
.edit-form input, .edit-form textarea {
  padding: 10px 12px; border: 1px solid var(--border); border-radius: 8px; font: inherit; background: #fff; resize: vertical;
}
.row { display: flex; gap: 10px; }
.row input { flex: 1; }
.checkbox { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; }
.list { width: 100%; border-collapse: collapse; }
.list td { padding: 12px 8px; border-bottom: 1px solid var(--border); vertical-align: top; }
.meta { color: var(--muted); font-size: 0.82rem; margin-top: 2px; text-transform: capitalize; }
.actions { white-space: nowrap; text-align: right; }
.link-btn {
  background: none; border: none; color: var(--blue); font-weight: 600; cursor: pointer;
  font-size: 0.85rem; margin-left: 12px;
}
.link-btn.danger { color: #dc2626; }
</style>
