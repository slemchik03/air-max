"use client";

import GoodItem from "../GoodItem/GoodItem";
import Button from "@/components/UI/Button/Button";
import { BasketItemList } from "@/utils/server/getBasketItems";
import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";

interface Props {
  goodItems: BasketItemList;
}

const GoodList: FC<Props> = ({ goodItems }) => {
  if (goodItems.length) {
    const totalAmount = goodItems.reduce(
      (acc, v) => acc + v.count * v.item.price,
      0
    );
    return (
      <div className="grid text-center justify-center">
        <h4 className="font-monumentBold text-4xl py-10">Your orders </h4>
        <div className="grid gap-5 max-w-[700px] mx-auto py-5">
          {goodItems.map((item) => (
            <AnimatePresence key={item.id}>
              <motion.div>
                <GoodItem {...item.item} count={item.count} />
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
        <div className="grid justify-center items-center gap-5 py-10">
          <span className="font-monument text-2xl">
            Total amount -{" "}
            <b className="font-monumentBold text-3xl">{totalAmount}$</b>
          </span>

          <Button type="black" text="Order now" />
        </div>
      </div>
    );
  }
  return <p>here is no items!</p>;
};

export default GoodList;
