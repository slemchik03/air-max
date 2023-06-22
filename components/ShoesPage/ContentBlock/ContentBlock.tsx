"use client";

import { GoodItemCard } from "@/components/General/GoodItem/GoodItem";
import { FC } from "react";
import SearchInput from "../SearchInput/SearchInput";
import ContentGoodList from "./ContentGoodList";
import FilterBlock from "../FilterBlock/FilterBlock";
import { FilterItem } from "@/utils/server/getFilters";

interface Props {
  initialFilters: FilterItem[];
  goodList: GoodItemCard[];
}

const ContentBlock: FC<Props> = ({ goodList, initialFilters }) => {
  return (
    <div className="grid items-start">
      <SearchInput />
      <div className="mt-5 md:hidden">
        <FilterBlock initialFilters={initialFilters} />
      </div>
      <div>
        <ContentGoodList initialGoods={goodList} />
      </div>
    </div>
  );
};

export default ContentBlock;
