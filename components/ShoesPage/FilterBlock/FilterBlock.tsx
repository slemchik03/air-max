"use client";

import { FC, memo, useMemo } from "react";
import { FilterItem } from "@/utils/server/getFilters";
import { useSearchParams } from "next/navigation";
import { atom, useAtom } from "jotai";
import FilterContentItem from "./FilterContentItem";
import useFilterHandlers from "@/utils/hooks/useFilterHandlers";
import FilterRangeSlider from "./FilterRangeSlider";
import { useHydrateAtoms } from "jotai/utils";
import makeSelectedFilters from "@/utils/makeSelectedFilters";

interface Props {
  initialFilters: FilterItem[];
}

export interface FilterBlockState {
  selectedCheckboxes: {
    [k: string]: string[];
  };
  rangeValue: [number, number];
}
export const filterBlockAtom = atom<FilterBlockState>({
  selectedCheckboxes: {},
  rangeValue: [0, 0],
});

const FilterBlock: FC<Props> = memo(({ initialFilters }) => {
  const searchParams = useSearchParams();
  const initialRange = useMemo(
    () => initialFilters.find(({ type }) => type === "range")?.values || [0, 0],
    [initialFilters]
  );

  useHydrateAtoms([
    [
      filterBlockAtom,
      {
        selectedCheckboxes: makeSelectedFilters(searchParams),
        rangeValue: (initialRange as [number, number]) || [0, 0],
      },
    ],
  ]);

  const [{ selectedCheckboxes, rangeValue }, setFilterBlock] =
    useAtom(filterBlockAtom);
  const { changeCheckbox, changeRange } = useFilterHandlers({
    selectedCheckboxes,
    setFilterBlock,
  });

  return (
    <div className="md:sticky text-xl font-roboto font-bold top-0 left-0 h-[500px] bg-[#F9F9F9] md:w-[300px] p-5 rounded-2xl shadow-md">
      {initialFilters.map((filter, idx) => {
        if (filter.type !== "range") {
          return (
            <FilterContentItem
              key={idx}
              selectedFilters={selectedCheckboxes}
              onChange={changeCheckbox}
              filter={filter}
            />
          );
        }
        const initialValues = filter.values as [number, number];

        return (
          <FilterRangeSlider
            key={idx}
            currentConstrainst={rangeValue}
            initialConstrainst={initialValues}
            onAfterChange={(v) => changeRange(v, filter.paramName)}
          />
        );
      })}
    </div>
  );
});

FilterBlock.displayName = "Filter block"

export default FilterBlock;
