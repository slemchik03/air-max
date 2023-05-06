
import { SignUp, currentUser } from "@clerk/nextjs/app-beta";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();

  if (user) {
    redirect("/");
  }
  return (
    <div className="py-[150px]">
      <SignUp
        signInUrl="/sign-in"
        appearance={{
          elements: {
            rootBox: "mx-auto",
          },
        }}
      />
    </div>
  );
}
