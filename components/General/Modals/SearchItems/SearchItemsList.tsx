import { FC, memo } from "react";
import SearchedItem from "./SearchItem";
import { GoodItem } from "@prisma/client";

interface Props {
  goodList: GoodItem[];
}

const SearchItemsList: FC<Props> = memo(({ goodList }) => {
  return (
    <div className="grid gap-4 text-center">
      {goodList?.length ? (
        goodList.map((item) => <SearchedItem key={item.id} goodItem={item} />)
      ) : (
        <p aria-label="search-not-found" className="text-2xl text-black">
          There are nothing was found.
          <br /> Type another search
        </p>
      )}
    </div>
  );
});

export default SearchItemsList;
