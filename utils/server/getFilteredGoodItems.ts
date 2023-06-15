import { GoodItem } from "@prisma/client";

interface Params {
  selectList: (keyof (GoodItem & { category: string }))[]; // not using
  limit: number;
  search?: string;
}

const getFilteredGoodItems = async <T>({
  limit,
  selectList,
  search,
}: Params): Promise<{ data: T[]; count: number }> => {
  try {
    const url = new URL(`${process.env.PROJECT_URL}/api/filteredShoes`);

    url.searchParams.append("limit", String(limit));
    url.searchParams.append("select", selectList.join(","));
    url.searchParams.append("search", search || "");
    const response = await fetch(url, { cache: "no-cache" });

    return await response.json();
  } catch (err) {
    console.log(err);
    return { data: [], count: 0 };
  }
};

export default getFilteredGoodItems;
