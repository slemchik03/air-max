"use client";

import { AnimatePresence } from "framer-motion";
import { FC, useMemo, useState } from "react";
import EmptyBasket from "../EmptyBasket/EmptyBasket";
import Button from "@/components/General/Buttons/Button";
import DeleteItemFromBasket from "@/components/General/Modals/DeleteItemFromBasket/DeleteItemFromBasket";
import type { BasketItem, GoodItem } from "@prisma/client";
import BasketItemList from "../BasketItemList/BasketItemList";
import useBasketData from "@/utils/hooks/useBasketData";

export type BasketItemToDelete = (BasketItem & { item: GoodItem }) | null;

interface Props {
  userId: string;
}

const Basket: FC<Props> = ({ userId }) => {
  const [itemToDelete, setItemToDelete] = useState<BasketItemToDelete>(null);

  const { data, deleteItemMutation } = useBasketData({
    userId: userId,
    basketItemToDelete: itemToDelete,
    setItemToDelete: (item) => setItemToDelete(item),
  });

  const totalAmount = useMemo(
    () => data?.reduce((acc, v) => acc + v.count * v.item.price, 0) || 0,
    [data]
  );

  return (
    <>
      {itemToDelete && (
        <DeleteItemFromBasket
          open={!!itemToDelete}
          itemTitle={itemToDelete.item.title}
          itemsCount={itemToDelete.count}
          isLoading={deleteItemMutation.isLoading}
          confirmCallback={(count) => deleteItemMutation.mutate(count)}
          cancelCallback={() => setItemToDelete(null)}
        />
      )}
      <AnimatePresence>
        {data?.length ? (
          <div className="grid text-center justify-center px-2">
            <h4 className="font-monumentBold text-4xl py-10">Your orders </h4>
            <BasketItemList
              basketItems={data}
              setItemToDelete={setItemToDelete}
            />
            <div className="grid justify-center items-center gap-5 py-10">
              <span className="font-monument text-2xl">
                Total amount -{" "}
                <b className="font-monumentBold text-3xl">
                  {totalAmount.toFixed(2)}$
                </b>
              </span>

              {/* <Button onClick={makeOrder} type="black" text="Order now" /> */}
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
