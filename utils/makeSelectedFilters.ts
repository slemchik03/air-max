import { FilterBlockState } from "@/components/ShoesPage/FilterBlock/FilterBlock";
import { ReadonlyURLSearchParams } from "next/navigation";

export default function makeSelectedFilters(
  params: ReadonlyURLSearchParams | { [k: string]: string }
) {
  const selectedFilters: FilterBlockState["selectedFilters"] = {};
  if (params instanceof ReadonlyURLSearchParams) {
    params.forEach((v, k) => {
      selectedFilters[k] = v ? new Set(v.split(",")) : new Set();
    });
  } else {
    for (const key in params) {
      if (Object.hasOwn(params, key)) {
        selectedFilters[key] = new Set(params[key].split(","));
      }
    }
  }
  return selectedFilters;
}
