import { GoodItem } from "@prisma/client";

const getGoodItemsById = async (idList: string[]): Promise<GoodItem[]> => {
    try {
        const url = new URL(`${process.env.PROJECT_URL}/api/shoesByIdList`);
    
        url.searchParams.append("itemsId", idList.join(","));

        const response = await fetch(url, { cache: "no-cache" });

        return await response.json();
      } catch (err) {
        console.log(err);
        return []
      }
}

export default getGoodItemsById;