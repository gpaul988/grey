import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lang, namespace = 'common' } = req.query;

  if (!lang || typeof lang !== 'string' || typeof namespace !== 'string') {
    return res.status(400).json({ error: 'Invalid language or namespace' });
  }

  try {
    // Load translation file from public locales directory
    const translations = require(`../../../public/locales/${lang}/${namespace}.json`);
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    
    return res.status(200).json(translations);
  } catch (error) {
    console.error('Failed to load translations:', error);
    return res.status(404).json({ error: 'Translation file not found' });
  }
}
