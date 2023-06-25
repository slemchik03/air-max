import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterItem } from "../server/get/getFilters";
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
  const pathname = usePathname();

  const changeCheckbox = useCallback(
    (
      checked: boolean,
      value: string,
      type: FilterItem["type"],
      paramName: string
    ) => {
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

    },
    [selectedCheckboxes]
  );
  const changeRange = useCallback((v: [number, number], paramName: string) => {
    setFilterBlock((prevState) => ({
      ...prevState,
      rangeValue: v,
    }));
  }, [searchParams, pathname]);
  return { changeCheckbox, changeRange };
}
