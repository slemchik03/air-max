import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { FC } from "react";

interface Props extends React.HTMLProps<HTMLButtonElement> {
  active: boolean;
  text: string;
}

const FilterListBtn: FC<Props> = ({ active, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex gap-3 text-black hover:scale-90 items-center justify-center transition-all"
    >
      {active && <ChevronDownIcon className="w-7 h-7" />}
      {text}
    </button>
  );
};

export default FilterListBtn;
