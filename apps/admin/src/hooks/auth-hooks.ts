// src/lib/auth-hooks.ts
import { createAuthHooks } from "@daveyplate/better-auth-tanstack";

import { authClient } from "@/lib/auth";

export const {
  /* queries */ useSession,
  useToken,
  // /* mutations */ useSignInEmail, useSignUpEmail, useSignOut,
} = createAuthHooks(authClient);
