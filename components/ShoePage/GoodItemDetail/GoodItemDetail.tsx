import { GoodItem } from "@prisma/client";
import Image from "next/image";
import SizesList from "../SizesList/SizesList";
import RelatedItems from "../RelatedItems/RelatedItems";
import OrderButton from "./OrderButton";
import ColorsList from "./ColorsList";
import parseNumber from "@/utils/parseNumber";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

interface Props extends Omit<GoodItem, "updatedAt" | "createdAt"> { }

export default async function GoodItemDetail({
  image,
  title,
  advantages,
  sizes,
  price,
  id,
  categoryId,
}: Props) {
  const sizesList = Array.isArray(sizes) ? (sizes as string[]) : [];
  return (
    <div className="grid mt-[100px] font-roboto min-h-screen">
      <div className="grid  xl:grid-cols-[1fr_340px] grid-rows-[minmax(500px,1fr)] justify-center gap-10 px-10">
        <div className="grid p-10 min-h-[390px] justify-center items-center">
          <p className="uppercase tracking-tight-[0.06em] pb-5 text-center inline xl:hidden font-bold text-3xl">
            {title}
          </p>
          <Image
            width={600}
            height={350}
            src={image}
            className="object-cover"
            alt="item image"
          />
        </div>

        <div className="flex text-center xl:text-left flex-col gap-5">
          <p className="tracking-wider hidden xl:inline font-bold text-3xl">
            {title}
          </p>
          <p className="tracking-wider uppercase text-[16px] font-[500] leading-[16px]">
            {advantages}
          </p>

          <b className="leading-[42px] text-[36px] mt-5  font-[500]">
            $ {parseNumber(price)}
          </b>
          <div className="flex justify-center xl:justify-normal  gap-3 transition-all">
            <HandThumbUpIcon className="w-9 h-9 cursor-pointer hover:fill-black " />
            <ShoppingCartIcon className="w-9 h-9 cursor-pointer hover:fill-black" />
          </div>
          <div className="flex flex-col gap-5 justify-center xl:justify-normal">
            <span className="text-[15px]">Select size (UK)</span>
            <SizesList sizes={sizesList} />
          </div>
          <ColorsList />
          <div className="flex flex-col items-center pt-10 xl:items-start">
            <OrderButton itemId={id} />
          </div>
        </div>
      </div>
      {/* @ts-ignore */}
      <RelatedItems currentCategoryId={categoryId} currentItemId={id} />
    </div>
  );
}
