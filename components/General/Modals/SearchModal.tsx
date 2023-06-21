"use client";

import { Dialog } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FC, useDeferredValue, useState } from "react";

import SearchedItemList from "./SearchedItemList";
import debounce from "@/utils/debounce";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

const SearchModal: FC = () => {
  const [value, setValue] = useState("");
  const [query, setQuery] = useState(value);
  const deferredQuery = useDeferredValue(query);
  const router = useRouter();
  const pathname = usePathname();
  const changeQuery = debounce((v: string) => {
    setQuery(v);
  }, 1000);

  const changeValue = (v: string) => {
    setValue(v);
    changeQuery(v);
  };
  const isOpen = pathname === "/search";
  const isStale = deferredQuery !== query || value !== query;
  return (
    <>
      {isOpen && (
        <Dialog
          key={pathname}
          as={motion.div}
          static
          className="relative h-screen z-[1000002]"
          open={isOpen}
          onClose={() => router.back()}
          exit={{ opacity: 0 }}
          animate={{ opacity: [0, 1] }}
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />

          <div className="fixed flex justify-center items-center inset-0 my-4">
            <Dialog.Panel className="blur-effect items-start gap-10 h-full  py-3 px-4 rounded-xl grid grid-cols-[minmax(0px,580px)] grid-rows-[60px,1fr] text-3xl text-white overflow-y-auto">
              <div className="blur-effect grid grid-cols-[30px,1fr] text-[15px] items-center text-[#969faf] h-10 px-3 rounded-full">
                <MagnifyingGlassIcon className="h-[15px] w-[15px]" />
                <input
                  value={value}
                  onChange={(e) => changeValue(e.currentTarget.value)}
                  className="text-[#23272F] bg-transparent w-full border-none outline-none"
                />
              </div>
              <div className={`${isStale ? "opacity-30" : ""} transition-all`}>
                <SearchedItemList query={deferredQuery} />
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default SearchModal;
