"use client";

import { GoodItemCard } from "@/components/General/GoodItem/GoodItem";
import { FC, Suspense, useDeferredValue } from "react";
import SearchInput, { searchInputAtom } from "../SearchInput/SearchInput";
import { useHydrateAtoms } from "jotai/utils";
import { useSearchParams } from "next/navigation";
import { useAtomValue } from "jotai";
import ContentGoodList from "./ContentGoodList";
import FilterBlock, { filterBlockAtom } from "../FilterBlock/FilterBlock";
import { FilterItem } from "@/utils/server/getFilters";

interface Props {
  initialFilters: FilterItem[];
  goodList: GoodItemCard[];
}

const ContentBlock: FC<Props> = ({ goodList, initialFilters }) => {
  const initialSearch = useSearchParams().get("search");
  useHydrateAtoms([[searchInputAtom, initialSearch || ""]]);
  const search = useAtomValue(searchInputAtom);
  const { selectedFilters } = useAtomValue(filterBlockAtom);

  const deferredFilters = useDeferredValue(selectedFilters);
  const deferredSearch = useDeferredValue(search);

  const isStale =
    search !== deferredSearch || deferredFilters !== selectedFilters;
  return (
    <div className="grid items-start">
      <SearchInput />
      <div className="md:hidden mt-5">
        <FilterBlock initialFilters={initialFilters} />
      </div>
      <Suspense>
        <div className={`${isStale ? "opacity-25" : ""} transition-all`}>
          <ContentGoodList
            selectedFilters={deferredFilters}
            query={deferredSearch}
            initialGoodList={goodList}
          />
        </div>
      </Suspense>
    </div>
  );
};

export default ContentBlock;
