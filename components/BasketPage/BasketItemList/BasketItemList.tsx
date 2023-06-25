"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, FC, SetStateAction } from "react";
import { BasketItemList } from "@/utils/server/get/getBasketItems";
import BasketItem from "../BasketItem/BasketItem";
import { BasketItem as IBasketItem, GoodItem } from "@prisma/client";

interface Props {
  basketItems: BasketItemList;
  setItemToDelete: Dispatch<
    SetStateAction<(IBasketItem & { item: GoodItem }) | null>
  >;
}

const BasketItemList: FC<Props> = ({ basketItems, setItemToDelete }) => {
  return (
    <>
      <AnimatePresence>
        <div className="grid gap-5 max-w-[700px] mx-auto py-5">
          {basketItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, translateY: "-100px" }}
              transition={{
                delay: 0.2,
                duration: 0.4,
                ease: "easeInOut",
              }}
              onClick={() => setItemToDelete(item)}
            >
              <BasketItem {...item} />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </>
  );
};

export default BasketItemList;
