import getFilteredGoodItems from "@/utils/server/getFilteredGoodItems";
import { Dialog } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { FC, useCallback, useDeferredValue, useState } from "react";
import { useQuery } from "react-query";
import { GoodItemCard } from "../GoodItem/GoodItem";
import SearchedItemList from "./SearchedItemList";
import debounce from "@/utils/debounce";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: FC<Props> = ({ isOpen, onClose }) => {
  const [value, setValue] = useState("");
  const [query, setQuery] = useState(value);
  const deferredQuery = useDeferredValue(query);

  const changeQuery = useCallback(
    debounce((v: string) => {
      setQuery(v);
    }, 500),
    []
  );
  const changeValue = useCallback((v: string) => {
    setValue(v);
    changeQuery(v);
  }, []);

  const isStale = deferredQuery !== value || deferredQuery !== query;
  return (
    <Dialog
      as="div"
      className="relative z-[1000002]"
      open={isOpen}
      onClose={onClose}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="fixed flex justify-center items-center inset-0 my-4 overflow-y-auto"
      >
        <Dialog.Panel className="bg-white items-start gap-10 h-full py-3 px-4 rounded-xl grid grid-cols-[minmax(0px,580px)] grid-rows-[60px,1fr] text-3xl text-white overflow-y-auto">
          <div className="grid grid-cols-[30px,1fr] text-[15px] items-center text-[#969faf] bg-[rgb(235_236_240)] bg-opacity-[1] h-10 px-3 rounded-full">
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
      </motion.div>
    </Dialog>
  );
};

export default SearchModal;
