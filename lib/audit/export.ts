/**
 * Audit Export — Generate PDF and JSON versions of audit reports.
 */

import type { AuditReport } from './engine';

/**
 * Export audit as JSON.
 * Returns JSON string ready to download.
 */
export function exportAsJSON(report: AuditReport): string {
    return JSON.stringify(report, null, 2);
}

/**
 * Export audit as HTML (for PDF generation or display).
 * Returns HTML string with embedded styles.
 */
export function exportAsHTML(report: AuditReport): string {
    const sections = report.sections
        .map(
            (section) => `
        <section style="margin-bottom: 40px; page-break-inside: avoid;">
            <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 16px; color: #1f2937;">
                ${escapeHtml(section.name)}
            </h2>
            <div style="margin-bottom: 16px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 18px; font-weight: bold; color: ${gradeColor(section.score)};">
                        ${section.score}/100
                    </span>
                </div>
                <div style="width: 100%; height: 12px; background-color: #e5e7eb; border-radius: 6px; overflow: hidden;">
                    <div style="height: 100%; width: ${section.score}%; background-color: ${gradeColor(section.score)};"></div>
                </div>
            </div>
            <div style="margin-top: 16px;">
                ${
                    section.findings.length === 0
                        ? '<p style="color: #10b981; font-size: 14px;">✓ No issues found in this section.</p>'
                        : `<ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px;">
                    ${section.findings
                        .map((f) => {
                            const severity = {
                                critical: {color: '#ff4d6d', bg: '#fff5f7'},
                                high: {color: '#ff8a3d', bg: '#fff8f3'},
                                medium: {color: '#ffd24d', bg: '#fffbf0'},
                                low: {color: '#7aa2ff', bg: '#f3f8ff'},
                                pass: {color: '#36e0a0', bg: '#f0fdf9'},
                            }[f.severity];
                            return `
                    <li style="border: 1px solid ${severity.color}40; background-color: ${severity.bg}; padding: 12px; border-radius: 8px;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                            <span style="background-color: ${severity.color}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: bold;">
                                ${f.severity.toUpperCase()}
                            </span>
                            <span style="font-weight: bold; color: #1f2937;">${escapeHtml(f.title)}</span>
                        </div>
                        <p style="margin: 0 0 8px 0; color: #4b5563; font-size: 14px;">${escapeHtml(f.detail)}</p>
                        ${f.fix ? `<p style="margin: 0; color: #6b7280; font-size: 13px;"><strong>Fix:</strong> ${escapeHtml(f.fix)}</p>` : ''}
                    </li>
                `;
                        })
                        .join('')}
                </ul>`
                }
            </div>
        </section>
    `
        )
        .join('');

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Audit Report - Grey InfoTech</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
                    color: #1f2937;
                    line-height: 1.6;
                    background: #f9fafb;
                    padding: 40px 20px;
                }
                .container { max-width: 900px; margin: 0 auto; background: white; border-radius: 12px; padding: 40px; box-shadow: 0 1px 3px rgba(0,0,0,.1); }
                .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #f0f0f0; padding-bottom: 30px; }
                .header h1 { font-size: 32px; margin-bottom: 8px; }
                .header p { color: #6b7280; font-size: 16px; margin-bottom: 20px; }
                .targets { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 16px; }
                .target-tag { background: #f3f4f6; padding: 6px 12px; border-radius: 6px; font-size: 13px; color: #4b5563; }
                .verdict { background: #f9fafb; border-left: 4px solid #3b82f6; padding: 24px; margin-bottom: 40px; border-radius: 8px; }
                .verdict h2 { font-size: 24px; margin-bottom: 12px; }
                .verdict p { color: #4b5563; font-size: 16px; line-height: 1.7; }
                .score-display { display: flex; align-items: center; gap: 24px; margin-bottom: 16px; }
                .score-ring { display: flex; flex-direction: column; align-items: center; }
                .score-ring .number { font-size: 48px; font-weight: bold; }
                .score-ring .label { font-size: 12px; color: #6b7280; text-transform: uppercase; }
                .cta-box {
                    background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(99, 102, 241, 0.1));
                    border: 2px solid #06b6d4;
                    border-radius: 12px;
                    padding: 32px;
                    margin-top: 40px;
                    text-align: center;
                }
                .cta-box h3 { font-size: 22px; margin-bottom: 12px; color: #1f2937; }
                .cta-box p { color: #4b5563; margin-bottom: 16px; font-size: 15px; }
                .cta-buttons { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 20px; font-size: 14px; }
                .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 13px; }
                @media print {
                    body { padding: 0; background: white; }
                    .container { box-shadow: none; padding: 0; }
                    .cta-box { page-break-inside: avoid; }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Site & Repo Audit Report</h1>
                    <p>Generated by Grey InfoTech Audit Engine</p>
                    <div class="targets">
                        ${report.target.website ? `<span class="target-tag">🌐 ${escapeHtml(report.target.website)}</span>` : ''}
                        ${report.target.repo ? `<span class="target-tag">📦 ${escapeHtml(report.target.repo)}</span>` : ''}
                    </div>
                </div>

                <div class="verdict">
                    <div class="score-display">
                        <div class="score-ring">
                            <span class="number" style="color: ${gradeColor(report.overallScore)};">${report.grade}</span>
                            <span class="label">${report.overallScore}/100</span>
                        </div>
                        <div style="flex: 1;">
                            <h2>Overall Verdict</h2>
                            <p>${escapeHtml(report.summary)}</p>
                        </div>
                    </div>
                </div>

                ${sections}

                <div class="cta-box">
                    <h3>Need Help Fixing These Issues?</h3>
                    <p>Our team of senior engineers can help you ship secure, fast, and maintainable software. Let's turn these findings into a stronger product.</p>
                    <div class="cta-buttons">
                        <strong>📞 +234 802 809 5571</strong>
                        <span>•</span>
                        <strong>💬 WhatsApp Support</strong>
                        <span>•</span>
                        <strong>hello@greyinfotech.com.ng</strong>
                    </div>
                    <p style="margin-top: 16px; font-size: 13px; color: #6b7280;">
                        <strong>Grey InfoTech Limited</strong> • Port Harcourt, Nigeria<br>
                        Building software that doesn't suck.
                    </p>
                </div>

                <div class="footer">
                    <p>Generated: ${new Date(report.generatedAt).toLocaleString()}</p>
                    <p>Report is valid for 30 days. Visit greyinfotech.com.ng/audit for live checks.</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

/**
 * Helper: determine color for score.
 */
function gradeColor(score: number): string {
    if (score >= 90) return '#36e0a0';
    if (score >= 70) return '#9ad84f';
    if (score >= 50) return '#ffd24d';
    if (score >= 30) return '#ff8a3d';
    return '#ff4d6d';
}

/**
 * Helper: escape HTML special characters.
 */
function escapeHtml(text: string): string {
    const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}
