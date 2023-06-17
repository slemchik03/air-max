import GoodItem, { GoodItemCard } from "@/components/General/GoodItem/GoodItem";

import { FC, memo } from "react";

interface Props {
  goodList: GoodItemCard[];
}

const ContentGoodList: FC<Props> = memo(({ goodList }) => {
  if (goodList?.length)
    return (
      <div className="grid grid-cols-[minmax(0,400px)] md:grid-cols-2 gap-5 xl:grid-cols-3">
        {goodList.map((item) => (
          <GoodItem key={item.id} {...item} />
        ))}
      </div>
    );

  return (
    <div className="grid justify-center items-center text-center">
      <div className="grid">
        <h3 className="font-monumentBold text-5xl">You dont have any item!</h3>
      </div>
    </div>
  );
});
ContentGoodList.displayName = "Content good list"
export default ContentGoodList;
