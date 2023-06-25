import { useInfiniteQuery } from "react-query";
import { GoodItemCard } from "@/components/General/GoodItem/GoodItem";
import { filterListAtom } from "@/components/HomePage/FilterList/FilterList";
import { useAtom } from "jotai";
import getFilteredGoodItems from "../server/get/getFilteredGoodItems";

export default function useGetGoodList(initialData: {
  data: GoodItemCard[];
  count: number;
}) {
  const [, setFilterList] = useAtom(filterListAtom);
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["good-list"],
      queryFn: ({ pageParam = 4 }) =>
        getFilteredGoodItems<GoodItemCard>({
          limit: pageParam,
          selectList: ["image", "title", "price", "sizes", "slug"],
        }),
      getNextPageParam: (lastPage) => {
        if (lastPage && lastPage.count > lastPage.data.length) {
          return lastPage.data?.length + 4;
        }
      },
      onSuccess(data) {
        const currData = data.pages.at(-1)?.data || [{ price: 0 }];
        setFilterList((state) => ({
          ...state,
          generalPriceConstraint: [currData.at(-1)?.price!, currData[0]?.price],
          currentPriceConstraint: [currData.at(-1)?.price!, currData[0]?.price],
        }));
      },
      initialData: { pages: [initialData], pageParams: [4] },
    });

  return {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
}
