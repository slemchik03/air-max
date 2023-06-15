import GoodItem, { GoodItemCard } from "@/components/General/GoodItem/GoodItem";
import getFilteredGoodItems from "@/utils/server/getFilteredGoodItems";
import { FC } from "react";
import { useQuery } from "react-query";

interface Props {
  initialGoodList: GoodItemCard[];
  query: string;
}

const ContentGoodList: FC<Props> = ({ initialGoodList, query }) => {
  const { data: goodList } = useQuery({
    queryKey: ["content-good", query],
    queryFn: async () =>
      (
        await getFilteredGoodItems<GoodItemCard>({
          limit: 15,
          search: query,
          selectList: [],
        })
      ).data,
    initialData: initialGoodList,
    enabled: !!query,
    suspense: true,
  });

  if (goodList?.length)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 xl:grid-cols-3">
        {goodList.map((item) => (
          <GoodItem {...item} />
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
