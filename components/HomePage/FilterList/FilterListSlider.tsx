import Slider from "rc-slider";
import { FC, useCallback, useState } from "react";

interface Props {
  initialConstrainst: [number, number];
  currentConstrainst: [number, number];
  onAfterChange: (n: [number, number]) => void;
}

const FilterListSlider: FC<Props> = ({
  initialConstrainst,
  currentConstrainst,
  onAfterChange,
}) => {
  const [currValue, setCurrValue] = useState(currentConstrainst);
  const changeCurrValue = useCallback((v: [number, number]) => {
    setCurrValue(v);
  }, []);

  return (
    <div className="flex pt-4 flex-col text-center gap-1 text-black justify-center items-center px-4">
      <p className="text-black">Selected price</p>
      <span>${currValue.join("-$")}</span>
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
    </div>
  );
};

export default FilterListSlider;
