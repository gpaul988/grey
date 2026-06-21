import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auditSubmissions } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { send } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      userName,
      userEmail,
      userPhone,
      userCompany,
      auditReportId,
      website,
      gitHubRepo,
      priority,
      budgetEstimate,
      specificIssues,
      preferredContact,
      auditData,
    } = body;

    // Validate required fields
    if (!userName || !userEmail || !priority || !preferredContact) {
      return NextResponse.json(
        { error: 'Missing required fields: userName, userEmail, priority, preferredContact' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Insert into database
    const result = await db
      .insert(auditSubmissions)
      .values({
        userName,
        userEmail,
        userPhone: userPhone || null,
        userCompany: userCompany || null,
        auditReportId: auditReportId || null,
        website: website || null,
        gitHubRepo: gitHubRepo || null,
        priority,
        budgetEstimate: budgetEstimate || null,
        specificIssues: specificIssues || null,
        preferredContact,
        auditData: auditData ? JSON.stringify(auditData) : '{}',
        status: 'new',
      })
      .returning();

    const submission = result[0];

    // Send email to user confirmation
    try {
      await send({
        to: userEmail,
        subject: '✅ Audit Request Received - Grey InfoTech',
        html: `
          <h2>We've Received Your Audit Request</h2>
          <p>Hi <strong>${userName}</strong>,</p>
          <p>Thank you for submitting your audit results. Our team is reviewing your request and will get back to you within 24 hours.</p>
          
          <h3>Request Details:</h3>
          <ul>
            <li><strong>Priority:</strong> ${priority.toUpperCase()}</li>
            <li><strong>Budget Range:</strong> ${budgetEstimate || 'Not specified'}</li>
            <li><strong>Contact Method:</strong> ${preferredContact.toUpperCase()}</li>
          </ul>

          <p><strong>Submission ID:</strong> #${submission.id}</p>
          
          <p>You'll hear from us soon!</p>
          <br/>
          <p>Best regards,<br/>
          <strong>Grey InfoTech Limited</strong><br/>
          Port Harcourt, Nigeria<br/>
          <a href="https://greyinf.com/grey">https://greyinf.com/grey</a></p>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the request, just log the error
    }

    // Send email to admin
    try {
      await send({
        to: process.env.ADMIN_EMAIL || 'hello@greyinfotech.com.ng',
        subject: `🔴 New Audit Fix Request - ${priority.toUpperCase()} Priority`,
        html: `
          <h2>New Audit Submission Received</h2>
          
          <h3>Client Information:</h3>
          <ul>
            <li><strong>Name:</strong> ${userName}</li>
            <li><strong>Email:</strong> <a href="mailto:${userEmail}">${userEmail}</a></li>
            <li><strong>Phone:</strong> ${userPhone || 'Not provided'}</li>
            <li><strong>Company:</strong> ${userCompany || 'Not provided'}</li>
            <li><strong>Preferred Contact:</strong> ${preferredContact}</li>
          </ul>

          <h3>Audit Details:</h3>
          <ul>
            <li><strong>Website:</strong> ${website || 'Not provided'}</li>
            <li><strong>GitHub Repo:</strong> ${gitHubRepo || 'Not provided'}</li>
            <li><strong>Priority:</strong> ${priority.toUpperCase()}</li>
            <li><strong>Budget Range:</strong> ${budgetEstimate || 'Not specified'}</li>
            <li><strong>Specific Issues:</strong> ${specificIssues || 'None specified'}</li>
          </ul>

          <h3>Next Steps:</h3>
          <ol>
            <li>Review the audit report in the admin dashboard</li>
            <li>Prepare a cost estimate</li>
            <li>Reach out to the client with next steps</li>
          </ol>

          <p><strong>Submission ID:</strong> #${submission.id}</p>
          <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://greyinf.com/grey'}/admin/audits/${submission.id}">View in Admin Dashboard</a></p>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send admin notification:', emailError);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Audit submission received. We will review it and get back to you within 24 hours.',
        submissionId: submission.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting audit:', error);
    return NextResponse.json(
      { error: 'Failed to submit audit request' },
      { status: 500 }
    );
  }
}

// GET all submissions (admin only)
export async function GET(req: NextRequest) {
  try {
    // TODO: Add admin auth check here
    const submissions = await db
      .select()
      .from(auditSubmissions)
      .orderBy(desc(auditSubmissions.createdAt))
      .limit(100);

    return NextResponse.json({ submissions }, { status: 200 });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
