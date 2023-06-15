import { GoodItemCard } from "@/components/General/GoodItem/GoodItem";
import ContentBlock from "@/components/ShoesPage/ContentBlock/ContentBlock";
import getFilteredGoodItems from "@/utils/server/getFilteredGoodItems";

export default async function Page({ searchParams }: any) {
  const goodListRes = await getFilteredGoodItems<GoodItemCard>({
    limit: 10,
    selectList: [],
    search: searchParams.search,
  });

  return <ContentBlock goodList={goodListRes.data} />;
}
