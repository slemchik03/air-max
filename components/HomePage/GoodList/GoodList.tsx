"use client";

import { FC } from "react";
import GoodItem, { GoodItemCard } from "../../General/GoodItem/GoodItem";
import Button from "../../UI/Button/Button";
import Loading from "../../UI/Loading/Loading";
import { useAtom } from "jotai";
import { filterListAtom } from "../FilterList/FilterList";
import filterItems from "@/utils/filterItems";

import useGetGoodList from "@/utils/hooks/useGetGoodList";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  preloadedGoodItems: {
    data: GoodItemCard[];
    count: number;
  };
}

const GoodList: FC<Props> = ({ preloadedGoodItems }) => {
  const [{ selectedFilter, currentPriceConstraint }, setFilterList] =
    useAtom(filterListAtom);
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGetGoodList(preloadedGoodItems);

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
            <AnimatePresence>
              {filteredData.map((item) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ ease: "easeInOut", duration: 0.38 }}
                  className="mx-auto grid grid-cols-[minmax(0,400px)]"
                  key={item.id}
                >
                  <GoodItem {...item} />
                </motion.div>
              ))}
            </AnimatePresence>
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
