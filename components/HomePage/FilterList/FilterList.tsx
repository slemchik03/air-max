"use client";

import { FC, useCallback } from "react";
import { FunnelIcon } from "@heroicons/react/24/solid";
import { atom, useAtom } from "jotai";
import FilterListBtn from "./FilterListBtn";
import FilterListSlider from "./FilterListSlider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverArrow } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
export type FilterItem = "Price Down" | "Price Up";

interface FilterListState {
  selectedFilter: FilterItem;
  filterItems: FilterItem[];
  currentPriceConstraint: [number, number];
  generalPriceConstraint: [number, number];
}
export const filterListAtom = atom<FilterListState>({
  selectedFilter: "Price Down",
  filterItems: ["Price Down", "Price Up"],
  currentPriceConstraint: [0, 0],
  generalPriceConstraint: [0, 0],
});

const FilterList: FC = ({ }) => {
  const [
    {
      filterItems,
      selectedFilter,
      currentPriceConstraint,
      generalPriceConstraint,
    },
    setFilterItems,
  ] = useAtom(filterListAtom);
  const changeActiveFilter = useCallback((filter: FilterItem) => {
    setFilterItems((state) => ({ ...state, selectedFilter: filter }));
  }, []);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <div className="flex  gap-3 items-center">
            <FunnelIcon className="w-[25px] h-[26px]" />
            <p>Filters</p>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="py-5 bg-gray-200 border-1 border-gray-500 flex flex-col">
        <PopoverArrow className="fill-gray-200" />
        {filterItems.map((item) => (
          <FilterListBtn
            onClick={() => {
              changeActiveFilter(item);
              close();
            }}
            active={selectedFilter == item}
            text={item}
          />
        ))}
        <FilterListSlider
          initialConstrainst={generalPriceConstraint}
          currentConstrainst={currentPriceConstraint}
          onAfterChange={(v) => {
            setFilterItems((state) => ({
              ...state,
              currentPriceConstraint: v,
            }));
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default FilterList;
