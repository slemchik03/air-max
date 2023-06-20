"use client";

import { GoodItemCard } from "@/components/General/GoodItem/GoodItem";
import {
  FC,
  useCallback,
  useDeferredValue,
  useEffect,
  useTransition,
} from "react";
import SearchInput, { searchInputAtom } from "../SearchInput/SearchInput";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAtomValue } from "jotai";
import ContentGoodList from "./ContentGoodList";
import FilterBlock, { filterBlockAtom } from "../FilterBlock/FilterBlock";
import { FilterItem } from "@/utils/server/getFilters";
import debounce from "@/utils/debounce";

interface Props {
  initialFilters: FilterItem[];
  goodList: GoodItemCard[];
}

const ContentBlock: FC<Props> = ({ goodList, initialFilters }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const search = useAtomValue(searchInputAtom);
  const filters = useAtomValue(filterBlockAtom);
  const deferredFilters = useDeferredValue(filters);

  const changeRouteParams = useCallback(
    debounce((v: string) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set("search", v);
      startTransition(() => {
        router.replace(`${pathname}?${newSearchParams.toString()}`);
      });
    }, 500),
    [searchParams]
  );

  useEffect(() => {
    if ((searchParams.get("search") || "") !== search) {
      changeRouteParams(search);
    }
  }, [search]);

  const isStale = deferredFilters !== filters || isPending;
  return (
    <div className="grid items-start">
      <SearchInput />
      <div className="mt-5 md:hidden">
        <FilterBlock initialFilters={initialFilters} />
      </div>
      <div className={`${isStale ? "opacity-25" : ""} transition-all`}>
        <ContentGoodList goodList={goodList} />
      </div>
    </div>
  );
};

export default ContentBlock;
