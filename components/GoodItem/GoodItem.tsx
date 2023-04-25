import { Category, GoodItem } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";

export type GoodItemCard = Pick<
  GoodItem,
  "image" | "title" | "id" | "sizes" | "price"
> & {
  category: Category;
};

interface Props extends GoodItemCard {}

const GoodItem: FC<Props> = ({ image, title, price, sizes, category }) => {
  return (
    <div className="grid grid-flow-row pt-10 cursor-pointer hover:scale-90 duration-150 ease-in-out">
      <div className="grid bg-[#F9F9F9] min-h-[370px] justify-center items-center">
        <Image
          width={300}
          height={200}
          src={image}
          className="object-contain"
          alt="item image"
        />
      </div>
      <div className="grid grid-flow-row gap-[6px] pt-4">
        <p className="text-[#9C9C9C] pb-2">{category.title}</p>
        <p className="text-[#040404] text-[25px]">{title}</p>
        <p className="text-[#040404] text-[20px]">{price}</p>
        <p className="text-[#DE343D] text-[18px]">{`${sizes.at(0)}-${sizes.at(
          -1
        )}`}</p>
      </div>
    </div>
  );
};

export default GoodItem;
