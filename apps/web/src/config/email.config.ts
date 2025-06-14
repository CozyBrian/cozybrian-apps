import { SendOTP } from "../templates/SendOTP";

export const emailConfig = {
  from: 'Notification <notif@notif.cozybrian.dev>',
  authEmail: 'Authentication <auth@notif.cozybrian.dev>',
  resendApiKey: process.env.RESEND_API_KEY,
  templates: {
    sendOTPCode: SendOTP
  }
} as const; 