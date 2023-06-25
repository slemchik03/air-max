"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SearchItemsList from "./SearchItemsList";
import { useSetAtom } from "jotai";
import { isHideHeaderAtom } from "../../Header/HeaderContent";
import useGetSearchedItems from "@/utils/hooks/useGetSearchedItems";

const SearchItems = () => {
  const setIsHideHeader = useSetAtom(isHideHeaderAtom);
  const [value, setValue] = useState("");
  const { isPending, goodItems, changeQuery } = useGetSearchedItems(value);

  const router = useRouter();
  const pathname = usePathname();

  const changeValue = (v: string) => {
    setValue(v);
    changeQuery(v);
  };
  const changeOpen = (v: boolean) => {
    if (!v) router.back();
  };
  const isOpen = pathname === "/search";
  useEffect(() => {
    if (isOpen) {
      setIsHideHeader(true);
    }
    return () => setIsHideHeader(false);
  }, [isOpen]);
  return (
    <Dialog open={isOpen} onOpenChange={changeOpen}>
      <DialogContent className="z-[1000000] blur-effect py-[2rem]">
        <DialogHeader>
          <div className="blur-effect grid grid-cols-[30px,1fr] text-[15px] items-center text-[#969faf] h-10 px-3 rounded-full">
            <MagnifyingGlassIcon className="h-[15px] w-[15px]" />
            <input
              value={value}
              onChange={(e) => changeValue(e.currentTarget.value)}
              className="text-[#23272F] bg-transparent w-full border-none outline-none"
            />
          </div>
          <div className={`${isPending ? "opacity-30" : ""} transition-all`}>
            <SearchItemsList goodList={goodItems} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SearchItems;
