"use client";

import { FC } from "react";
import Checkbox from "@/components/UI/Checkbox/Checkbox";

const FilterBlock: FC = () => {
  return (
    <div className="sticky text-xl font-roboto font-bold top-0 left-0 h-[500px] bg-[#F9F9F9] w-[300px] p-5 rounded-2xl shadow-md">
      <div className="grid gap-4">
        <p>Categories list</p>
        <Checkbox checked={true} text="Adidas Key" onChange={() => { }} />
      </div>
    </div>
  );
};

export default FilterBlock;
