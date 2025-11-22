import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
});

// https://authjs.dev/getting-started/providers/google
// http://localhost:3000/api/auth/callback/google
