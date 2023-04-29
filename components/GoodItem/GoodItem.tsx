import { Category, GoodItem } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export type GoodItemCard = Pick<
  GoodItem,
  "image" | "title" | "id" | "sizes" | "price" | "slug"
> & {
  category: Category;
  className?: string;
};

interface Props extends GoodItemCard {}

const GoodItem: FC<Props> = ({
  image,
  title,
  price,
  sizes,
  category,
  slug,
  className
}) => {
  return (
    <Link
      href={`/shoe/${slug}`}
      className={`grid grid-flow-row pt-10 max-w-[400px] cursor-pointer hover:scale-90 duration-150 ease-in-out ${className || ""}`}
    >
      <div className="grid bg-[#F9F9F9] grid-rows-[minmax(370px,_1fr)] justify-center items-center">
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
        <p className="text-[#040404] font-monumentBold text-[20px]">{price}$</p>
        <p className="text-[#DE343D] text-[18px]">
          {`${sizes.at(0)}-${sizes.at(-1)}`}
        </p>
      </div>
    </Link>
  );
};

export default GoodItem;
