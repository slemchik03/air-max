"use client"

import { GoodItem as IGoodItem } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface Props extends IGoodItem {
  count: number;
}

const GoodItem: FC<Props> = ({ image, title, count, sizes, price }) => {
  const deleteItem = async () => {};
  return (
    <div className="grid gap-5 items-center grid-cols-[1fr,_3fr_0.5fr] w-full py-5 px-5 bg-[#eceff1] h-[150px] rounded-2xl">
      <Image
        width={170}
        height={120}
        className="object-contain max-h-[120px]"
        src={image}
        alt={title}
      />
      <div className="grid font-monument">
        <p className="text-xl">{title}</p>
        <p className="text-md">Count - {count}</p>
        <p className="font-monumentBold text-xl">{price * count}$</p>
      </div>
      <div>
        <div
          onClick={deleteItem}
          className="cursor-pointer grid justify-center hover:bg-slate-200 rounded-lg duration-150 ease-in-out"
        >
          <XMarkIcon className="w-[40px] h-[40px]" />
        </div>
      </div>
    </div>
  );
};

export default GoodItem;
