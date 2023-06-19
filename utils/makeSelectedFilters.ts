import { FilterBlockState } from "@/components/ShoesPage/FilterBlock/FilterBlock";
import { ReadonlyURLSearchParams } from "next/navigation";

export default function makeSelectedFilters(
  params: ReadonlyURLSearchParams | { [k: string]: string }
) {
  const selectedFilters: FilterBlockState["selectedCheckboxes"] = {};
  if (params instanceof ReadonlyURLSearchParams) {
    params.forEach((v, k) => {
      selectedFilters[k] = v ? v.split(",") : [];
    });
  } else {
    for (const key in params) {
      if (Object.hasOwn(params, key)) {
        selectedFilters[key] = params[key].split(",");
      }
    }
  }
  return selectedFilters;
}
