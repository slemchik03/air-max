"use client";

import { FC, memo, useCallback } from "react";
import { FilterItem } from "@/utils/server/getFilters";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { atom, useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import makeSelectedFilters from "@/utils/makeSelectedFilters";
import FilterContentItem from "./FilterContentItem";
import useFilterCheckboxHandler from "@/utils/hooks/useFilterCheckboxHandler";
import FilterRangeSlider from "./FilterRangeSlider";

interface Props {
  initialFilters: FilterItem[];
}

export interface FilterBlockState {
  selectedFilters: {
    [k: string]: Set<string>;
  };
}
export const filterBlockAtom = atom<FilterBlockState>({
  selectedFilters: {},
});

const FilterBlock: FC<Props> = memo(({ initialFilters }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useHydrateAtoms([
    [filterBlockAtom, { selectedFilters: makeSelectedFilters(searchParams) }],
  ]);

  const [{ selectedFilters }, setFilterBlock] = useAtom(filterBlockAtom);
  const checkboxChange = useFilterCheckboxHandler({
    selectedFilters,
    setFilterBlock,
  });

  const rangeChange = useCallback((v: [number, number], paramName: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(paramName, v.join(","));
    setFilterBlock(({ selectedFilters }) => ({
      selectedFilters: {
        ...selectedFilters,
        [paramName]: new Set([v[0] + "", v[1] + ""]),
      },
    }));
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  }, []);

  return (
    <div className="md:sticky text-xl font-roboto font-bold top-0 left-0 h-[500px] bg-[#F9F9F9] md:w-[300px] p-5 rounded-2xl shadow-md">
      {initialFilters.map((filter, idx) => {
        if (filter.type !== "range") {
          return (
            <FilterContentItem
              key={idx}
              selectedFilters={selectedFilters}
              onChange={checkboxChange}
              filter={filter}
            />
          );
        }
        const currFilter = selectedFilters[filter.paramName];
        return (
          <FilterRangeSlider
            key={idx}
            currentConstrainst={
              currFilter
                ? (Array.from(currFilter) as unknown as [number, number])
                : (filter.values as [number, number])
            }
            initialConstrainst={filter.values as [number, number]}
            onAfterChange={(v) => rangeChange(v, filter.paramName)}
          />
        );
      })}
    </div>
  );
});

export default FilterBlock;
