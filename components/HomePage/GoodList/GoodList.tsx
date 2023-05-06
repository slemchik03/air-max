"use client";

import { FC } from "react";
import GoodItem, { GoodItemCard } from "../../General/GoodItem/GoodItem";
import { useInfiniteQuery } from "react-query";
import getFilteredGoodItems from "@/utils/server/getFilteredGoodItems";
import Button from "../../UI/Button/Button";
import Loading from "../../UI/Loading/Loading";

const GoodList: FC = ({}) => {
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["good-list"],
      queryFn: ({ pageParam = 4 }) =>
        getFilteredGoodItems<GoodItemCard>({
          limit: pageParam,
          selectList: ["image", "title", "price", "sizes", "slug"],
        }),
      getNextPageParam: (lastPage) => {
        if (lastPage && lastPage.count > lastPage.data.length) {
          return lastPage.data?.length + 4;
        }
      },
      suspense: true,
    });
  console.log();

  return (
    <div className="grid grid-flow-row">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 justify-center">
        {data &&
          data.pages
            .at(-1)
            ?.data.map((item) => (
              <GoodItem key={item.id} className="mx-auto" {...item} />
            ))}
      </div>
      {isFetchingNextPage && <Loading />}
      {hasNextPage && (
        <div className="grid justify-center py-[76px]">
          <Button onClick={() => fetchNextPage()} type="gray" text="SEE ALL" />
        </div>
      )}
    </div>
  );
};

export default GoodList;
