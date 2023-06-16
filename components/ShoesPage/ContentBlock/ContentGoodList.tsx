import GoodItem, { GoodItemCard } from "@/components/General/GoodItem/GoodItem";
import getFilteredGoodItems from "@/utils/server/getFilteredGoodItems";
import { useSearchParams } from "next/navigation";
import { FC } from "react";
import { useQuery } from "react-query";

interface Props {
  initialGoodList: GoodItemCard[];
  query: string;
  selectedFilters: { [k: string]: Set<string> };
}

const ContentGoodList: FC<Props> = ({
  initialGoodList,
  query,
  selectedFilters,
}) => {
  const searchParams = useSearchParams();

  const { data: goodList } = useQuery({
    queryKey: ["content-good", query, searchParams.toString()],
    queryFn: async () =>
      (
        await getFilteredGoodItems<GoodItemCard>({
          limit: 15,
          search: query,
          selectList: [],
          selectedFilters,
        })
      ).data,
    initialData: initialGoodList,
    enabled: !!query,
    suspense: true,
  });

  if (goodList?.length)
    return (
      <div className="grid grid-cols-[minmax(0,400px)] md:grid-cols-2 gap-5 xl:grid-cols-3">
        {goodList.map((item) => (
          <GoodItem key={item.id} {...item} />
        ))}
      </div>
    );

  return (
    <div className="grid justify-center items-center text-center">
      <div className="grid">
        <h3 className="font-monumentBold text-5xl">You dont have any item!</h3>
      </div>
    </div>
  );
};

export default ContentGoodList;
