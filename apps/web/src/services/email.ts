import { emailConfig } from "../config/email.config";
import resend from "../lib/resend";

export interface EmailData<P extends Record<string, unknown>> {
  to: string;
  from?: string;
  subject: string;
  template: (props: P & { authEmail: string }) => string;
  data: P;
}

export class EmailService {
  private static async sendEmail<P extends Record<string, unknown>>(
    emailData: EmailData<P>,
  ) {
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
      console.error("Failed to send email:", error);
    }
  }

  public static async sendOTPCode(email: string, otp: string) {
    await this.sendEmail({
      to: email,
      from: emailConfig.authEmail,
      subject: `Your OTP Code ${otp} - CozyBrian`,
      template: emailConfig.templates.sendOTPCode,
      data: { otp_code: otp },
    });
  }
}
