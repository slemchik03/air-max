import { GoodItem } from "@prisma/client";
import Image from "next/image";
import SizesList from "../SizesList/SizesList";
import RelatedItems from "../RelatedItems/RelatedItems";
import OrderButton from "./OrderButton";
import addItemToBasket from "@/utils/server/addItemToBasket";


interface Props extends Omit<GoodItem, "updatedAt" | "createdAt"> {}


export default async function GoodItemDetail({
  image,
  title,
  advantages,
  sizes,
  price,
  id,
  categoryId,
}: Props) {
  
  return (
    <div className="grid justify-center mt-[100px] font-monument min-h-screen">
      <div className="grid  xl:grid-cols-[minmax(0,_540px)_minmax(0,_540px)] grid-rows-[500px] justify-center items-center gap-10 px-10">
        <div className="grid bg-[#F9F9F9] p-10 min-h-[390px] justify-center items-center">
          <p className="font-monumentBold pb-5 text-center inline xl:hidden font-bold text-3xl">
            {title}
          </p>
          <Image
            width={500}
            height={350}
            src={image}
            className="object-contain max-h-[350px]"
            alt="item image"
          />
        </div>
        <div className="flex text-center xl:text-left flex-col gap-5">
          <p className="font-monumentBold hidden xl:inline font-bold text-3xl">
            {title}
          </p>
          <p className="text-xl">{advantages}</p>
          <div className="flex gap-5 justify-center xl:justify-normal items-center">
            <span>Sizes: </span>
            <SizesList sizes={sizes} />
          </div>
          <p>
            Price:
            <b className="pl-5 font-monumentBold text-2xl font-bold">
              {price}$
            </b>
          </p>
          <div className="flex flex-col items-center xl:items-end">
            <OrderButton itemId={id} />
          </div>
        </div>
      </div>
      {/* @ts-ignore */}
      <RelatedItems currentCategoryId={categoryId} currentItemId={id} />
    </div>
  );
}
