import { FilterBlockState } from "@/components/ShoesPage/FilterBlock/FilterBlock";
import { usePathname, useRouter } from "next/navigation";
import makeParamsUrl from "../makeParamsUrl";
import { useEffect, useState, useTransition } from "react";
import { searchFilteredGoodItems } from "@/app/(actions)/actions";
import { GoodItemCard } from "@/components/General/GoodItem/GoodItem";

export default function useContentGoodListData({
  selectedFilters,
  search,
  initialData
}: {
  selectedFilters: FilterBlockState;
  search: string;
  initialData: GoodItemCard[]
}) {
  const [goodList, setGoodList] = useState<GoodItemCard[]>(initialData);

  const pathname = usePathname();
  const router = useRouter();

  const searchParams = {
    ...selectedFilters.selectedCheckboxes,
    search,
    priceConstraints: selectedFilters.rangeValue as unknown as string[],
  };
  const stringParams = makeParamsUrl(searchParams);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      searchFilteredGoodItems(searchParams).then((res) => {
        setGoodList(res);
        router.push(`${pathname}?${stringParams}`);
      });
    });
  }, [stringParams]);

  return {
    goodList,
    isPending,
  };
}
