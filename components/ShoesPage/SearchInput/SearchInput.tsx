"use client";

import { atom, useAtom } from "jotai";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useCallback } from "react";

export const searchInputAtom = atom("");

const SearchInput: FC = () => {
  const [value, setValue] = useAtom(searchInputAtom);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const changeValue = useCallback(
    (v: string) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set("search", v);
      setValue(v);

      router.replace(`${pathname}?${newSearchParams.toString()}`);
    },
    [searchParams]
  );

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
        className={`absolute text-xl transform left-4 transition leading-10 group-focus-within:-translate-y-16 ${value ? "-translate-y-16" : "-translate-y-3"
          }`}
      >
        Type the shoe`s name *
      </span>
    </label>
  );
};

export default SearchInput;
