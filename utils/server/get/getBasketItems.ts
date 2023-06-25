import { Basket, BasketItem, GoodItem } from "@prisma/client";

export type BasketItemList = (BasketItem & {item: GoodItem})[]

const getBasketItems = async (userId: string): Promise<BasketItemList> => {
  try {
    const url = new URL(`${process.env.PROJECT_URL}/api/getBasketItems`);

    url.searchParams.append("userId", userId);
    const response = await fetch(url, {
      cache: "no-cache",
      method: "GET",
    });
    const data = (await response.json()) as Basket & {basketItems: BasketItemList};
    
    return data.basketItems || [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default getBasketItems;
