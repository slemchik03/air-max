import Loading from "@/components/UI/Loading/Loading";
import dynamic from "next/dynamic";
import getFilteredGoodItems from "@/utils/server/getFilteredGoodItems";
import { GoodItemCard } from "@/components/General/GoodItem/GoodItem";
import FilterList from "../FilterList/FilterList";

const GoodList = dynamic(() => import("../GoodList/GoodList"), {
  loading: () => <Loading />,
});

const GoodSection = async () => {
  const goodList = await getFilteredGoodItems<GoodItemCard>({
    limit: 4,
    selectList: ["image", "title", "price", "sizes", "slug"],
  });

  return (
    <div className="max-w-[1590px] mx-auto justify-center font-monument px-[25px] md:px-10 xl:px-[96px] pt-[91px]">
      <div className="grid gap-6 md:gap-0 justify-center text-center md:grid-flow-col md:justify-between">
        <p className="text-[#DE343D] text-[37px]">Top sellers</p>
        <div className="grid sm:grid-flow-col gap-2 sm:gap-8">
          <FilterList />
        </div>
      </div>
      <GoodList preloadedGoodItems={goodList} />
    </div>
  );
};

export default GoodSection;
