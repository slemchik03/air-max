import { FC } from "react";
import Marquee from "react-fast-marquee";
import CompanyListItem from "./CompanyListItem";

const CompanyListItemsMobile: FC = () => {
  return (
    <div className="grid grid-cols-1 justify-center h-[60px] mt-10">
      <Marquee className="absolute mx-auto max-w-[500px] top-0 left-0">
        {Array(4)
          .fill(null)
          .map((_, idx) => (
            <CompanyListItem key={idx} idx={idx} />
          ))}
      </Marquee>
    </div>
  );
};

export default CompanyListItemsMobile;
