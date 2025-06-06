import type { NextApiRequest, NextApiResponse } from 'next';
import { startCrawl } from '../../../lib/monitoring';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { url } = req.body;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid url' });
  }
  try {
    await startCrawl(url);
    return res.status(200).json({ message: 'Crawl started', url });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
} 