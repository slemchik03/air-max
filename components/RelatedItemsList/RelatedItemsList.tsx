"use client";

import GoodItem, { GoodItemCard } from "../GoodItem/GoodItem";
import { FC } from "react";
import Swiper from "react-id-swiper";

interface Props {
  itemsList: GoodItemCard[];
}

const RelatedItemsList: FC<Props> = ({ itemsList }) => {
  return (
    <div className="relative overflow-x-hidden">
    <Swiper spaceBetween={30} slidesPerView={"auto"}>
      {itemsList.map((item) => (
        <GoodItem key={item.id} {...item} />
      ))}
    </Swiper>
    </div>

  );
};

export default RelatedItemsList;
