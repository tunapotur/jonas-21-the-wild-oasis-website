import { auth, signIn, signOut } from "@/app/_lib/auth";

export default async function SignIn() {
  const session = await auth();
  const user = session?.user;

  return user ? (
    <>
      <h1 className="text-2xl">Welcome {user.name}</h1>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button
          className="p-2 border-2 bg-blue-400 cursor-pointer"
          type="submit"
        >
          SignOut
        </button>
      </form>
    </>
  ) : (
    <>
      <h1 className="text-2xl">You are not authenticated. Click below!</h1>
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/secret" });
        }}
      >
        <button
          className="p-2 border-2 bg-blue-400 cursor-pointer"
          type="submit"
        >
          Signin with Google
        </button>
      </form>
    </>
  );
}
