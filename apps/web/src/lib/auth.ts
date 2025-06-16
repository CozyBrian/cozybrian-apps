import { prisma } from "@cozy/db";
import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { EmailService } from "../services/email";
 
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    emailOTP({ 
      async sendVerificationOTP({ email, otp }) {
        return EmailService.sendOTPCode(email, otp);
			},
      disableSignUp: true,
      
    }) 
  ]
})