import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import nodemailer from 'nodemailer'
import publicRoutes from './routes/public.js'
import adminRoutes from './routes/admin.js'

const app = express()
const PORT = process.env.PORT || 3001
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173'

app.use(cors({ origin: CORS_ORIGIN }))
app.use(express.json({ limit: '10kb' }))

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
})

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts, please try again later.' }
})

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api', publicRoutes)
app.use('/api/admin/login', loginLimiter)
app.use('/api/admin', adminRoutes)

app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, email, message } = req.body ?? {}

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email and message are required.' })
  }
  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid field types.' })
  }
  if (name.length > 100 || message.length > 3000) {
    return res.status(400).json({ error: 'Field too long.' })
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' })
  }

  try {
    const transporter = getTransporter()
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER || process.env.SMTP_USER,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`
    })
    res.json({ ok: true })
  } catch (err) {
    console.error('Failed to send contact email:', err.message)
    res.status(502).json({ error: 'Could not send message right now.' })
  }
})

app.listen(PORT, () => {
  console.log(`Contact API listening on port ${PORT}`)
})
