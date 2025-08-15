import { SendOTP } from "../templates/SendOTP";

export const emailConfig = {
  from: "CozyBrian Admin <notif@notif.cozybrian.dev>",
  authEmail: "CozyBrian Admin <auth@notif.cozybrian.dev>",
  resendApiKey: process.env.RESEND_API_KEY,
  templates: {
    sendOTPCode: SendOTP,
  },
} as const;
