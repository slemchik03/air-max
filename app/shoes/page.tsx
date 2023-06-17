import { GoodItemCard } from "@/components/General/GoodItem/GoodItem";
import ContentBlock from "@/components/ShoesPage/ContentBlock/ContentBlock";
import FilterBlock from "@/components/ShoesPage/FilterBlock/FilterBlock";
import makeSelectedFilters from "@/utils/makeSelectedFilters";
import getFilteredGoodItems from "@/utils/server/getFilteredGoodItems";
import getFilters from "@/utils/server/getFilters";

export default async function Page({
  searchParams,
}: {
  searchParams: { [k: string]: string };
}) {
  const [goodListRes, filtersRes] = await Promise.all([
    getFilteredGoodItems<GoodItemCard>({
      limit: 10,
      selectList: [],
      search: searchParams.search,
      selectedFilters: makeSelectedFilters(searchParams),
    }),
    getFilters({ search: searchParams.search }),
  ]);

  return (
    <div className="grid gap-10 md:grid-cols-[1fr,4fr] py-[100px] px-10">
      <div className="hidden md:block">
        <FilterBlock initialFilters={filtersRes.data} />
      </div>
      <ContentBlock
        initialFilters={filtersRes.data}
        goodList={goodListRes.data}
      />
    </div>
  );
}
