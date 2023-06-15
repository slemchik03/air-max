import { FC } from "react";
import CompanyListItem from "./CompanyListItem";

const CompanyListItems: FC = () => {
  return (
    <div className="flex justify-center mt-10 h-[150px]">
      {Array(4)
        .fill(null)
        .map((_, idx) => (
          <CompanyListItem key={idx} idx={idx} />
        ))}
    </div>
  );
};

export default CompanyListItems;
