import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auditSubmissions } from '@/lib/db/schema';
import { notifyAdminPanel } from '@/lib/admin-notify';

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

        // Insert into PostgreSQL via Drizzle ORM
        const result = await db.insert(auditSubmissions).values({
            userName: finalName.trim(),
            userEmail: finalEmail.trim(),
            userPhone: finalPhone.trim() || null,
            userCompany: finalCompany?.trim() || null,
            auditReportId: auditReportId || null,
            website: website || null,
            gitHubRepo: finalGithubRepo || null,
            priority,
            budgetEstimate: budgetEstimate.trim() || null,
            specificIssues: specificIssues.trim() || null,
            preferredContact: preferredContact,
            auditData: typeof auditData === 'string' ? JSON.parse(auditData) : auditData,
            status: 'new',
        }).returning();

        if (!result || result.length === 0) {
            throw new Error('Failed to create audit submission');
        }

        const submissionId = result[0].id;

        notifyAdminPanel({ type: 'audit', id: submissionId, name: finalName, email: finalEmail });

        return NextResponse.json(
            {
                success: true,
                submissionId,
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
