import parseNumber from "@/utils/parseNumber";
import Slider from "rc-slider";
import { FC, useCallback, useState } from "react";

interface Props {
  initialConstrainst: [number, number];
  currentConstrainst: [number, number];
  onAfterChange: (n: [number, number]) => void;
}

const FilterRangeSlider: FC<Props> = ({
  currentConstrainst,
  onAfterChange,
  initialConstrainst,
}) => {
  const [currValue, setCurrValue] = useState(currentConstrainst);
  const changeCurrValue = useCallback((v: [number, number]) => {
    setCurrValue(v);
  }, []);

  return (
    <div className="flex pt-4 flex-col text-left gap-1 text-black">
      <span>Price constraint</span>
      <Slider
        step={100}
        max={initialConstrainst[1]}
        min={initialConstrainst[0]}
        value={currValue}
        activeDotStyle={{ border: "none" }}
        handleStyle={{
          border: "none",
          background: "gray",
          boxShadow: "none",
        }}
        trackStyle={{ background: "gray" }}
        // @ts-ignore it is works
        onChange={changeCurrValue}
        // @ts-ignore it is works
        onAfterChange={onAfterChange}
        range
      />
      <div className="grid grid-flow-col w-full justify-between text-xl">
        <p>${parseNumber(currValue[0])}</p>
        <p>${parseNumber(currValue[1])}</p>
      </div>
    </div>
  );
};

export default FilterRangeSlider;
