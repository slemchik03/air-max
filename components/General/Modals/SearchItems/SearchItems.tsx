"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { FC, useCallback, useState } from "react";
import SearchItemsList from "./SearchItemsList";
import useGetSearchedItems from "@/utils/hooks/useGetSearchedItems";
import debounce from "@/utils/debounce";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  open: boolean;
  closeCallback: () => void;
  // For storybook testing
  portalContainerElement?: HTMLElement;
  defaultSearch?: string;
}

const SearchItems: FC<Props> = ({
  open,
  closeCallback,
  portalContainerElement,
  defaultSearch
}) => {
  const [value, setValue] = useState(defaultSearch || "");
  const [query, setQuery] = useState(value);
  const { isPending, goodItems } = useGetSearchedItems(query);

  const changeQuery = useCallback(
    debounce((v: string) => setQuery(v), 500),
    []
  );
  const changeValue = (v: string) => {
    setValue(v);
    changeQuery(v);
  };
  const changeOpen = (v: boolean) => {
    if (!v) closeCallback();
  };

  return (
    <Dialog open={open} onOpenChange={changeOpen}>
      <DialogContent
        container={portalContainerElement}
        role="dialog-content"
        className="z-[1000000] blur-effect py-[2rem]"
      >
        <div className="blur-effect grid grid-cols-[30px,1fr] text-[15px] items-center text-[#969faf] h-10 px-3 rounded-full">
          <MagnifyingGlassIcon className="h-[15px] w-[15px]" />
          <input
            aria-label="search-input"
            value={value}
            onChange={(e) => changeValue(e.currentTarget.value)}
            className="text-[#23272F] bg-transparent w-full border-none outline-none"
          />
        </div>

        <ScrollArea
          className={`w-[400px] h-[500px] ${
            isPending ? "opacity-30" : ""
          } transition-all`}
        >
          <SearchItemsList goodList={goodItems || []} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default SearchItems;
