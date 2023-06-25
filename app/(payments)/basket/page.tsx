import Basket from "@/components/BasketPage/Basket/Basket";
import getBasketItems from "@/utils/server/get/getBasketItems";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();
  const basketItems = await getBasketItems(user?.id + "");

  if (user) {
    return <Basket basketItems={basketItems} />;
  }
  redirect("/sign-in");
}
