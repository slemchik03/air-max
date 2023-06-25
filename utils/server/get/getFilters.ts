export interface FilterItem {
  type: "checkbox" | "range" | "radio";
  title: string;
  paramName: string;
  values: [number, number] | string[];
}

interface Params {
  search: string;
  priceConstaraints?: [number, number] | string[];
}

const getFilters = async ({ search, priceConstaraints }: Params) => {
  try {
    const url = new URL(`${process.env.PROJECT_URL}/api/getFilters`);

    url.searchParams.append("search", search || "");
    url.searchParams.append(
      "priceConstraints",
      priceConstaraints?.join(",") || ""
    );
    const response = await fetch(url, { cache: "no-store" });

    return (await response.json()) as { data: FilterItem[] };
  } catch (err) {
    console.log(err);
    return { data: [] };
  }
};

export default getFilters;
