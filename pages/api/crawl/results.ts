import type { NextApiRequest, NextApiResponse } from 'next';
import Database from 'better-sqlite3';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = new Database('crawler.db');
  const pages = db.prepare('SELECT * FROM pages ORDER BY crawled_at DESC LIMIT 100').all();
  const links = db.prepare('SELECT * FROM links LIMIT 1000').all();
  db.close();
  res.status(200).json({ pages, links });
} 