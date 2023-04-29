import { Suspense } from "react";
import GoodList from "../GoodList/GoodList";
import { FunnelIcon, Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { GoodItemCard } from "../GoodItem/GoodItem";
import { Category } from "@prisma/client";
import Button from "../UI/Button/Button";

const getGoodList = async () => {
  try {
    const result = await fetch(
      `${process.env.PROJECT_URL}/api/shoes?limit=15&select=title,image,background,id,sizes,price,slug`,
      { cache: "no-store" }
    );

    return (await result.json()) as (GoodItemCard & { category: Category })[];
  } catch (err) {
    console.log(err);
  }
};

const GoodSection = async () => {
  const goodList = await getGoodList();
  return (
    <div className="font-monument px-[25px] md:px-10 xl:px-[96px] pt-[91px]">
      <div className="grid gap-6 md:gap-0 justify-center text-center md:grid-flow-col md:justify-between">
        <p className="text-[#DE343D] text-[37px]">Top sellers</p>
        <div className="grid sm:grid-flow-col gap-2 sm:gap-8">
          <Button type="gray" text="FILTERS" className="text-[15px]">
            <FunnelIcon className="w-[26px] h-[26px]" />
          </Button>
          <Button type="gray" text="SORT BY" className="text-[15px]">
            <Bars3BottomLeftIcon className="w-[26px] h-[26px]" />
          </Button>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        {goodList?.length && <GoodList goodList={goodList} />}
      </Suspense>
      <div className="grid justify-center py-[76px]">
        <Button type="gray" text="SEE ALL" />
      </div>
    </div>
  );
};

export default GoodSection;
