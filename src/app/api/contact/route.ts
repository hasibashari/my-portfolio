import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Helper to escape HTML to prevent HTML injection in email clients
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // 1. Validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Please provide your name.' },
        { status: 400 },
      );
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 },
      );
    }

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Please write a message.' },
        { status: 400 },
      );
    }

    const cleanName = name.trim().slice(0, 100);
    const cleanEmail = email.trim().slice(0, 255);
    const cleanMessage = message.trim().slice(0, 5000);

    const safeName = escapeHtml(cleanName);
    const safeEmail = escapeHtml(cleanEmail);
    const safeMessage = escapeHtml(cleanMessage).replace(/\n/g, '<br />');

    // 2. Fetch SMTP Configuration
    const smtpUser = process.env.SMTP_USER?.trim();
    const smtpPass = process.env.SMTP_PASS?.trim();
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL?.trim() || 'hasibashari@gmail.com';

    if (!smtpUser || !smtpPass) {
      console.error('SMTP_USER or SMTP_PASS is missing in environment variables');
      return NextResponse.json(
        {
          success: false,
          error: 'Email service is currently unconfigured. Please contact directly via email.',
        },
        { status: 500 },
      );
    }

    // 3. Prepare HTML Email Template
    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #faf9f5; border: 1px solid #e6dfd8; border-radius: 12px; color: #141413;">
        <div style="border-bottom: 2px solid #cc785c; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="margin: 0; color: #141413; font-size: 20px;">New Portfolio Contact Inquiry</h2>
          <p style="margin: 4px 0 0 0; color: #736d65; font-size: 13px;">Received via Hasib Ashari Portfolio</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 18px; border-radius: 8px; border: 1px solid #e6dfd8; margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 6px 0; color: #736d65; width: 80px; font-weight: 500;">From:</td>
              <td style="padding: 6px 0; color: #141413; font-weight: 600;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #736d65; font-weight: 500;">Email:</td>
              <td style="padding: 6px 0;"><a href="mailto:${safeEmail}" style="color: #cc785c; text-decoration: none; font-weight: 500;">${safeEmail}</a></td>
            </tr>
          </table>
        </div>

        <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e6dfd8; margin-bottom: 24px;">
          <h4 style="margin: 0 0 12px 0; color: #736d65; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Message Brief:</h4>
          <p style="margin: 0; line-height: 1.6; color: #141413; font-size: 15px; white-space: pre-wrap;">${safeMessage}</p>
        </div>

        <div style="text-align: center; color: #a19a90; font-size: 12px; padding-top: 12px; border-top: 1px solid #e6dfd8;">
          You can reply directly to this email to respond to <strong>${safeName}</strong> (${safeEmail}).
        </div>
      </div>
    `;

    // 4. Send Email via Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass.replace(/\s+/g, ''),
      },
    });

    const info = await transporter.sendMail({
      from: `"Hasib Ashari Portfolio" <${smtpUser}>`,
      to: receiverEmail,
      replyTo: cleanEmail,
      subject: `New Inquiry from ${cleanName} | Hasib Ashari Portfolio`,
      html: htmlContent,
    });

    return NextResponse.json({
      success: true,
      message: 'Message delivered successfully.',
      messageId: info.messageId,
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred while processing your message.' },
      { status: 500 },
    );
  }
}
