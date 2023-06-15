"use client";

import { FC, Fragment, useCallback, useMemo } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/24/solid";
import Button from "@/components/UI/Button/Button";
import { atom, useAtom, useSetAtom } from "jotai";
import FilterListBtn from "./FilterListBtn";
import FilterListSlider from "./FilterListSlider";

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
    <Menu as="div" className=" flex flex-1 relative">
      <Menu.Button as={Fragment}>
        <Button type="gray" text="FILTERS" className="text-[15px]">
          <FunnelIcon className="w-[26px] h-[26px]" />
        </Button>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute py-5 bg-gray-200 border-1 border-gray-500 flex flex-col top-[100%] left-0 w-52 z-[1000]">
          {filterItems.map((item) => (
            <Menu.Item key={item} as={Fragment}>
              {({ close }) => (
                <FilterListBtn
                  onClick={() => {
                    changeActiveFilter(item);
                    close();
                  }}
                  active={selectedFilter == item}
                  text={item}
                />
              )}
            </Menu.Item>
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
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default FilterList;
