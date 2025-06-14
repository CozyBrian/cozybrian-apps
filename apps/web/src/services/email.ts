import { emailConfig } from "../config/email.config";
import resend from "../lib/resend";

export interface EmailData {
  to: string;
  from?: string;
  subject: string;
  template: (props: any) => string;
  data: Record<string, any>;
}

export class EmailService {
  private static async sendEmail(emailData: EmailData) {
    try {
      const Template = emailData.template;
      const templateProps = {
        ...emailData.data,
        authEmail: emailConfig.authEmail,
      };

      await resend.emails.send({
        from: emailData.from || emailConfig.from,
        to: emailData.to,
        subject: emailData.subject,
        html: Template(templateProps),
      });
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  }

  public static async sendOTPCode(email: string, otp: string) {
    await this.sendEmail({
      to: email,
      from: emailConfig.authEmail,
      subject: "Your OTP Code - CozyBrian",
      template: emailConfig.templates.sendOTPCode,
      data: { otp_code: otp },
    });
  }
}