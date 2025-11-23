import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
});

// https://authjs.dev/getting-started/authentication/oauth
// https://www.youtube.com/watch?v=XQbiMiNah0o&t=434s
// https://authjs.dev/getting-started/providers/google
// http://localhost:3000/api/auth/callback/google
// https://medium.com/@youngjun625/next-js14-nextauth-v5-3-google-sign-in-3683d8fae69c
// https://judy-webdecoded.medium.com/how-i-integrated-authentication-next-auth-v5-in-my-nextjs-14-application-0d57f84cf4ac
