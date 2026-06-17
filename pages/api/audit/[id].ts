import type {NextApiRequest, NextApiResponse} from 'next';
import {getAuditByExternalId} from '../../../lib/audit/repository';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') return res.status(405).json({error: 'Method not allowed'});

    const {id} = req.query;

    if (!id || typeof id !== 'string') return res.status(400).json({error: 'Missing audit ID'});

    const audit = getAuditByExternalId(id);
    if (!audit) return res.status(404).json({error: 'Audit not found or has expired'});

    if (!audit.isPublic) return res.status(403).json({error: 'This audit is private'});

    // Return audit with shareable info
    return res.status(200).json({
        id: audit.id,
        externalId: audit.externalId,
        target: {website: audit.website, repo: audit.repo},
        overallScore: audit.overallScore,
        grade: audit.grade,
        summary: audit.summary,
        sections: audit.sections,
        viewCount: audit.viewCount,
        createdAt: audit.createdAt,
        shareUrl: `/audit-report/${audit.externalId}`,
        exportUrls: {
            json: `/api/audit/export/${audit.externalId}?format=json`,
            html: `/api/audit/export/${audit.externalId}?format=html`,
            pdf: `/api/audit/export/${audit.externalId}?format=pdf`,
        },
    });
}
