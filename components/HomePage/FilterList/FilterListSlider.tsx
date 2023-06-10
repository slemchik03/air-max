import Slider from "rc-slider";
import { FC, useCallback, useState } from "react";

interface Props {
  initialConstrainst: [number, number];
  onAfterChange: (n: [number, number]) => void;
}

const FilterListSlider: FC<Props> = ({ initialConstrainst, onAfterChange }) => {
  const [currValue, setCurrValue] = useState(initialConstrainst);
  const changeCurrValue = useCallback((v: [number, number]) => {
    setCurrValue(v);
  }, []);

  return (
    <Slider
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
  );
};

export default FilterListSlider;
