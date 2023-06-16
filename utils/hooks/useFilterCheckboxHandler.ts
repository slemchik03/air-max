import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterItem } from "../server/getFilters";
import { SetStateAction } from "jotai";
import { Dispatch } from "react";
import { FilterBlockState } from "@/components/ShoesPage/FilterBlock/FilterBlock";

interface Params {
  selectedFilters: { [k: string]: Set<string> };
  setFilterBlock: Dispatch<SetStateAction<FilterBlockState>>;
}

export default function useFilterCheckboxHandler({
  selectedFilters,
  setFilterBlock,
}: Params) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  return (
    checked: boolean,
    value: string,
    type: FilterItem["type"],
    paramName: string
  ) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    let currFilter = selectedFilters[paramName];

    setFilterBlock(({ selectedFilters }) => {
      if (checked) {
        if (currFilter && type !== "radio") {
          currFilter.add(value);
        } else {
          currFilter = new Set([value]);
        }
      } else {
        currFilter.delete(value);
      }
      return {
        selectedFilters: {
          ...selectedFilters,
          [paramName]: currFilter,
        },
      };
    });

    newSearchParams.set(paramName, Array.from(currFilter).join(","));
    return router.replace(`${pathname}?${newSearchParams.toString()}`);
  };
}
