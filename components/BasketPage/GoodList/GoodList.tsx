"use client";

import GoodItem from "../GoodItem/GoodItem";
import Button from "@/components/UI/Button/Button";
import { BasketItemList } from "@/utils/server/getBasketItems";
import { useUser } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

interface Props {
  goodItems: BasketItemList;
}

const GoodList: FC<Props> = ({ goodItems }) => {
  const { user } = useUser();
  if (goodItems.length) {
    const totalAmount = goodItems.reduce(
      (acc, v) => acc + v.count * v.item.price,
      0
    );

    return (
      <div className="grid text-center justify-center">
        <h4 className="font-monumentBold text-4xl py-10">Your orders </h4>
        <div className="grid gap-5 max-w-[700px] mx-auto py-5 px-2">
          <AnimatePresence>
            {goodItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, translateY: "-100px" }}
                transition={{ delay: 0.2, duration: 0.4, ease: "easeInOut" }}
              >
                <GoodItem {...item} userId={user?.id!} />
              </motion.div>
            ))}
          </AnimatePresence>
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
  return (
    <div className="grid justify-center items-center text-center min-h-screen">
      <div className="grid gap-10">
        <h3 className="font-monumentBold text-5xl"> You dont have any item!</h3>
        <Link href="/" className="grid justify-center">
          <Button type="gray" text="Continue shopping" />
        </Link>
      </div>
    </div>
  );
};

export default GoodList;
