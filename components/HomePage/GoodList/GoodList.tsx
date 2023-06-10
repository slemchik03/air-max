"use client";

import { FC } from "react";
import GoodItem, { GoodItemCard } from "../../General/GoodItem/GoodItem";
import { useInfiniteQuery } from "react-query";
import getFilteredGoodItems from "@/utils/server/getFilteredGoodItems";
import Button from "../../UI/Button/Button";
import Loading from "../../UI/Loading/Loading";
import { useAtom } from "jotai";
import { filterListAtom } from "../FilterList/FilterList";
import filterItems from "@/utils/filterItems";

interface Props {
  preloadedGoodItems: Awaited<
    ReturnType<typeof getFilteredGoodItems<GoodItemCard>>
  >;
}

const GoodList: FC<Props> = ({ preloadedGoodItems }) => {
  const [{ selectedFilter, currentPriceConstraint }, setFilterList] =
    useAtom(filterListAtom);
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
      onSuccess(data) {
        const currData = data.pages.at(-1)?.data || [{ price: 0 }];
        setFilterList((state) => ({
          ...state,
          generalPriceConstraint: [currData.at(-1)?.price!, currData[0]?.price],
          currentPriceConstraint: [currData.at(-1)?.price!, currData[0]?.price],
        }));
      },
      initialData: { pages: [preloadedGoodItems], pageParams: [4] },
    });

  const filteredData = filterItems(
    selectedFilter,
    data?.pages.at(-1)!,
    currentPriceConstraint
  );
  return (
    <div className="grid grid-flow-row">
      {filteredData.length ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 justify-center">
            {filteredData.map((item) => (
              <GoodItem key={item.id} className="mx-auto" {...item} />
            ))}
          </div>
          {isFetchingNextPage && <Loading />}
          {hasNextPage && (
            <div className="grid justify-center py-[76px]">
              <Button
                onClick={() => fetchNextPage()}
                type="gray"
                text="SEE ALL"
              />
            </div>
          )}
        </>
      ) : (
        <div className="grid gap-5 justify-center">
          <h1 className="text-4xl text-center py-10">
            Sorry, but anything was not found
          </h1>
          <div className="grid justify-center">
            <Button
              onClick={() =>
                setFilterList((state) => ({
                  ...state,
                  currentPriceConstraint: [
                    state.generalPriceConstraint[0],
                    state.generalPriceConstraint[1],
                  ],
                }))
              }
              type="black"
              text="Clear filters"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GoodList;
