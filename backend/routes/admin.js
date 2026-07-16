import { Router } from 'express'
import crypto from 'node:crypto'
import jwt from 'jsonwebtoken'
import { db, rowToPublication, rowToProject } from '../db.js'
import { requireAdmin } from '../middleware/auth.js'

const router = Router()

function safeCompare(a, b) {
  const digestA = crypto.createHash('sha256').update(String(a)).digest()
  const digestB = crypto.createHash('sha256').update(String(b)).digest()
  return crypto.timingSafeEqual(digestA, digestB)
}

router.post('/login', (req, res) => {
  const { password } = req.body ?? {}
  if (!password || !safeCompare(password, process.env.ADMIN_PASSWORD)) {
    return res.status(401).json({ error: 'Invalid password.' })
  }
  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '12h' })
  res.json({ token })
})

router.use(requireAdmin)

// ---- Publications ----

router.post('/publications', (req, res) => {
  const { title, authors, venue, year, doi, tags } = req.body ?? {}
  if (!title || !authors || !venue || !year) {
    return res.status(400).json({ error: 'title, authors, venue and year are required.' })
  }
  const { count } = db.prepare('SELECT COUNT(*) AS count FROM publications').get()
  const info = db.prepare(`
    INSERT INTO publications (title, authors, venue, year, doi, tags, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(title, authors, venue, year, doi || null, JSON.stringify(tags ?? []), count)
  res.status(201).json(rowToPublication(db.prepare('SELECT * FROM publications WHERE id = ?').get(info.lastInsertRowid)))
})

router.put('/publications/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM publications WHERE id = ?').get(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Publication not found.' })

  const { title, authors, venue, year, doi, tags } = req.body ?? {}
  db.prepare(`
    UPDATE publications SET title = ?, authors = ?, venue = ?, year = ?, doi = ?, tags = ?
    WHERE id = ?
  `).run(
    title ?? existing.title,
    authors ?? existing.authors,
    venue ?? existing.venue,
    year ?? existing.year,
    doi !== undefined ? doi : existing.doi,
    tags !== undefined ? JSON.stringify(tags) : existing.tags,
    req.params.id
  )
  res.json(rowToPublication(db.prepare('SELECT * FROM publications WHERE id = ?').get(req.params.id)))
})

router.delete('/publications/:id', (req, res) => {
  const info = db.prepare('DELETE FROM publications WHERE id = ?').run(req.params.id)
  if (info.changes === 0) return res.status(404).json({ error: 'Publication not found.' })
  res.status(204).end()
})

// ---- Projects ----

router.post('/projects', (req, res) => {
  const { name, description, tags, tech, github, metrics, category, featured } = req.body ?? {}
  if (!name || !description) {
    return res.status(400).json({ error: 'name and description are required.' })
  }
  const { count } = db.prepare('SELECT COUNT(*) AS count FROM projects').get()
  const info = db.prepare(`
    INSERT INTO projects (name, description, tags, tech, github, metrics, category, featured, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    name, description,
    JSON.stringify(tags ?? []), JSON.stringify(tech ?? []),
    github || null, metrics || null, category || 'other', featured ? 1 : 0, count
  )
  res.status(201).json(rowToProject(db.prepare('SELECT * FROM projects WHERE id = ?').get(info.lastInsertRowid)))
})

router.put('/projects/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Project not found.' })

  const { name, description, tags, tech, github, metrics, category, featured } = req.body ?? {}
  db.prepare(`
    UPDATE projects SET name = ?, description = ?, tags = ?, tech = ?, github = ?, metrics = ?, category = ?, featured = ?
    WHERE id = ?
  `).run(
    name ?? existing.name,
    description ?? existing.description,
    tags !== undefined ? JSON.stringify(tags) : existing.tags,
    tech !== undefined ? JSON.stringify(tech) : existing.tech,
    github !== undefined ? github : existing.github,
    metrics !== undefined ? metrics : existing.metrics,
    category ?? existing.category,
    featured !== undefined ? (featured ? 1 : 0) : existing.featured,
    req.params.id
  )
  res.json(rowToProject(db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id)))
})

router.delete('/projects/:id', (req, res) => {
  const info = db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id)
  if (info.changes === 0) return res.status(404).json({ error: 'Project not found.' })
  res.status(204).end()
})

export default router
