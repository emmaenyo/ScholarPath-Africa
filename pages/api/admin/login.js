import { loginAdmin } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const result = await loginAdmin(email, password);
  if (!result.success) return res.status(401).json({ error: result.error });
  res.setHeader('Set-Cookie', `admin_token=${result.token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax`);
  res.status(200).json({ success: true });
}
