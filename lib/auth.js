import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getDb } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token) {
  try { return jwt.verify(token, JWT_SECRET); } catch { return null; }
}

export function requireAuth(req) {
  const cookie = req.headers.cookie || '';
  const match = cookie.match(/admin_token=([^;]+)/);
  if (!match) return { success: false, error: 'No token' };
  const payload = verifyToken(match[1]);
  if (!payload) return { success: false, error: 'Invalid token' };
  return { success: true, admin: payload };
}

export async function loginAdmin(email, password) {
  const db = getDb();
  const result = await db.execute({ sql: 'SELECT * FROM admin_users WHERE email = ?', args: [email] });
  const admin = result.rows[0];
  
  if (!admin) {
    // fallback to env credentials
    const envEmail = process.env.ADMIN_EMAIL;
    const envPassword = process.env.ADMIN_PASSWORD;
    if (email === envEmail && password === envPassword) {
      const token = signToken({ id: 1, email, role: 'admin' });
      return { success: true, token, admin: { email } };
    }
    return { success: false, error: 'Invalid credentials' };
  }

  const valid = await bcrypt.compare(password, admin.password_hash);
  if (!valid) return { success: false, error: 'Invalid credentials' };
  
  const token = signToken({ id: admin.id, email: admin.email, role: 'admin' });
  return { success: true, token, admin: { id: admin.id, email: admin.email } };
}
