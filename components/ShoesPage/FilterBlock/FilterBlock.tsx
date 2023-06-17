"use client";

import { FC } from "react";
import { FilterItem } from "@/utils/server/getFilters";
import { useSearchParams } from "next/navigation";
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

const FilterBlock: FC<Props> = ({ initialFilters }) => {
  const searchParams = useSearchParams();

  useHydrateAtoms([
    [filterBlockAtom, { selectedFilters: makeSelectedFilters(searchParams) }],
  ]);

  const [{ selectedFilters }, setFilterBlock] = useAtom(filterBlockAtom);
  const checkboxChange = useFilterCheckboxHandler({
    selectedFilters,
    setFilterBlock,
  });

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
        return (
          <FilterRangeSlider
            currentConstrainst={
              Array.from(
                selectedFilters[filter.paramName].values()
              ) as unknown as [number, number]
            }
            initialConstrainst={filter.values as [number, number]}
            onAfterChange={() => { }}
          />
        );
      })}
    </div>
  );
};

export default FilterBlock;
