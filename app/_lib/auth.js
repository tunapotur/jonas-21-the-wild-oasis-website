import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

// const authConfig = {
//   providers: [
//     Google({
//       clientId: process.env.AUTH_GOOGLE_ID,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET,
//     }),
//   ],
// };

// const authConfig = {
//   providers: [Google],
// };

// export const {
//   auth,
//   handlers: { GET, POST },
// } = NextAuth(authConfig);

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [GitHub],
});
