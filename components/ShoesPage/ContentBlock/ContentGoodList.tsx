import GoodItem, { GoodItemCard } from "@/components/General/GoodItem/GoodItem";
import { useAtomValue } from "jotai";

import { FC, memo } from "react";
import { searchInputAtom } from "../SearchInput/SearchInput";
import { filterBlockAtom } from "../FilterBlock/FilterBlock";
import useContentGoodListData from "@/utils/hooks/useContentGoodListData";

interface Props {
  initialGoods: GoodItemCard[];
}

const ContentGoodList: FC<Props> = memo(({ initialGoods }) => {
  const search = useAtomValue(searchInputAtom);
  const selectedFilters = useAtomValue(filterBlockAtom);
  const { goodList, isPending } = useContentGoodListData({
    search,
    initialData: initialGoods,
    selectedFilters,
  });

  if (goodList?.length)
    return (
      <div className={`${isPending ? "opacity-40" : ""} transition-all`}>
        <div className="grid grid-cols-[minmax(0,400px)] md:grid-cols-2 gap-5 xl:grid-cols-3">
          {goodList.map((item) => (
            <GoodItem key={item.id} {...item} />
          ))}
        </div>
      </div>
    );

  return (
    <div className="grid justify-center items-center text-center">
      <div className="grid">
        <h3 className="font-monumentBold text-5xl">You dont have any item!</h3>
      </div>
    </div>
  );
});

export default ContentGoodList;
