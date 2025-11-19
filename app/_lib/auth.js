import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers: [Google],
// });

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
});

// https://www.youtube.com/watch?v=XQbiMiNah0o&t=434s
// https://authjs.dev/getting-started/providers/google
// http://localhost:3000/api/auth/callback/google
