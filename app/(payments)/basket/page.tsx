import Basket from "@/components/BasketPage/Basket/Basket";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();

  if (user) {
    return <Basket userId={user.id} />;
  }
  redirect("/sign-in");
}
