import { FC } from "react";
import GoodItem, { GoodItemCard } from "../GoodItem/GoodItem";

interface Props {
  goodList: GoodItemCard[];
}

const GoodList: FC<Props> = ({ goodList }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 justify-center">
      {goodList.map((item) => (
        <GoodItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default GoodList;
