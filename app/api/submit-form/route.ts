import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { submissions } from '@/lib/db/schema';
import { send } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let body: any = {};

    if (contentType.includes('application/json')) {
      body = await req.json();
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      for (const [key, value] of formData.entries()) {
        if (key === 'files') {
          // Handle files if needed
          continue;
        }
        body[key] = value;
      }
    } else {
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 400 }
      );
    }

    // Extract form fields
    const {
      formType = 'ContactForm',
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
    } = body;

    // Validate required fields
    if (!name || !email || !telephone) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, telephone' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Insert into database
    const result = await db
      .insert(submissions)
      .values({
        name,
        email,
        phone: telephone || null,
        subject: subject || null,
        projectType: projectType || otherProjectType || null,
        budget: null,
        message: message || null,
        source: 'website',
        status: 'new',
      })
      .returning();

    const submission = result[0];

    // Send confirmation email to user
    try {
      await send({
        to: email,
        subject: '✅ We Received Your Message - Grey InfoTech',
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #059669;">We Received Your Message</h2>
            <p>Hi <strong>${name}</strong>,</p>
            <p>Thank you for reaching out to Grey InfoTech! We've received your contact form submission and will get back to you within 24 hours.</p>
            
            <h3>Your Information:</h3>
            <ul>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Phone:</strong> ${telephone}</li>
              <li><strong>Country:</strong> ${country || 'Not specified'}</li>
              <li><strong>Company/Personal:</strong> ${companyOrPersonal || 'Not specified'}</li>
              <li><strong>Project Type:</strong> ${projectType || otherProjectType || 'Not specified'}</li>
              <li><strong>Industry:</strong> ${industryType || otherIndustryType || 'Not specified'}</li>
              <li><strong>Subject:</strong> ${subject || otherSubject || 'Not specified'}</li>
            </ul>

            <p><strong>Submission ID:</strong> #${submission.id}</p>
            
            <p>In the meantime, feel free to:</p>
            <ul>
              <li>Visit our website: <a href="https://greyinf.com/grey">https://greyinf.com/grey</a></li>
              <li>Chat with us on WhatsApp: <a href="https://wa.me/2348028095571">+234 802 8095 571</a></li>
              <li>Book a meeting: <a href="https://calendly.com/greyinfotech/30min">Calendly</a></li>
            </ul>

            <p>Best regards,<br/>
            <strong>Grey InfoTech Limited</strong><br/>
            Port Harcourt, Nigeria<br/>
            <a href="https://greyinf.com/grey">https://greyinf.com/grey</a></p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the request, just log the error
    }

    // Send notification email to admin
    try {
      await send({
        to: process.env.ADMIN_EMAIL || 'hello@greyinfotech.com.ng',
        subject: `📋 New Contact Form Submission - ${projectType || otherProjectType || 'General'}`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #059669;">New Contact Form Submission</h2>
            
            <h3>Client Information:</h3>
            <ul>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
              <li><strong>Phone:</strong> ${telephone}</li>
              <li><strong>Country:</strong> ${country || otherCountry || 'Not specified'}</li>
              <li><strong>Company/Personal:</strong> ${companyOrPersonal}</li>
              ${companyName ? `<li><strong>Company Name:</strong> ${companyName}</li>` : ''}
              ${companySize ? `<li><strong>Company Size:</strong> ${companySize}</li>` : ''}
            </ul>

            <h3>Project Details:</h3>
            <ul>
              <li><strong>Project Type:</strong> ${projectType || otherProjectType || 'Not specified'}</li>
              <li><strong>Industry:</strong> ${industryType || otherIndustryType || 'Not specified'}</li>
              <li><strong>Subject:</strong> ${subject || otherSubject || 'Not specified'}</li>
              ${meeting ? `<li><strong>Meeting Requested:</strong> ${meeting}</li>` : ''}
              ${howDidYouHear ? `<li><strong>Source:</strong> ${howDidYouHear}${otherHowDidYouHear ? ` (${otherHowDidYouHear})` : ''}</li>` : ''}
            </ul>

            <h3>Message:</h3>
            <blockquote style="background: #f5f5f5; padding: 10px; border-left: 4px solid #059669;">
              ${message || 'No message provided'}
            </blockquote>

            <p><strong>Submission ID:</strong> #${submission.id}</p>
            <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://greyinf.com/grey'}/admin">View in Admin Dashboard</a></p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send admin notification:', emailError);
    }

    return NextResponse.json(
      {
        ok: true,
        success: true,
        message: 'Form submitted successfully. We will get back to you within 24 hours.',
        submissionId: submission.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { error: 'Failed to submit form', ok: false },
      { status: 500 }
    );
  }
}
