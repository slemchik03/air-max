import { Category, GoodItem } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export type GoodItemCard = Pick<
  GoodItem,
  "image" | "title" | "id" | "sizes" | "price" | "slug"
> & {
  category: Category;
};

interface Props extends GoodItemCard {
  className?: string;
}

const GoodItem: FC<Props> = ({
  image,
  title,
  price,
  sizes,
  category,
  slug,
  className,
}) => {
  const sizesList = Array.isArray(sizes) ? (sizes as string[]) : [];

  return (
    <Link
      href={`/shoe/${slug}`}
      className={`grid grid-flow-row pt-10 w-full cursor-pointer hover:scale-90 duration-150 ease-in-out ${className || ""
        }`}
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
          {`${sizesList.at(0)}-${sizesList.at(-1)}`}
        </p>
      </div>
    </Link>
  );
};

export default GoodItem;
