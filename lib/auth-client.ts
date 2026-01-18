import { createAuthClient } from "better-auth/react";

export const { useSession, signIn, signOut, signUp } = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || (typeof window !== "undefined" ? window.location.origin : ""),
});
