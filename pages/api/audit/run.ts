import type {NextApiRequest, NextApiResponse} from 'next';
import {z} from 'zod';
import {rateLimit, validate} from '../../../lib/apiGuard';
import {runAudit} from '../../../lib/audit/engine';

const schema = z
    .object({
        website: z
            .string()
            .trim()
            .max(2048)
            .url('Enter a valid website URL (include https://)')
            .optional()
            .or(z.literal('').transform(() => undefined)),
        repo: z
            .string()
            .trim()
            .max(2048)
            .optional()
            .or(z.literal('').transform(() => undefined)),
    })
    .refine((d) => d.website || d.repo, {
        message: 'Provide at least a website URL or a GitHub repo URL.',
        path: ['website'],
    });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({error: 'Method not allowed'});

    // Audits make multiple outbound calls — keep it cheap to abuse-proof.
    if (!rateLimit(req, res, {key: 'audit-run', limit: 8, windowMs: 10 * 60_000})) return;

    const data = validate(schema, req, res);
    if (!data) return;

    try {
        const report = await runAudit({website: data.website, repo: data.repo});
        return res.status(200).json(report);
    } catch (err: any) {
        return res.status(500).json({error: err?.message || 'Audit failed. Try again.'});
    }
}
