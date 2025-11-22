import { auth } from "@/app/_lib/auth";
import { redirect } from "next/navigation";

export default async function Secret() {
  const session = await auth();
  if (!session) return redirect("/profile");
  // return <div className="text-2xl text-red-700">Not authenticated!</div>;

  return (
    <h1 className="text-2xl text-green-700">
      Welcome to the secret content!!!
    </h1>
  );
}
