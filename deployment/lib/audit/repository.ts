/**
 * Audit Repository — Database operations for audit reports.
 * Handles CRUD, cleanup, and retrieval of saved audits.
 */

import db from '../../Admin/db/index';
import type { AuditReport, AuditSection } from './engine';

export interface StoredAudit {
    id: number;
    website?: string;
    repo?: string;
    overallScore: number;
    grade: string;
    summary: string;
    sections: AuditSection[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    findings: any[];
    externalId: string;
    isPublic: boolean;
    viewCount: number;
    createdAt: string;
    updatedAt: string;
    expiresAt?: string;
}

/**
 * Generate a short unique ID for shareable links using nanoid-like pattern.
 * (In production, use actual nanoid package if available)
 */
function generateExternalId(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 12; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

/**
 * Save an audit report to the database.
 * Returns the stored audit with external ID for shareable link.
 */
export function saveAudit(report: AuditReport, ipAddress?: string, userAgent?: string): StoredAudit {
    const externalId = generateExternalId();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days

    const stmt = db.prepare(`
        INSERT INTO audits (
            website, repo, overall_score, grade, summary, sections, findings,
            external_id, is_public, expires_at, ip_address, user_agent,
            created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, datetime('now'), datetime('now'))
    `);

    const allFindings = report.sections.flatMap((s) => s.findings);

    stmt.run(
        report.target.website || null,
        report.target.repo || null,
        report.overallScore,
        report.grade,
        report.summary,
        JSON.stringify(report.sections),
        JSON.stringify(allFindings),
        externalId,
        expiresAt,
        ipAddress || null,
        userAgent || null
    );

    // ALSO register this run in the `audit_submissions` table so it shows up in
    // the backend Admin audit panel under "Audit Runs". The panel reads ONLY the
    // audit_submissions table and treats rows WITHOUT `specific_issues` as runs
    // and rows WITH `specific_issues` as fix requests. Without this, runs were
    // invisible to the backend. We keep `specific_issues` NULL here on purpose.
    try {
        const target = report.target.website || report.target.repo || 'Unknown target';
        const runSummary =
            `Automated audit — score ${report.overallScore}/100 (grade ${report.grade}). ` +
            `${allFindings.length} findings.`;
        
        // Build a detailed findings object with fix info for the admin panel
        const findingsBySection = report.sections.map((s) => ({
            section: s.name,
            score: s.score,
            findings: s.findings.map((f) => ({
                id: f.id,
                title: f.title,
                severity: f.severity,
                detail: f.detail,
                fix: f.fix,
                implementation: f.implementation,
            })),
        }));
        
        db.prepare(`
            INSERT INTO audit_submissions (
                user_name, user_email, user_phone, user_company,
                audit_report_id, website, github_repo,
                priority, budget_estimate, specific_issues, preferred_contact,
                audit_data, status, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, ?, ?, 'new', datetime('now'), datetime('now'))
        `).run(
            'Audit Run',
            'audit-bot@greyinfotech.com.ng',
            null,
            null,
            externalId,
            report.target.website || null,
            report.target.repo || null,
            report.grade === 'F' || report.grade === 'E' ? 'high' : 'medium',
            null,
            'email',
            JSON.stringify({
                kind: 'audit-run',
                target,
                overallScore: report.overallScore,
                grade: report.grade,
                summary: runSummary,
                findingsCount: allFindings.length,
                ipAddress: ipAddress || null,
                userAgent: userAgent || null,
                generatedAt: report.generatedAt,
                sections: findingsBySection,
                detailedSummary: report.detailedSummary,
            })
        );
    } catch (err) {
        // Non-fatal: the audit itself is already saved in `audits`.
        console.warn('[Audit] Failed to mirror run into audit_submissions:', err);
    }

    // Fetch the saved record to return it
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const saved = db.prepare('SELECT * FROM audits WHERE external_id = ?').get(externalId) as any;
    return mapRowToAudit(saved);
}

/**
 * Fetch audit by external ID (shareable link).
 * Increments view count on fetch.
 */
export function getAuditByExternalId(externalId: string): StoredAudit | null {
    const stmt = db.prepare(`
        UPDATE audits SET view_count = view_count + 1 WHERE external_id = ?
    `);
    stmt.run(externalId);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const saved = db.prepare('SELECT * FROM audits WHERE external_id = ?').get(externalId) as any;
    if (!saved) return null;
    return mapRowToAudit(saved);
}

/**
 * Fetch audit by database ID.
 */
export function getAuditById(id: number): StoredAudit | null {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const saved = db.prepare('SELECT * FROM audits WHERE id = ?').get(id) as any;
    if (!saved) return null;
    return mapRowToAudit(saved);
}

/**
 * Fetch latest audit for a website or repo (for scheduled checks / caching).
 */
export function getLatestAudit(website?: string, repo?: string): StoredAudit | null {
    let query = 'SELECT * FROM audits WHERE ';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any[] = [];

    if (website && repo) {
        query += '(website = ? OR repo = ?) ORDER BY created_at DESC LIMIT 1';
        params.push(website, repo);
    } else if (website) {
        query += 'website = ? ORDER BY created_at DESC LIMIT 1';
        params.push(website);
    } else if (repo) {
        query += 'repo = ? ORDER BY created_at DESC LIMIT 1';
        params.push(repo);
    } else {
        return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const saved = db.prepare(query).get(...params) as any;
    if (!saved) return null;
    return mapRowToAudit(saved);
}

/**
 * List all audits (for admin dashboard, with pagination).
 */
export function listAudits(limit = 50, offset = 0): {audits: StoredAudit[]; total: number} {
    const rows = db.prepare(`
        SELECT * FROM audits
        WHERE is_public = 1
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    `).all(limit, offset) as any[];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const total = (db.prepare('SELECT COUNT(*) as count FROM audits WHERE is_public = 1').get() as any).count;

    return {
        audits: rows.map((r) => mapRowToAudit(r)),
        total,
    };
}

/**
 * Delete expired audits (older than 30 days). Call this periodically.
 */
export function cleanupExpiredAudits(): number {
    const result = db.prepare(`
        DELETE FROM audits WHERE expires_at IS NOT NULL AND expires_at < datetime('now')
    `).run();
    return result.changes;
}

/**
 * Get audit statistics (for dashboard / public directory).
 */
export function getAuditStats(): {totalAudits: number; averageScore: number; gradeDistribution: Record<string, number>} {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const total = (db.prepare('SELECT COUNT(*) as count FROM audits WHERE is_public = 1').get() as any).count;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const avgScore = (db.prepare('SELECT ROUND(AVG(overall_score), 1) as avg FROM audits WHERE is_public = 1').get() as any).avg || 0;
    const grades = db.prepare(`
        SELECT grade, COUNT(*) as count FROM audits WHERE is_public = 1
        GROUP BY grade
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    `).all() as any[];

    const distribution: Record<string, number> = {A: 0, B: 0, C: 0, D: 0, E: 0, F: 0};
    for (const {grade, count} of grades) {
        distribution[grade] = count;
    }

    return {
        totalAudits: total,
        averageScore: avgScore,
        gradeDistribution: distribution,
    };
}

/**
 * Internal helper: map DB row to StoredAudit object with parsed JSON fields.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRowToAudit(row: any): StoredAudit {
    return {
        id: row.id,
        website: row.website,
        repo: row.repo,
        overallScore: row.overall_score,
        grade: row.grade,
        summary: row.summary,
        sections: JSON.parse(row.sections || '[]'),
        findings: JSON.parse(row.findings || '[]'),
        externalId: row.external_id,
        isPublic: Boolean(row.is_public),
        viewCount: row.view_count || 0,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        expiresAt: row.expires_at,
    };
}
