"use client";

import { searchGoodItems } from "@/app/(actions)/actions";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import debounce from "@/utils/debounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { GoodItem } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import SearchItemsList from "./SearchItemsList";
import { useSetAtom } from "jotai";
import { isHideHeaderAtom } from "../../Header/HeaderContent";

let prevValue = "";

const SearchItems = () => {
  const [goodItems, setGoodItems] = useState<GoodItem[]>([]);
  const setIsHideHeader = useSetAtom(isHideHeaderAtom);
  const [value, setValue] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const changeQuery = useCallback(
    debounce((v: string) => {
      startTransition(() => {
        searchGoodItems(v, 6).then((res) => {
          prevValue = v;
          setGoodItems(res);
        });
      });
    }, 500),
    []
  );

  const changeValue = (v: string) => {
    setValue(v);
    changeQuery(v);
  };
  const changeOpen = (v: boolean) => {
    if (!v) router.back();
  };
  const isOpen = pathname === "/search";
  const isStale = isPending || prevValue !== value;
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
          <div className={`${isStale ? "opacity-30" : ""} transition-all`}>
            <SearchItemsList goodList={goodItems} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SearchItems;
