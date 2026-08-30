/**
 * Password Reset Email Template
 */

export interface PasswordResetEmailProps {
  customerName: string;
  resetLink: string;
  expiresIn?: string;
}

export function generatePasswordResetEmail({
  customerName,
  resetLink,
  expiresIn = '1 hour',
}: PasswordResetEmailProps): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { margin-bottom: 20px; }
          h2 { color: #333; }
          p { color: #666; line-height: 1.6; }
          .button { display: inline-block; padding: 12px 30px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px; font-weight: bold; margin: 30px 0; }
          .button:hover { background-color: #0056b3; }
          .footer { border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px; font-size: 12px; color: #999; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Password Reset Request</h2>
          </div>
          
          <p>Hi ${customerName},</p>
          
          <p>We received a request to reset your password. Click the link below to set a new password.</p>
          
          <a href="${resetLink}" class="button">Reset Password</a>
          
          <p style="font-size: 12px; color: #999;">
            This link expires in ${expiresIn}. If you didn't request a password reset, you can ignore this email.
          </p>
          
          <p style="font-size: 12px; color: #999;">
            For security, never share this link with anyone.
          </p>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} Graham Sobiribo Paul. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
