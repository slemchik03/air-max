import { FC } from "react";
import Image from "next/image";
import parseNumber from "@/utils/parseNumber";
import { GoodItem } from "@prisma/client";

interface Props {
  goodItem: GoodItem;
}

const SearchedItem: FC<Props> = ({ goodItem }) => {

  return (
    <div className="blur-effect backdrop-blur-2xl grid cursor-pointer text-[#23272F] gap-5 items-center grid-cols-[1fr,_3fr_0.5fr] w-full py-2 px-5 h-[100px] rounded-2xl">
      <Image
        width={170}
        height={120}
        className="object-contain max-h-[90px]"
        src={goodItem.image}
        alt={goodItem.title}
      />
      <div className="grid font-monument">
        <p className=" text-[16px]">{goodItem.title}</p>
        <p className="font-monumentBold text-[16px] ">
          {parseNumber(goodItem.price)}$
        </p>
      </div>
    </div>
  );
};

export default SearchedItem;
