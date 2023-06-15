import { FC } from "react";

const colors = ["#B64C4C", "#000"];

const ColorsList: FC = () => {
  return (
    <div className="flex flex-col">
      <p className="font-roboto text-[16px]">Select color</p>
      <div className="grid justify-center xl:justify-normal gap-3 grid-flow-col xl:grid-cols-[repeat(4,_30px)] pt-3">
        {colors.map((color) => (
          <div
            key={color}
            style={{ background: color }}
            className={`p-2 w-[30px] h-[30px] rounded-full`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ColorsList;
