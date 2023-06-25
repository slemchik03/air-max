import Button from "@/components/General/Buttons/Button";
import deleteAllItemsFromBasket from "@/utils/server/delete/deleteAllItemsFromBasket";
import getCheckoutData from "@/utils/server/get/getCheckoutData";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: { sessionId: string; basketId: string };
}) {
  const user = await currentUser();
  await deleteAllItemsFromBasket(searchParams.basketId, user?.id!);
  const checkoutData = await getCheckoutData(searchParams.sessionId);

  if (checkoutData) {
    return (
      <div className="grid justify-center items-center min-h-screen text-center px-10">
        <div className="grid gap-5">
          <h3 className="font-monumentBold text-4xl">
            Thanks you, {user?.username} for this checkout.{" "}
          </h3>
          <p className="text-2xl">Ofcourse you WILL NOT recieve this items.</p>
          <div className="grid justify-center">
            <Link href="/">
              <Button type="black" text="Return to the main" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
  redirect("/");
}
