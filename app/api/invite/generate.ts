import type { NextApiRequest, NextApiResponse } from 'next';
import { generateInviteCode } from '../../../lib/inviteCode';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  // Dummy admin check (replace with real auth later)
  const adminToken = req.headers['x-admin-token'];
  if (adminToken !== process.env.ADMIN_TOKEN) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const payload = req.body;
  try {
    const code = generateInviteCode(payload);
    return res.status(200).json({ code });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to generate code' });
  }
} 