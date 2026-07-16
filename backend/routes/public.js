import { Router } from 'express'
import { db, rowToPublication, rowToProject } from '../db.js'

const router = Router()

router.get('/publications', (_req, res) => {
  const rows = db.prepare('SELECT * FROM publications ORDER BY sort_order ASC, id ASC').all()
  res.json(rows.map(rowToPublication))
})

router.get('/projects', (_req, res) => {
  const rows = db.prepare('SELECT * FROM projects ORDER BY sort_order ASC, id ASC').all()
  res.json(rows.map(rowToProject))
})

export default router
