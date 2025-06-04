import type { NextApiRequest, NextApiResponse } from 'next';
import { generateInviteCode } from '../../../lib/inviteCode';
import { sendInviteCodesEmail } from '../../../lib/sendInviteEmail';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { email, quantity = 1, codeOptions = {} } = req.body;
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required' });
  }
  if (quantity < 1 || quantity > 10) {
    return res.status(400).json({ error: 'Quantity must be between 1 and 10' });
  }
  try {
    const codes = Array.from({ length: quantity }, () =>
      generateInviteCode({ uses: 1, ...codeOptions })
    );
    await sendInviteCodesEmail({ to: email, codes, quantity });
    return res.status(200).json({ success: true, codes });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to generate or send codes' });
  }
} 