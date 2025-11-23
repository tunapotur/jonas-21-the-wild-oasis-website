import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });

        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

// https://authjs.dev/getting-started/authentication/oauth
// https://www.youtube.com/watch?v=XQbiMiNah0o&t=434s
// https://authjs.dev/getting-started/providers/google
// http://localhost:3000/api/auth/callback/google
// https://medium.com/@youngjun625/next-js14-nextauth-v5-3-google-sign-in-3683d8fae69c
// https://judy-webdecoded.medium.com/how-i-integrated-authentication-next-auth-v5-in-my-nextjs-14-application-0d57f84cf4ac
