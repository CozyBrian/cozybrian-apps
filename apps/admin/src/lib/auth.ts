import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    baseURL: import.meta.env.VITE_BETTER_AUTH_URL || "http://localhost:3000",
    plugins: [
        emailOTPClient()
    ]
})