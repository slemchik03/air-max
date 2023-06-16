import { GoodItem } from "@prisma/client";
import makeSearchParamsUrl from "../makeSearchParamsUrl";

interface Params {
  selectList: (keyof (GoodItem & { category: string }))[]; // not using
  limit: number;
  search?: string;
  selectedFilters?:
  | {
    [k: string]: Set<string>;
  }
  | string;
}

const getFilteredGoodItems = async <T>({
  limit,
  selectList,
  search,
  selectedFilters,
}: Params): Promise<{ data: T[]; count: number }> => {
  try {
    let urlParams = new URLSearchParams(
      typeof selectedFilters === "string"
        ? selectedFilters
        : makeSearchParamsUrl(selectedFilters!)
    );

    urlParams.append("limit", String(limit));
    urlParams.append("select", selectList.join(","));
    urlParams.append("search", search || "");

    const url = `${process.env.PROJECT_URL
      }/api/filteredShoes?${urlParams.toString()}`;

    const response = await fetch(url, { cache: "no-cache" });

    return await response.json();
  } catch (err) {
    console.log(err);
    return { data: [], count: 0 };
  }
};

export default getFilteredGoodItems;
