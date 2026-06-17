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

    // Fetch the saved record to return it
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

    const saved = db.prepare('SELECT * FROM audits WHERE external_id = ?').get(externalId) as any;
    if (!saved) return null;
    return mapRowToAudit(saved);
}

/**
 * Fetch audit by database ID.
 */
export function getAuditById(id: number): StoredAudit | null {
    const saved = db.prepare('SELECT * FROM audits WHERE id = ?').get(id) as any;
    if (!saved) return null;
    return mapRowToAudit(saved);
}

/**
 * Fetch latest audit for a website or repo (for scheduled checks / caching).
 */
export function getLatestAudit(website?: string, repo?: string): StoredAudit | null {
    let query = 'SELECT * FROM audits WHERE ';
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
    `).all(limit, offset) as any[];

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
    const total = (db.prepare('SELECT COUNT(*) as count FROM audits WHERE is_public = 1').get() as any).count;
    const avgScore = (db.prepare('SELECT ROUND(AVG(overall_score), 1) as avg FROM audits WHERE is_public = 1').get() as any).avg || 0;
    const grades = db.prepare(`
        SELECT grade, COUNT(*) as count FROM audits WHERE is_public = 1
        GROUP BY grade
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
