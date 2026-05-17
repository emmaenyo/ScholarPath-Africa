// lib/auth.js
import jwt from 'jsonwebtoken'
import { getDb } from './db'
import bcrypt from 'bcryptjs'

const SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production'

export function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET)
  } catch {
    return null
  }
}

export function getTokenFromRequest(req) {
  const auth = req.headers.authorization
  if (auth && auth.startsWith('Bearer ')) return auth.slice(7)
  const cookie = req.headers.cookie
  if (cookie) {
    const match = cookie.match(/admin_token=([^;]+)/)
    if (match) return match[1]
  }
  return null
}

export function requireAuth(req, res) {
  const token = getTokenFromRequest(req)
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' })
    return null
  }
  const payload = verifyToken(token)
  if (!payload) {
    res.status(401).json({ error: 'Invalid or expired token' })
    return null
  }
  return payload
}

export async function loginAdmin(email, password) {
  const db = getDb()
  const user = db.prepare('SELECT * FROM admin_users WHERE email = ?').get(email)
  if (!user) return null
  const valid = bcrypt.compareSync(password, user.password_hash)
  if (!valid) return null
  return user
}
