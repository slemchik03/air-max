"use client";

import { FC, useState } from "react";

interface Props {
  sizes: string[];
}

const SizesList: FC<Props> = ({ sizes }) => {
  const [activeSize, setActiveSize] = useState(0);
  return (
    <div className="grid grid-flow-col gap-4 text-center">
      {sizes.map((size, idx) => (
        <div
          key={idx}
          onClick={() => setActiveSize(idx)}
          className={`border-[2px] p-2 cursor-pointer rounded-lg bg-none hover:bg-black hover:text-white duration-200 ease-in-out ${
            activeSize === idx ? "bg-black text-white" : ""
          }`}
        >
          {size}
        </div>
      ))}
    </div>
  );
};

export default SizesList;
