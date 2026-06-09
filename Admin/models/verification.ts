import { randomBytes } from 'crypto';
import db from '../db';
import type { EmailVerification } from '../db/types';

/** How long a verification / set-password link stays valid. */
const TTL_HOURS = 24;

/** Generate a short, human-readable verification ID, e.g. GIT-7F3A-9C21. */
function makeCode(): string {
    const part = () => randomBytes(2).toString('hex').toUpperCase();
    return `GIT-${part()}-${part()}`;
}

export type VerifySubject = 'user' | 'client' | 'client_staff';
export type VerifyPurpose = 'verify' | 'set_password';

export const Verification = {
    /**
     * Issue a verification record. Returns the raw token (for the link) and the
     * human-readable code (for the email body). Any older unused tokens for the
     * same subject+purpose are invalidated first so only the latest link works.
     */
    issue(args: {
        subjectType: VerifySubject;
        subjectId: number;
        email: string;
        purpose?: VerifyPurpose;
    }): { token: string; code: string } {
        const purpose = args.purpose || 'verify';
        db.prepare(
            `UPDATE email_verifications SET used_at = datetime('now')
             WHERE subject_type = ? AND subject_id = ? AND purpose = ? AND used_at IS NULL`
        ).run(args.subjectType, args.subjectId, purpose);

        const token = randomBytes(32).toString('hex');
        const code = makeCode();
        const expires = new Date(Date.now() + TTL_HOURS * 3_600_000).toISOString();
        db.prepare(
            `INSERT INTO email_verifications (subject_type, subject_id, email, token, code, purpose, expires_at)
             VALUES (@subject_type, @subject_id, @email, @token, @code, @purpose, @expires_at)`
        ).run({
            subject_type: args.subjectType,
            subject_id: args.subjectId,
            email: args.email.toLowerCase(),
            token,
            code,
            purpose,
            expires_at: expires,
        });
        return { token, code };
    },

    /** Look up an unused, unexpired token. Does NOT consume it. */
    peek(token: string): EmailVerification | null {
        const row = db
            .prepare(
                `SELECT * FROM email_verifications
                 WHERE token = ? AND used_at IS NULL AND expires_at > datetime('now')`
            )
            .get(token) as EmailVerification | undefined;
        return row ?? null;
    },

    /** Consume a token (mark used) and return it, or null if invalid. */
    consume(token: string): EmailVerification | null {
        const row = this.peek(token);
        if (!row) return null;
        db.prepare("UPDATE email_verifications SET used_at = datetime('now') WHERE id = ?").run(row.id);
        return row;
    },
};
