"use client";

import GoodItem from "../GoodItem/GoodItem";
import Button from "@/components/UI/Button/Button";
import { BasketItemList } from "@/utils/server/getBasketItems";
import { useUser } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";
import EmptyBasket from "../EmptyBasket/EmptyBasket";
import getStripe from "@/utils/getStripe";

interface Props {
  goodItems: BasketItemList;
}

const GoodList: FC<Props> = ({ goodItems }) => {
  const { user } = useUser();
  const totalAmount = goodItems.reduce(
    (acc, v) => acc + v.count * v.item.price,
    0
  );
  const makeOrder = async () => {
    const stripe = await getStripe();
    const lineItems = goodItems.map(({ item, count }) => ({
      price: item.stripePriceId,
      quantity: count,
    }));

    if (stripe) {
      stripe.redirectToCheckout({
        mode: "payment",
        lineItems,
        successUrl: `${process.env.PROJECT_URL}/success/?sessionId={CHECKOUT_SESSION_ID}&basketId=${goodItems[0].basketId}`,
        cancelUrl: process.env.PROJECT_URL!,
      });
    }
  };
  return (
    <AnimatePresence>
      {goodItems.length ? (
        <div className="grid text-center justify-center px-2">
          <h4 className="font-monumentBold text-4xl py-10">Your orders </h4>
          <div className="grid gap-5 max-w-[700px] mx-auto py-5">
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
  );
};

export default GoodList;
