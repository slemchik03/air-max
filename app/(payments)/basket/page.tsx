import GoodList from "@/components/BasketPage/GoodList/GoodList";
import getBasketItems from "@/utils/server/get/getBasketItems";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();
  const goodItems = await getBasketItems(user?.id + "");

  if (user) {
    return <GoodList goodItems={goodItems} />;
  }
  redirect("/sign-in");
}
