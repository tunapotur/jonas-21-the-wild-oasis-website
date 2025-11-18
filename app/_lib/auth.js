import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// https://authjs.dev/getting-started/providers/google
// http://localhost:3000/api/auth/callback/google

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [Google],
});
