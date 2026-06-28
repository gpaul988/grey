import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/Admin/db';

export async function POST(req: NextRequest) {
    try {
        const contentType = req.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
            return NextResponse.json({ error: 'Content-Type must be application/json' }, { status: 415 });
        }

        const body = await req.json();

        const {
            name,
            email,
            phone,
            company,
            auditReportId,
            website,
            githubRepo,
            priority = 'medium',
            budgetEstimate,
            specificIssues,
            preferredContact = 'email',
            auditData = {},
        } = body;

        if (!name || !email) {
            return NextResponse.json({ error: 'name and email are required' }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }

        const db = getDb();

        const stmt = db.prepare(`
            INSERT INTO audit_submissions (
                user_name, user_email, user_phone, user_company,
                audit_report_id, website, github_repo,
                priority, budget_estimate, specific_issues,
                preferred_contact, audit_data, status
            ) VALUES (
                @user_name, @user_email, @user_phone, @user_company,
                @audit_report_id, @website, @github_repo,
                @priority, @budget_estimate, @specific_issues,
                @preferred_contact, @audit_data, 'new'
            )
        `);

        const result = stmt.run({
            user_name: name,
            user_email: email,
            user_phone: phone || null,
            user_company: company || null,
            audit_report_id: auditReportId || null,
            website: website || null,
            github_repo: githubRepo || null,
            priority,
            budget_estimate: budgetEstimate || null,
            specific_issues: specificIssues || null,
            preferred_contact: preferredContact,
            audit_data: typeof auditData === 'string' ? auditData : JSON.stringify(auditData),
        });

        return NextResponse.json(
            {
                success: true,
                submissionId: result.lastInsertRowid,
                message: 'Audit request submitted successfully. Our team will contact you within 24 hours.',
            },
            { status: 201 }
        );
    } catch (err) {
        console.error('[audit/submit] Error:', err);
        const message = err instanceof Error ? err.message : 'Unknown error';
        return NextResponse.json({ error: 'Failed to submit audit request', detail: message }, { status: 500 });
    }
}
