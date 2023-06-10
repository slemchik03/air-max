import { GoodItemCard } from "@/components/General/GoodItem/GoodItem";
import { FilterItem } from "@/components/HomePage/FilterList/FilterList";

interface Items {
  data: GoodItemCard[];
  count: number;
}

export default (
  filter: FilterItem,
  items: Items,
  priceConstraints: [number, number]
) => {
  const filteredByConstraits = items.data.filter(
    (item) =>
      item.price <= priceConstraints[1] && item.price >= priceConstraints[0]
  );
  switch (filter) {
    case "Price Down":
      return filteredByConstraits.sort((a, b) => a.price - b.price);
    case "Price Up":
      return filteredByConstraits.sort((a, b) => b.price - a.price);
  }
};
