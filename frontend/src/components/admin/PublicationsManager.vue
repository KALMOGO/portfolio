<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { api } from '../../api'

const { t } = useI18n()
const items = ref([])
const loading = ref(true)
const editingId = ref(null) // null = no form, 'new' = create, or an item id

const emptyForm = () => ({ title: '', authors: '', venue: '', year: '', doi: '', tags: '' })
const form = reactive(emptyForm())

async function load() {
  loading.value = true
  items.value = await api.getPublications()
  loading.value = false
}
onMounted(load)

function startAdd() {
  Object.assign(form, emptyForm())
  editingId.value = 'new'
}
function startEdit(item) {
  Object.assign(form, { ...item, tags: item.tags.join(', ') })
  editingId.value = item.id
}
function cancel() {
  editingId.value = null
}

async function save() {
  const payload = {
    title: form.title,
    authors: form.authors,
    venue: form.venue,
    year: form.year,
    doi: form.doi || null,
    tags: form.tags.split(',').map(s => s.trim()).filter(Boolean)
  }
  if (editingId.value === 'new') {
    await api.createPublication(payload)
  } else {
    await api.updatePublication(editingId.value, payload)
  }
  editingId.value = null
  await load()
}

async function remove(id) {
  if (!confirm(t('admin.form.confirmDelete'))) return
  await api.deletePublication(id)
  await load()
}
</script>

<template>
  <div>
    <div class="toolbar">
      <button class="btn" @click="startAdd">+ {{ t('admin.form.add') }}</button>
    </div>

    <form v-if="editingId !== null" class="edit-form" @submit.prevent="save">
      <input v-model="form.title" placeholder="Title" required>
      <input v-model="form.authors" placeholder="Authors" required>
      <div class="row">
        <input v-model="form.venue" placeholder="Venue" required>
        <input v-model="form.year" placeholder="Year" required>
      </div>
      <input v-model="form.doi" placeholder="DOI / link (optional)">
      <input v-model="form.tags" :placeholder="`Tags (${t('admin.form.tagsHint')})`">
      <div class="row">
        <button class="btn" type="submit">{{ t('admin.form.save') }}</button>
        <button class="btn btn-outline" type="button" @click="cancel">{{ t('admin.form.cancel') }}</button>
      </div>
    </form>

    <p v-if="loading">…</p>
    <table v-else class="list">
      <tbody>
        <tr v-for="pub in items" :key="pub.id">
          <td>
            <strong>{{ pub.title }}</strong>
            <div class="meta">{{ pub.authors }} — {{ pub.venue }}, {{ pub.year }}</div>
          </td>
          <td class="actions">
            <button class="link-btn" @click="startEdit(pub)">{{ t('admin.form.edit') }}</button>
            <button class="link-btn danger" @click="remove(pub.id)">{{ t('admin.form.delete') }}</button>
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
.edit-form input {
  padding: 10px 12px; border: 1px solid var(--border); border-radius: 8px; font: inherit; background: #fff;
}
.row { display: flex; gap: 10px; }
.row input { flex: 1; }
.list { width: 100%; border-collapse: collapse; }
.list td { padding: 12px 8px; border-bottom: 1px solid var(--border); vertical-align: top; }
.meta { color: var(--muted); font-size: 0.82rem; margin-top: 2px; }
.actions { white-space: nowrap; text-align: right; }
.link-btn {
  background: none; border: none; color: var(--blue); font-weight: 600; cursor: pointer;
  font-size: 0.85rem; margin-left: 12px;
}
.link-btn.danger { color: #dc2626; }
</style>
