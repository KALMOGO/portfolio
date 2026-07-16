import { DatabaseSync } from 'node:sqlite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'data', 'portfolio.db')

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true })

export const db = new DatabaseSync(DB_PATH)
db.exec('PRAGMA journal_mode = WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS publications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    authors TEXT NOT NULL,
    venue TEXT NOT NULL,
    year TEXT NOT NULL,
    doi TEXT,
    tags TEXT NOT NULL DEFAULT '[]',
    sort_order INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    tags TEXT NOT NULL DEFAULT '[]',
    tech TEXT NOT NULL DEFAULT '[]',
    github TEXT,
    metrics TEXT,
    category TEXT NOT NULL DEFAULT 'other',
    featured INTEGER NOT NULL DEFAULT 0,
    sort_order INTEGER NOT NULL DEFAULT 0
  );
`)

function seedIfEmpty() {
  const { count: pubCount } = db.prepare('SELECT COUNT(*) AS count FROM publications').get()
  const { count: projCount } = db.prepare('SELECT COUNT(*) AS count FROM projects').get()
  if (pubCount > 0 && projCount > 0) return

  const seedPath = path.join(__dirname, 'seed-data.json')
  const seed = JSON.parse(fs.readFileSync(seedPath, 'utf8'))

  if (pubCount === 0) {
    const insertPub = db.prepare(`
      INSERT INTO publications (title, authors, venue, year, doi, tags, sort_order)
      VALUES (@title, @authors, @venue, @year, @doi, @tags, @sort_order)
    `)
    seed.publications.forEach((r, i) => insertPub.run({
      title: r.title,
      authors: r.authors,
      venue: r.venue,
      year: r.year,
      doi: r.doi ?? null,
      tags: JSON.stringify(r.tags ?? []),
      sort_order: i
    }))
  }

  if (projCount === 0) {
    const insertProj = db.prepare(`
      INSERT INTO projects (name, description, tags, tech, github, metrics, category, featured, sort_order)
      VALUES (@name, @description, @tags, @tech, @github, @metrics, @category, @featured, @sort_order)
    `)
    seed.projects.forEach((r, i) => insertProj.run({
      name: r.name,
      description: r.description,
      tags: JSON.stringify(r.tags ?? []),
      tech: JSON.stringify(r.tech ?? []),
      github: r.github ?? null,
      metrics: r.metrics ?? null,
      category: r.category ?? 'other',
      featured: r.featured ? 1 : 0,
      sort_order: i
    }))
  }
}

seedIfEmpty()

export function rowToPublication(row) {
  return { ...row, tags: JSON.parse(row.tags) }
}

export function rowToProject(row) {
  return { ...row, tags: JSON.parse(row.tags), tech: JSON.parse(row.tech), featured: !!row.featured }
}
