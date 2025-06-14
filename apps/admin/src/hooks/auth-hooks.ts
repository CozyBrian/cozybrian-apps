// src/lib/auth-hooks.ts
import { authClient } from '@/lib/auth';
import { createAuthHooks } from '@daveyplate/better-auth-tanstack';

export const {
  /* queries */   useSession, useToken,
  // /* mutations */ useSignInEmail, useSignUpEmail, useSignOut,
} = createAuthHooks(authClient);