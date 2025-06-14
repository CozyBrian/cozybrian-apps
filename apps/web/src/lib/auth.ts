import { prisma } from "@cozy/db";
import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { EmailService } from "../services/email";
 
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  plugins: [
    emailOTP({ 
      async sendVerificationOTP({ email, otp, type }) {
        return EmailService.sendOTPCode(email, otp);
				// Implement the sendVerificationOTP method to send the OTP to the user's email address
			},

    }) 
  ]
})