import type {NextApiRequest, NextApiResponse} from 'next';
import {getAuditByExternalId} from '../../../../lib/audit/repository';
import {exportAsJSON, exportAsHTML} from '../../../../lib/audit/export';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') return res.status(405).json({error: 'Method not allowed'});

    const {id, format} = req.query;

    if (!id || typeof id !== 'string') return res.status(400).json({error: 'Missing audit ID'});

    const audit = getAuditByExternalId(id);
    if (!audit) return res.status(404).json({error: 'Audit not found'});

    // Reconstruct report object for export
    const report = {
        target: {website: audit.website, repo: audit.repo},
        generatedAt: audit.createdAt,
        overallScore: audit.overallScore,
        grade: audit.grade,
        summary: audit.summary,
        sections: audit.sections,
    };

    if (format === 'json') {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', `attachment; filename="audit-${id}.json"`);
        return res.status(200).send(exportAsJSON(report));
    }

    if (format === 'html' || format === 'pdf') {
        const html = exportAsHTML(report);

        if (format === 'html') {
            res.setHeader('Content-Type', 'text/html');
            return res.status(200).send(html);
        }

        // PDF: for now, return HTML which can be printed to PDF
        // In production, integrate html2pdf or puppeteer for server-side PDF generation
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Content-Disposition', `attachment; filename="audit-${id}.html"`);
        return res.status(200).send(html);
    }

    return res.status(400).json({error: 'Invalid format. Use: json, html, or pdf'});
}
