"use client";

import { BasketItem, GoodItem } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

type Props = BasketItem & { item: GoodItem };

const BasketItem: FC<Props> = ({ item, count, id }) => {
  return (
    <div className="grid gap-5 items-center grid-cols-[1fr,_3fr_0.5fr] w-full py-2 md:py-5 px-5 bg-[#eceff1] h-[150px] rounded-2xl">
      <Image
        width={170}
        height={120}
        className="object-contain max-h-[90px] md:max-h-[120px]"
        src={item.image}
        alt={item.title}
      />
      <div className="grid font-monument">
        <p className="text-md md:text-xl">{item.title}</p>
        <p className="text-sm md:text-md">Count - {count}</p>
        <p className="font-monumentBold text-md md:text-xl">
          {item.price * count}$
        </p>
      </div>
      <div>
        <button
          className={`grid justify-center hover:bg-slate-200 rounded-lg duration-150 ease-in-out border-none bg-transparent`}
        >
          <XMarkIcon className="h-[25px] w-[25px] md:w-[40px] md:h-[40px]" />
        </button>
      </div>
    </div>
  );
};

export default BasketItem;
