import { NextApiRequest, NextApiResponse } from 'next';
import { useServerTranslation, getLanguageFromPath } from '@/lib/i18n';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lang, namespace = 'common' } = req.query;

  if (!lang || typeof lang !== 'string' || typeof namespace !== 'string') {
    return res.status(400).json({ error: 'Invalid language or namespace' });
  }

  try {
    const { t } = await useServerTranslation(lang, namespace);
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    
    // Return translation object for namespace
    const translations = require(`../../../public/locales/${lang}/${namespace}.json`);
    
    return res.status(200).json(translations);
  } catch (error) {
    console.error('Failed to load translations:', error);
    return res.status(404).json({ error: 'Translation file not found' });
  }
}
