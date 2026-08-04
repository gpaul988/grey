/* eslint-disable @typescript-eslint/no-explicit-any, prefer-const */
import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';
import { sendConfirmationEmail, sendAdminNotification } from '@/lib/email-service';
import { logSentEmail } from '@/lib/email-inbox';
import { notifyAdminPanel } from '@/lib/admin-notify';

function getDb() {
  const dbPath = path.join(process.cwd(), 'Admin', 'data', 'grey.db');
  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  return db;
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let body: Record<string, any> = {};

    if (contentType.includes('application/json')) {
      body = await req.json();
    } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await req.formData();
      for (const [key, value] of formData.entries()) {
        if (typeof value === 'string') body[key] = value;
      }
    } else {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
    }

    // Log incoming data for debugging
    console.log('[submit-form] Received body:', JSON.stringify(body, null, 2));

    const {
      name,
      email,
      telephone,
      country,
      companyOrPersonal,
      projectType,
      industryType,
      subject,
      message,
      companyName,
      companySize,
      meeting,
      howDidYouHear,
      otherHowDidYouHear,
      otherProjectType,
      otherIndustryType,
      otherSubject,
      otherCountry,
      budget,
      currency,
      timeline,
      additionalMessage,
      requirementFiles,
      formType,
    } = body;

    // Debug individual fields
    console.log('[submit-form] Extracted fields:', {
      name: typeof name, nameValue: name,
      email: typeof email, emailValue: email,
      telephone: typeof telephone, telephoneValue: telephone,
      budget: typeof budget, budgetValue: budget,
      currency: typeof currency, currencyValue: currency,
      timeline: typeof timeline, timelineValue: timeline,
      projectType: typeof projectType, projectTypeValue: projectType,
      companyName: typeof companyName, companyNameValue: companyName,
      message: typeof message, messageValue: message,
      additionalMessage: typeof additionalMessage, additionalMessageValue: additionalMessage,
      requirementFiles: typeof requirementFiles, requirementFilesValue: requirementFiles,
      formType: typeof formType, formTypeValue: formType,
    });

    // Validate required fields - trim and check for empty strings
    const validatedName = typeof name === 'string' ? name.trim() : '';
    const validatedEmail = typeof email === 'string' ? email.trim() : '';
    const validatedTelephone = typeof telephone === 'string' ? telephone.trim() : '';

    console.log('[submit-form] After validation:', {
      validatedName: validatedName,
      validatedEmail: validatedEmail,
      validatedTelephone: validatedTelephone,
    });

    // Check for empty strings or missing fields
    if (!validatedName || validatedName.length === 0) {
      console.log('[submit-form] Validation failed - name is empty');
      return NextResponse.json(
        { error: 'Name is required and cannot be empty' },
        { status: 400 }
      );
    }

    if (!validatedEmail || validatedEmail.length === 0) {
      console.log('[submit-form] Validation failed - email is empty');
      return NextResponse.json(
        { error: 'Email is required and cannot be empty' },
        { status: 400 }
      );
    }

    if (!validatedTelephone || validatedTelephone.length === 0) {
      console.log('[submit-form] Validation failed - telephone is empty');
      return NextResponse.json(
        { error: 'Phone number is required and cannot be empty' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(validatedEmail)) {
      console.log('[submit-form] Email validation failed:', validatedEmail);
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Insert into SQLite
    const db = getDb();
    let submissionId: number;
    let insertSubject: string;
    let insertProjectType: string;
    let insertBudget: string;
    let insertMessage: string;
    
    // Prepare values for insert before try block to avoid uninitialized use
    const trimmedDescription = (message || additionalMessage || 'No description provided').trim();
    insertSubject = timeline || subject || otherSubject || 'Not specified';
    insertProjectType = projectType || otherProjectType || 'Not specified';
    insertMessage = trimmedDescription;
    insertBudget = budget || 'Not specified';
    
    try {
      
      // Check if table has these columns - if error occurs, we'll handle it
      const stmt = db.prepare(`
        INSERT INTO submissions (
          name, 
          email, 
          phone, 
          subject, 
          project_type, 
          budget, 
          message, 
          source, 
          status,
          company_name,
          currency,
          timeline,
          project_type_other,
          additional_notes
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, 'website', 'new', ?, ?, ?, ?, ?)
      `);
      
      console.log('[submit-form] Executing INSERT with values:', {
        name: validatedName,
        email: validatedEmail,
        phone: validatedTelephone,
        subject: insertSubject,
        projectType: insertProjectType,
        budget: insertBudget,
        message: insertMessage,
        companyName: companyName || null,
        currency: currency || 'USD',
        timeline: timeline || null,
        projectTypeOther: otherProjectType || null,
        additionalNotes: additionalMessage || null,
      });
      
      const result = stmt.run(
        validatedName,
        validatedEmail,
        validatedTelephone,
        insertSubject,
        insertProjectType,
        insertBudget,
        insertMessage,
        companyName || null,
        currency || 'USD',
        timeline || null,
        otherProjectType || null,
        additionalMessage || null
      );
      
      console.log('[submit-form] INSERT succeeded, lastInsertRowid:', result.lastInsertRowid);
      
      submissionId = result.lastInsertRowid as number;
      
      if (!submissionId) {
        console.error('[submit-form] No submission ID returned from insert');
        db.close();
        return NextResponse.json(
          { error: 'Failed to create submission record' },
          { status: 500 }
        );
      }
      
      db.close();
      
      notifyAdminPanel({ type: 'submission', id: submissionId, name: validatedName, email: validatedEmail });
    } catch (dbErr: any) {
      console.error('[submit-form] Database error:', dbErr);
      console.error('[submit-form] Error message:', dbErr.message);
      
      // Try fallback with basic columns only
      if (dbErr.message && dbErr.message.includes('no such column')) {
        try {
          console.log('[submit-form] Attempting fallback INSERT with basic columns');
          const fallbackStmt = db.prepare(`
            INSERT INTO submissions (name, email, phone, subject, project_type, budget, message, source, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'website', 'new')
          `);
          
          const fallbackResult = fallbackStmt.run(
            validatedName,
            validatedEmail,
            validatedTelephone,
            insertSubject,
            insertProjectType,
            insertBudget,
            insertMessage
          );
          
          console.log('[submit-form] Fallback INSERT succeeded, lastInsertRowid:', fallbackResult.lastInsertRowid);
          submissionId = fallbackResult.lastInsertRowid as number;
          
          if (!submissionId) {
            throw new Error('No submission ID from fallback');
          }
          
          db.close();
          
          notifyAdminPanel({ type: 'submission', id: submissionId, name: validatedName, email: validatedEmail });
        } catch (fallbackErr) {
          console.error('[submit-form] Fallback INSERT also failed:', fallbackErr);
          db.close();
          return NextResponse.json(
            { error: 'Failed to save submission to database - schema mismatch', ok: false },
            { status: 500 }
          );
        }
      } else {
        db.close();
        return NextResponse.json(
          { error: 'Failed to save submission to database', ok: false },
          { status: 500 }
        );
      }
    }

    // Send emails (non-blocking  - don't fail if SMTP not configured)
    const resolvedProjectType = projectType || otherProjectType || 'General';
    const resolvedCountry = country || otherCountry || 'Not specified';
    const resolvedIndustry = industryType || otherIndustryType || 'Not specified';
    const resolvedSubject = subject || otherSubject || 'Not specified';

    console.log('[submit-form] Preparing to send confirmation email to:', validatedEmail);
    try {
      const confirmationResult = await sendConfirmationEmail({
        to: validatedEmail,
        name: validatedName,
        subject: '✅ We Received Your Message - Grey InfoTech',
        submissionId: submissionId,
        message: `Thank you for reaching out! Here are the details we received:\n\nProject Type: ${resolvedProjectType}\nBudget: ${insertBudget}\nTimeline: ${timeline || 'Not specified'}\n\nWe will get back to you within 24 hours.`
      });
      
      logSentEmail({
        to: validatedEmail,
        subject: '✅ We Received Your Message - Grey InfoTech',
        messageId: confirmationResult.messageId,
        error: confirmationResult.error
      });
      
      console.log('[submit-form] Confirmation email sent successfully to:', email);
    } catch (emailErr) {
      console.error('[submit-form] Confirmation email failed:', emailErr);
    }

    console.log('[submit-form] Preparing to send admin notification to:', process.env.ADMIN_EMAIL || 'hello@greyinfotech.com.ng');
    try {
      const adminHtml = `
        <div style="font-family:Arial,sans-serif;color:#333;max-width:600px;margin:0 auto;">
          <h2 style="color:#059669;">New Contact Form Submission</h2>
          <ul>
            <li><strong>Name:</strong> ${validatedName}</li>
            <li><strong>Email:</strong> ${validatedEmail}</li>
            <li><strong>Phone:</strong> ${validatedTelephone}</li>
            <li><strong>Company:</strong> ${companyName || 'Not specified'}</li>
            <li><strong>Country:</strong> ${resolvedCountry}</li>
            <li><strong>Company/Personal:</strong> ${companyOrPersonal || 'Not specified'}</li>
            ${companySize ? `<li><strong>Company Size:</strong> ${companySize}</li>` : ''}
            <li><strong>Project Type:</strong> ${resolvedProjectType}</li>
            ${otherProjectType ? `<li><strong>Project Type (Other):</strong> ${otherProjectType}</li>` : ''}
            <li><strong>Budget:</strong> ${insertBudget}</li>
            <li><strong>Currency:</strong> ${currency || 'USD'}</li>
            <li><strong>Timeline:</strong> ${timeline || 'Not specified'}</li>
            <li><strong>Industry:</strong> ${resolvedIndustry}</li>
            <li><strong>Subject:</strong> ${resolvedSubject}</li>
            ${meeting ? `<li><strong>Meeting:</strong> ${meeting}</li>` : ''}
            ${howDidYouHear ? `<li><strong>Source:</strong> ${howDidYouHear}${otherHowDidYouHear ? ` (${otherHowDidYouHear})` : ''}</li>` : ''}
          </ul>
          <h3>Project Description:</h3>
          <blockquote style="background:#f5f5f5;padding:10px;border-left:4px solid #059669;">
            ${insertMessage || 'No description provided'}
          </blockquote>
          ${additionalMessage ? `<h3>Additional Notes:</h3><blockquote style="background:#f5f5f5;padding:10px;border-left:4px solid #059669;">${additionalMessage}</blockquote>` : ''}
          ${requirementFiles && requirementFiles.length > 0 ? `<h3>Attached Files:</h3><ul>${requirementFiles.map((f: string) => `<li>${f}</li>`).join('')}</ul>` : ''}
          <p><strong>Submission ID:</strong> #${submissionId}</p>
          <p><strong>Reply To:</strong> ${validatedEmail}</p>
        </div>
      `;
      
      const adminNotificationResult = await sendAdminNotification({
        subject: `📋 New Contact Form Submission - ${resolvedProjectType}`,
        html: adminHtml,
        replyTo: validatedEmail
      });
      
      logSentEmail({
        to: process.env.ADMIN_EMAIL || 'hello@greyinfotech.com.ng',
        subject: `📋 New Contact Form Submission - ${resolvedProjectType}`,
        messageId: adminNotificationResult.messageId,
        error: adminNotificationResult.error
      });
      
      console.log('[submit-form] Admin notification email sent successfully');
    } catch (emailErr) {
      console.error('[submit-form] Admin notification email failed:', emailErr);
    }

    console.log('[submit-form] Form submission complete. Returning 201 with submissionId:', submissionId);
    return NextResponse.json(
      {
        ok: true,
        success: true,
        message: 'Form submitted successfully. We will get back to you within 24 hours.',
        submissionId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[submit-form] Error:', error);
    return NextResponse.json({ error: 'Failed to submit form', ok: false }, { status: 500 });
  }
}
