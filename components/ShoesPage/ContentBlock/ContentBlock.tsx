"use client";

import GoodItem, { GoodItemCard } from "@/components/General/GoodItem/GoodItem";
import { FC, Suspense, useDeferredValue } from "react";
import SearchInput, { searchInputAtom } from "../SearchInput/SearchInput";
import { useHydrateAtoms } from "jotai/utils";
import { useSearchParams } from "next/navigation";
import { useAtomValue } from "jotai";
import ContentGoodList from "./ContentGoodList";

interface Props {
  goodList: GoodItemCard[];
}

const ContentBlock: FC<Props> = ({ goodList }) => {
  const initialSearch = useSearchParams().get("search");
  useHydrateAtoms([[searchInputAtom, initialSearch || ""]]);
  const search = useAtomValue(searchInputAtom);
  const deferredSearch = useDeferredValue(search);

  return (
    <div className="grid items-start">
      <SearchInput />
      <Suspense>
        <div
          className={`${search !== deferredSearch ? "opacity-25" : ""
            } transition-all`}
        >
          <ContentGoodList query={deferredSearch} initialGoodList={goodList} />
        </div>
      </Suspense>
    </div>
  );
};

export default ContentBlock;
