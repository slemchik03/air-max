import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterItem } from "../server/getFilters";
import { SetStateAction } from "jotai";
import { Dispatch, useCallback } from "react";
import { FilterBlockState } from "@/components/ShoesPage/FilterBlock/FilterBlock";

interface Params {
  selectedCheckboxes: { [k: string]: string[] };
  setFilterBlock: Dispatch<SetStateAction<FilterBlockState>>;
}

export default function useFilterHandlers({
  selectedCheckboxes,
  setFilterBlock,
}: Params) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const changeCheckbox = useCallback(
    (
      checked: boolean,
      value: string,
      type: FilterItem["type"],
      paramName: string
    ) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      let currFilter = selectedCheckboxes[paramName];

      setFilterBlock((prevState) => {
        const { selectedCheckboxes } = prevState;
        const idx = currFilter?.indexOf(value);
        if (checked) {
          if (currFilter && type !== "radio") {
            currFilter.push(value);
          } else {
            currFilter = [value];
          }
        } else {
          currFilter.splice(idx, 1);
        }
        return {
          ...prevState,
          selectedCheckboxes: {
            ...selectedCheckboxes,
            [paramName]: currFilter,
          },
        };
      });

      newSearchParams.set(paramName, currFilter.join(","));
      return router.replace(`${pathname}?${newSearchParams.toString()}`);
    },
    [selectedCheckboxes]
  );
  const changeRange = useCallback((v: [number, number], paramName: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(paramName, v.join(","));
    setFilterBlock((prevState) => ({
      ...prevState,
      rangeValue: v,
    }));
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  }, [searchParams, pathname]);
  return { changeCheckbox, changeRange };
}
