import { GoodItem } from "@prisma/client";

interface Params {
  selectList: (keyof (GoodItem & { category: string }))[];
  limit: number;
}

const getFilteredGoodItems = async <T>({
  limit,
  selectList,
}: Params): Promise<{ data: T[]; count: number }> => {
  try {
    const url = new URL(`${process.env.PROJECT_URL}/api/filteredShoes`);

    url.searchParams.append("limit", String(limit));
    url.searchParams.append("select", selectList.join(","));

    const response = await fetch(url, { cache: "no-cache" });

    return await response.json();
  } catch (err) {
    console.log(err);
    return {data: [], count: 0}
  }
};

export default getFilteredGoodItems;
