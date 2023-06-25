import { useCallback, useState, useTransition } from "react";
import debounce from "../debounce";
import { searchGoodItems } from "@/app/(actions)/actions";
import { GoodItem } from "@prisma/client";

let prevValue = "";
export default function useGetSearchedItems(searchQuery: string) {
  const [goodItems, setGoodItems] = useState<GoodItem[]>([]);

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
  return {
    isPending: isPending || searchQuery !== prevValue,
    goodItems,
    changeQuery,
  };
}
