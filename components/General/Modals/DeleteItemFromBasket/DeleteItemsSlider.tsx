import Slider from "rc-slider";
import { FC } from "react";

interface Props {
  maxCount: number;
  deleteCount: number;
  onChange: (v: number) => void;
}

const DeleteItemsSlider: FC<Props> = ({ maxCount, deleteCount, onChange }) => {
  
  return (
    <div className="flex pt-4 flex-col text-center gap-1 text-black justify-center items-center px-4">
      <Slider
        step={1}
        max={maxCount}
        value={deleteCount}
        activeDotStyle={{ border: "none" }}
        handleStyle={{
          border: "none",
          background: "gray",
          boxShadow: "none",
        }}
        trackStyle={{ background: "gray" }}
        // @ts-ignore it is works
        onChange={onChange}
      />
    </div>
  );
};

export default DeleteItemsSlider;
