import type { NextApiRequest, NextApiResponse } from 'next';
import { validateInviteCode } from '../../../lib/inviteCode';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }
  const payload = validateInviteCode(code);
  if (!payload) {
    return res.status(400).json({ error: 'Invalid or expired code' });
  }
  return res.status(200).json({ valid: true, payload });
} 