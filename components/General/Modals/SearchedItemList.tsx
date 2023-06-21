import { FC, memo } from "react";
import { GoodItemCard } from "../GoodItem/GoodItem";
import SearchedItem from "./SearchedItem";
import { useQuery } from "react-query";
import getFilteredGoodItems from "@/utils/server/getFilteredGoodItems";

interface Props {
  query: string;
}

const SearchedItemList: FC<Props> = memo(({ query }) => {
  const { data: goodList } = useQuery({
    queryKey: ["search-items", query],
    queryFn: async () =>
      (
        await getFilteredGoodItems<GoodItemCard>({
          limit: 6,
          search: query,
          selectedFilters: "",
          selectList: [],
        })
      ).data,
      enabled: !!query,
      keepPreviousData: true
  });
  
  return (
    <div className="grid gap-4 text-center">
      {goodList?.length ? (
        goodList.map((item) => <SearchedItem key={item.id} goodItem={item} />)
      ) : (
        <p className="text-2xl text-black">There are nothing was found.<br /> Type another search</p>
      )}
    </div>
  );
});

SearchedItemList.displayName = "SearchedItemList"

export default SearchedItemList;
