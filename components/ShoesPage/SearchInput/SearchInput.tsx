"use client";

import debounce from "@/utils/debounce";
import { atom, useAtom, useSetAtom } from "jotai";
import { FC, useCallback, useState, useTransition } from "react";

export const searchInputAtom = atom("");

const SearchInput: FC = () => {
  const [value, setValue] = useState("");
  const setSearchInputValue = useSetAtom(searchInputAtom);

  const changeSearchInputValue = useCallback(
    debounce((v: string) => setSearchInputValue(v), 500),
    []
  );
  const changeValue = (v: string) => {
    setValue(v);
    changeSearchInputValue(v);
  };
  return (
    <label className="flex flex-col-reverse relative focus group">
      <input
        type="text"
        value={value}
        name="email"
        required
        onChange={(e) => changeValue(e.currentTarget.value)}
        className="border-2 border-black px-4 py-3 leading-9"
      />

      <span
        className={`absolute text-xl transform left-4 transition leading-10 group-focus-within:-translate-y-16 ${
          value ? "-translate-y-16" : "-translate-y-3"
        }`}
      >
        Type the shoe`s name *
      </span>
    </label>
  );
};

export default SearchInput;
