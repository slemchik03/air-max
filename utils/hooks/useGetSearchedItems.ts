import { GoodItem } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import getFilteredGoodItems from "../server/get/getFilteredGoodItems";

export default function useGetSearchedItems(searchQuery: string) {
  const {data: goodItems, isFetching} = useQuery({
    queryKey: ["searched-items", searchQuery],
    queryFn: async () =>
      (
        await getFilteredGoodItems<GoodItem>({
          limit: 6,
          selectList: [],
          search: searchQuery,
        })
      ).data,
      keepPreviousData: true
  });

  return {
    isPending: isFetching,
    goodItems,
  };
}
