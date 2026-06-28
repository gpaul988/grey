import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/Admin/db';

export async function POST(req: NextRequest) {
    try {
        const contentType = req.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
            return NextResponse.json({ error: 'Content-Type must be application/json' }, { status: 415 });
        }

        const body = await req.json();

        // Accept both camelCase and snake_case field names for flexibility
        const {
            userName,
            name,
            userEmail,
            email,
            userPhone,
            phone,
            userCompany,
            company,
            auditReportId,
            website,
            gitHubRepo,
            githubRepo,
            priority = 'medium',
            budgetEstimate,
            specificIssues,
            preferredContact = 'email',
            auditData = {},
        } = body;

        // Normalize field names (prioritize camelCase if both exist)
        const finalName = userName || name;
        const finalEmail = userEmail || email;
        const finalPhone = userPhone || phone;
        const finalCompany = userCompany || company;
        const finalGithubRepo = gitHubRepo || githubRepo;

        // Validation: name, email, phone, budget, and issues are now required
        if (!finalName || !finalName.trim()) {
            return NextResponse.json({ error: 'Full name is required.' }, { status: 400 });
        }
        if (!finalEmail || !finalEmail.trim()) {
            return NextResponse.json({ error: 'Email address is required.' }, { status: 400 });
        }
        if (!finalPhone || !finalPhone.trim()) {
            return NextResponse.json({ error: 'Phone number is required.' }, { status: 400 });
        }
        if (!budgetEstimate || !budgetEstimate.trim()) {
            return NextResponse.json({ error: 'Budget estimate is required.' }, { status: 400 });
        }
        if (!specificIssues || !specificIssues.trim()) {
            return NextResponse.json({ error: 'Please describe the specific issues you want fixed.' }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(finalEmail)) {
            return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
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
            user_name: finalName.trim(),
            user_email: finalEmail.trim(),
            user_phone: finalPhone.trim() || null,
            user_company: finalCompany?.trim() || null,
            audit_report_id: auditReportId || null,
            website: website || null,
            github_repo: finalGithubRepo || null,
            priority,
            budget_estimate: budgetEstimate.trim() || null,
            specific_issues: specificIssues.trim() || null,
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
