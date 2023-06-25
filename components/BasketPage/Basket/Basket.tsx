"use client";

import type { BasketItemList as IBasketItemList } from "@/utils/server/get/getBasketItems";
import { AnimatePresence } from "framer-motion";
import { FC, useMemo, useState } from "react";
import EmptyBasket from "../EmptyBasket/EmptyBasket";
import Button from "@/components/General/Buttons/Button";
import DeleteItemFromBasket from "@/components/General/Modals/DeleteItemFromBasket/DeleteItemFromBasket";
import getStripe from "@/utils/getStripe";
import { BasketItem, GoodItem } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import deleteItemFromBasket from "@/utils/server/delete/deleteItemFromBasket";
import { toast } from "react-hot-toast";
import BasketItemList from "../BasketItemList/BasketItemList";
import { useRouter } from "next/navigation";

interface Props {
  basketItems: IBasketItemList;
}

const Basket: FC<Props> = ({ basketItems }) => {
  const { user } = useUser();
  const router = useRouter();
  const [itemToDelete, setItemToDelete] = useState<
    (BasketItem & { item: GoodItem }) | null
  >(null);
  const totalAmount = useMemo(
    () => basketItems.reduce((acc, v) => acc + v.count * v.item.price, 0),
    [basketItems]
  );
  const deleteItem = async (count: number) => {
    if (itemToDelete && user) {
      const response = await deleteItemFromBasket({
        count,
        basketItemId: itemToDelete.id,
        userId: user.id,
      });

      if (response.ok) {
        setItemToDelete(null);
        toast.success("Succes delete!");
        router.refresh();
      }
    }
  };
  const makeOrder = async () => {
    const stripe = await getStripe();
    const lineItems = basketItems.map(({ item, count }) => ({
      price: item.stripePriceId,
      quantity: count,
    }));
    if (stripe) {
      stripe.redirectToCheckout({
        mode: "payment",
        lineItems,
        successUrl: `${process.env.PROJECT_URL}/success/?sessionId={CHECKOUT_SESSION_ID}&basketId=${basketItems[0].basketId}`,
        cancelUrl: process.env.PROJECT_URL!,
      });
    }
  };
  return (
    <>
      {itemToDelete && (
        <DeleteItemFromBasket
          open={!!itemToDelete}
          item={itemToDelete}
          confirmCallback={(count) => deleteItem(count)}
          cancelCallback={() => setItemToDelete(null)}
        />
      )}
      <AnimatePresence>
        {basketItems.length ? (
          <div className="grid text-center justify-center px-2">
            <h4 className="font-monumentBold text-4xl py-10">Your orders </h4>
            <BasketItemList
              basketItems={basketItems}
              setItemToDelete={setItemToDelete}
            />
            <div className="grid justify-center items-center gap-5 py-10">
              <span className="font-monument text-2xl">
                Total amount -{" "}
                <b className="font-monumentBold text-3xl">
                  {totalAmount.toFixed(2)}$
                </b>
              </span>

              <Button onClick={makeOrder} type="black" text="Order now" />
            </div>
          </div>
        ) : (
          <EmptyBasket />
        )}
      </AnimatePresence>
    </>
  );
};

export default Basket;
