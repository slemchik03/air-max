"use client";

import { FC, useState } from "react";

interface Props {
  sizes: string[];
}

const SizesList: FC<Props> = ({ sizes }) => {
  const [activeSize, setActiveSize] = useState(0);
  return (
    <div className="grid xl:grid-cols-5 grid-flow-col gap-4 text-center">
      {sizes.map((size, idx) => (
        <div
          key={idx}
          onClick={() => setActiveSize(idx)}
          className={`border-[1px] border-[#131212] px-4 py-2 cursor-pointer bg-none hover:bg-black hover:text-white duration-200 ease-in-out ${
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
