import { GoodItemCard } from "@/components/General/GoodItem/GoodItem";

interface Params {
  currentItemId: string;
  currentCategoryId: string;
}

const getRelatedItems = async ({
  currentCategoryId,
  currentItemId,
}: Params): Promise<GoodItemCard[]> => {
  try {
    const url = new URL(`${process.env.PROJECT_URL}/api/related`);

    url.searchParams.append("currentItemId", currentItemId);
    url.searchParams.append("categoryId", currentCategoryId);

    const response = await fetch(url, { cache: "no-store" });

    return await response.json();
  } catch (err) {
    console.log(err);
    return []
  }
};

export default getRelatedItems;
