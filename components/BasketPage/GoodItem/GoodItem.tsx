"use client";

import { BasketItem, GoodItem } from "@prisma/client";
import Image from "next/image";
import { FC, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import deleteItemFromBasket from "@/utils/server/deleteItemFromBasket";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = BasketItem & { item: GoodItem; userId: string };

const GoodItem: FC<Props> = ({ item, count, id, userId }) => {
  const router = useRouter();
  const deleteItem = async () => {
    const toastId = toast.loading("Deleting item...");
    const result = await deleteItemFromBasket(id, userId);
    toast.dismiss(toastId);

    if (result.ok) {
      toast.success("Item was deleted!");
      return router.refresh();
    }
  };
  console.log(count);
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
          onClick={deleteItem}
          className={`grid justify-center hover:bg-slate-200 rounded-lg duration-150 ease-in-out border-none bg-transparent`}
        >
          <XMarkIcon className="h-[25px] w-[25px] md:w-[40px] md:h-[40px]" />
        </button>
      </div>
    </div>
  );
};

export default GoodItem;
