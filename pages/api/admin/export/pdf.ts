import { NextApiRequest, NextApiResponse } from 'next';

interface DashboardMetrics {
  users: { total: number; activeMonth: number; newThisMonth: number };
  revenue: { total: number; thisMonth: number; thisWeek: number; byGateway: Record<string, number> };
  services: { total: number; topServices: Array<{ id: string; name: string; views: number; purchases: number }> };
  audits: { total: number; completed: number; completionRate: number };
  payments: { total: number; successful: number; failed: number; refunded: number };
  webhooks: { totalEvents: number; successRate: number; failedDeliveries: number };
  search: { totalQueries: number; topQueries: Array<{ query: string; count: number }> };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = req.headers['x-admin-token'];
  if (!token || process.env.ADMIN_TOKEN !== token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const metrics: DashboardMetrics = req.body;

    // Dynamically import jsPDF (server-side)
    const { jsPDF } = await import('jspdf');
    const pdf = new jsPDF();

    // Add title
    pdf.setFontSize(20);
    pdf.text('Admin Dashboard Report', 15, 15);

    // Add timestamp
    pdf.setFontSize(10);
    pdf.text(`Generated: ${new Date().toLocaleString()}`, 15, 25);

    // Add content
    let yPosition = 35;
    const lineHeight = 10;

    // Users section
    pdf.setFontSize(14);
    pdf.text('Users', 15, yPosition);
    yPosition += lineHeight;
    pdf.setFontSize(11);
    pdf.text(`Total Users: ${metrics.users.total}`, 20, yPosition);
    yPosition += lineHeight;
    pdf.text(`Active This Month: ${metrics.users.activeMonth}`, 20, yPosition);
    yPosition += lineHeight;
    pdf.text(`New This Month: ${metrics.users.newThisMonth}`, 20, yPosition);
    yPosition += lineHeight * 2;

    // Revenue section
    pdf.setFontSize(14);
    pdf.text('Revenue', 15, yPosition);
    yPosition += lineHeight;
    pdf.setFontSize(11);
    pdf.text(`Total Revenue: $${(metrics.revenue.total / 100).toFixed(2)}`, 20, yPosition);
    yPosition += lineHeight;
    pdf.text(`This Month: $${(metrics.revenue.thisMonth / 100).toFixed(2)}`, 20, yPosition);
    yPosition += lineHeight;
    pdf.text(`This Week: $${(metrics.revenue.thisWeek / 100).toFixed(2)}`, 20, yPosition);
    yPosition += lineHeight * 2;

    // Services section
    pdf.setFontSize(14);
    pdf.text('Services', 15, yPosition);
    yPosition += lineHeight;
    pdf.setFontSize(11);
    pdf.text(`Total Services: ${metrics.services.total}`, 20, yPosition);
    yPosition += lineHeight * 2;

    // Audits section
    pdf.setFontSize(14);
    pdf.text('Audits', 15, yPosition);
    yPosition += lineHeight;
    pdf.setFontSize(11);
    pdf.text(`Total Audits: ${metrics.audits.total}`, 20, yPosition);
    yPosition += lineHeight;
    pdf.text(`Completed: ${metrics.audits.completed}`, 20, yPosition);
    yPosition += lineHeight;
    pdf.text(`Completion Rate: ${Math.round(metrics.audits.completionRate)}%`, 20, yPosition);
    yPosition += lineHeight * 2;

    // Payments section
    pdf.setFontSize(14);
    pdf.text('Payments', 15, yPosition);
    yPosition += lineHeight;
    pdf.setFontSize(11);
    pdf.text(`Total Payments: ${metrics.payments.total}`, 20, yPosition);
    yPosition += lineHeight;
    pdf.text(`Successful: ${metrics.payments.successful}`, 20, yPosition);
    yPosition += lineHeight;
    pdf.text(`Failed: ${metrics.payments.failed}`, 20, yPosition);
    yPosition += lineHeight;
    pdf.text(`Refunded: ${metrics.payments.refunded}`, 20, yPosition);

    // Generate PDF
    const pdfBuffer = Buffer.from(pdf.output('arraybuffer'));

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="dashboard-export-${new Date().toISOString().split('T')[0]}.pdf"`);
    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF export error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
}
