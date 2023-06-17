import { FC } from "react";

import Checkbox from "@/components/UI/Checkbox/Checkbox";
import { FilterBlockState } from "./FilterBlock";
import { FilterItem } from "@/utils/server/getFilters";

interface Props {
  filter: FilterItem;
  selectedFilters: FilterBlockState["selectedFilters"];
  onChange: Function;
}

const FilterContentItem: FC<Props> = ({
  filter,
  selectedFilters,
  onChange,
}) => {
  const currFilter = selectedFilters[filter.paramName];
  return (
    <div className="grid gap-4 my-4">
      <p>{filter.title}</p>
      <div className="grid gap-2">
        {filter.values.map((v, idx) => (
          <Checkbox
            key={idx}
            checked={!!currFilter?.has(v as string)}
            text={v as string}
            onChange={(checked) =>
              onChange(checked, v as string, filter.type, filter.paramName)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default FilterContentItem;
