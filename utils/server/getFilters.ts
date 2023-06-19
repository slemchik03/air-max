export interface FilterItem {
  type: "checkbox" | "range" | "radio";
  title: string;
  paramName: string;
  values: [number, number] | string[];
}

interface Params {
  search: string;
}

const getFilters = async ({ search }: Params) => {
  try {
    const url = new URL(`${process.env.PROJECT_URL}/api/getFilters`);

    url.searchParams.append("search", search || "");
    const response = await fetch(url, { cache: "force-cache" });

    return (await response.json()) as { data: FilterItem[] };
  } catch (err) {
    console.log(err);
    return { data: [] };
  }
};

export default getFilters;
