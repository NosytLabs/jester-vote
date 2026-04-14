import { ENV } from "./_core/env";

interface NominationNotificationData {
  nomineeName: string;
  submittedBy: string;
  description?: string;
}

interface ApprovalNotificationData {
  toEmail: string;
  nomineeName: string;
  approved: boolean;
  reason?: string;
}

/**
 * Send nomination notification to admins
 * This is a placeholder implementation - integrate with your email service
 */
export async function sendNominationNotification(data: NominationNotificationData): Promise<void> {
  // Check if email is configured
  if (!ENV.smtpHost && !ENV.emailApiKey) {
    console.log("[Email] Notification skipped - no email configuration");
    return;
  }

  const subject = `New Nomination: ${data.nomineeName}`;
  const body = `
A new nominee has been submitted for review:

Name: ${data.nomineeName}
Submitted by: ${data.submittedBy}
Description: ${data.description || "N/A"}

Review at: ${ENV.appUrl}/admin
  `.trim();

  try {
    // Implement your email sending logic here
    // Examples: SendGrid, AWS SES, Nodemailer, etc.
    console.log("[Email] Would send nomination notification:", { subject, body });
    
    // Placeholder for actual email sending
    // await sendEmail({ to: ENV.adminEmail, subject, body });
  } catch (error) {
    console.error("[Email] Failed to send nomination notification:", error);
    throw error;
  }
}

/**
 * Send approval/rejection notification to the submitter
 */
export async function sendApprovalNotification(data: ApprovalNotificationData): Promise<void> {
  // Check if email is configured
  if (!ENV.smtpHost && !ENV.emailApiKey) {
    console.log("[Email] Notification skipped - no email configuration");
    return;
  }

  const status = data.approved ? "Approved" : "Rejected";
  const subject = `Your Nomination: ${data.nomineeName} - ${status}`;
  
  const body = data.approved
    ? `
Good news! Your nomination has been approved:

Name: ${data.nomineeName}
Status: Approved ✓

You can now see them on the leaderboard at: ${ENV.appUrl}
    `.trim()
    : `
Your nomination has been reviewed:

Name: ${data.nomineeName}
Status: Rejected
Reason: ${data.reason || "Does not meet submission criteria"}

Feel free to submit another nominee that better fits our guidelines.
    `.trim();

  try {
    console.log("[Email] Would send approval notification:", { to: data.toEmail, subject, body });
    
    // Placeholder for actual email sending
    // await sendEmail({ to: data.toEmail, subject, body });
  } catch (error) {
    console.error("[Email] Failed to send approval notification:", error);
    throw error;
  }
}

// Helper function for actual email sending (to be implemented)
async function sendEmail({ to, subject, body }: { to: string; subject: string; body: string }) {
  // Implement with your preferred email service:
  // - Nodemailer for SMTP
  // - SendGrid
  // - AWS SES
  // - Resend
  // - etc.
  
  throw new Error("Email sending not implemented. Configure ENV.smtpHost or ENV.emailApiKey");
}
